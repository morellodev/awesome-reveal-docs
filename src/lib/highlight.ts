import type { Framework } from "./playground";

// Writes the line markup of Expressive Code for the code that the playground changes in the browser.
// A style is a dark and a light color of the Night Owl theme.
type Style = readonly [dark: string, light: string];

const plain: Style = ["#D6DEEB", "#403F53"];
const keyword: Style = ["#C792EA", "#8844AE"];
const quote: Style = ["#D9F5DD", "#111111"];
const string: Style = ["#ECC48D", "#984E4D"];
const call: Style = ["#82AAFF", "#3B61B0"];
const number: Style = ["#F78C6C", "#AA0982"];
const tagPunctuation: Style = ["#7FDBCA", "#8844AE"];
const tagName: Style = ["#CAECE6", "#8844AE"];
const attribute: Style = ["#C5E478", "#3B61B0"];
const brace: Style = ["#E2817F", "#B23834"];
const fence: Style = ["#919F9F", "#5F636F"];
const globalObject: Style = ["#7FDBCA", "#096E72"];
const jsxComponent: Style = ["#F78C6C", "#AA0982"];

const escapeHtml = (text: string) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const span = (text: string, [dark, light]: Style) =>
  `<span style="--0:${dark};--1:${light}">${escapeHtml(text)}</span>`;

const quoted = (value: string, mark = '"') =>
  span(mark, quote) + span(value, string) + span(mark, quote);

/**
 * A JavaScript expression: calls, strings, numbers and object literals.
 * In an attribute, Expressive Code colors an object literal like the punctuation of the tag.
 */
function expression(code: string, inTag: boolean) {
  const objectStyle = inTag ? tagPunctuation : plain;
  const token =
    /"([^"]*)"|'([^']*)'|(\d+(?:\.\d+)?)|([A-Za-z_$][\w$]*)(?=\()|([A-Za-z_$][\w$]*)(?=:)|(document)\b|([{}])|(\.)|(-)(?=\d)|([()])|[\s\S]/y;
  let depth = 0;
  let html = "";
  for (let match = token.exec(code); match; match = token.exec(code)) {
    const [text, double, single, num, fn, key, doc, brace, dot, minus, paren] =
      match;
    const rest = depth > 0 ? objectStyle : plain;
    if (double !== undefined) html += quoted(double);
    else if (single !== undefined) html += quoted(single, "'");
    else if (num) html += span(text, number);
    else if (fn) html += span(text, call);
    else if (key) html += span(text, objectStyle);
    else if (doc) html += span(text, globalObject);
    else if (brace) {
      depth += brace === "{" ? 1 : -1;
      html += span(text, objectStyle);
    } else if ((dot && !inTag) || minus) html += span(text, keyword);
    else if (paren) html += span(text, plain);
    else html += span(text, rest);
  }
  return html;
}

/** The attributes of a tag, on the line of the tag or on a line of their own. */
function attributes(text: string, lang: Framework) {
  const equals = lang === "react" ? keyword : tagPunctuation;
  let html = "";
  let binding = false;
  for (let rest = text; rest;) {
    let consumed: string;
    let match: RegExpExecArray | null;
    if ((match = /^\s+/.exec(rest))) {
      consumed = match[0];
      html += span(consumed, tagPunctuation);
    } else if ((match = /^([:@]?)([\w-]+)/.exec(rest))) {
      consumed = match[0];
      binding = match[1] === ":";
      html +=
        (match[1] ? span(match[1], tagPunctuation) : "") +
        span(match[2] ?? "", attribute);
    } else if (rest.startsWith("=")) {
      consumed = "=";
      html += span(consumed, equals);
    } else if (rest.startsWith("{")) {
      let depth = 0;
      let end = 0;
      do depth += { "{": 1, "}": -1 }[rest[end]!] ?? 0;
      while (depth > 0 && ++end < rest.length);
      consumed = rest.slice(0, end + 1);
      html +=
        span("{", brace) +
        expression(consumed.slice(1, -1), true) +
        span("}", brace);
    } else if ((match = /^"([^"]*)"/.exec(rest))) {
      consumed = match[0];
      // A Vue binding holds an expression, and a plain value holds a string.
      html += binding
        ? span('"', quote) + expression(match[1] ?? "", true) + span('"', quote)
        : quoted(match[1] ?? "");
    } else {
      consumed = rest.slice(0, 1);
      html += span(consumed, plain);
    }
    rest = rest.slice(consumed.length);
  }
  return html;
}

function highlightLine(
  line: string,
  lang: Framework,
  state: { inTag: boolean },
) {
  if (line === "") return "";
  if (line === "---") return span(line, fence);

  const importMatch = /^import (\{[^}]*\}) from "([^"]*)";$/.exec(line);
  if (importMatch) {
    return (
      span("import", keyword) +
      span(` ${importMatch[1]} `, plain) +
      span("from", keyword) +
      span(" ", plain) +
      quoted(importMatch[2] ?? "") +
      span(";", plain)
    );
  }

  if (state.inTag) {
    const close = /^(\s*)(\/?>)$/.exec(line);
    if (!close) return attributes(line, lang);
    state.inTag = false;
    return (
      span(close[1] ?? "", tagPunctuation) +
      span(close[2] ?? "", tagPunctuation)
    );
  }

  const item = /^(\s*)<(li|span|div)>([^<]*)<\/\2>$/.exec(line);
  if (item) {
    return (
      span(item[1] ?? "", plain) +
      span("<", tagPunctuation) +
      span(item[2] ?? "", tagName) +
      span(">", tagPunctuation) +
      span(item[3] ?? "", plain) +
      span("</", tagPunctuation) +
      span(item[2] ?? "", tagName) +
      span(">", tagPunctuation)
    );
  }

  const tag = /^(\s*)(<\/?)([\w-]+)(.*?)(\/?>)?(;?)$/.exec(line);
  if (tag) {
    const [, indent = "", bracket = "", name = "", rest = "", end, semicolon] =
      tag;
    const nameStyle =
      name === "Reveal" && lang === "react"
        ? jsxComponent
        : name === "Reveal" && lang === "astro"
          ? attribute
          : tagName;
    let html =
      span(indent, plain) +
      span(bracket, tagPunctuation) +
      span(name, nameStyle) +
      attributes(rest, lang);
    if (end) html += span(end, tagPunctuation);
    else state.inTag = true;
    if (semicolon) html += span(";", plain);
    return html;
  }

  // The JavaScript snippet, the script of a Vue component and the text inside an element.
  const [, indent = "", code = ""] = /^(\s*)(.*)$/.exec(line) ?? [];
  return span(indent, plain) + expression(code, false);
}

/** The lines of a highlighted snippet, in the markup of Expressive Code. */
export function highlight(code: string, lang: Framework) {
  const state = { inTag: false };
  return code
    .split("\n")
    .map(
      (line) =>
        `<div class="ec-line"><div class="code">${highlightLine(line, lang, state) || "\n"}</div></div>`,
    )
    .join("");
}
