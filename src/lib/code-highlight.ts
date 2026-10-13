import type { HighlighterCore } from "shiki/core";

export type Lang = "jsx" | "vue" | "astro" | "html" | "js" | "css";

const themes = { dark: "dark", light: "light" };

let shiki: HighlighterCore | undefined;
let loading: Promise<HighlighterCore> | undefined;

// Shiki loads only when a reader uses the form, so most visits do not download it.
export function loadHighlighter(
  samples: (readonly [code: string, lang: Lang])[],
) {
  loading ??= Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
    import("virtual:code-themes"),
    import("shiki/langs/jsx.mjs"),
    import("shiki/langs/vue.mjs"),
    import("shiki/langs/astro.mjs"),
    import("shiki/langs/html.mjs"),
    import("shiki/langs/javascript.mjs"),
    import("shiki/langs/css.mjs"),
  ]).then(
    async ([
      { createHighlighterCore },
      { createJavaScriptRegexEngine },
      {
        default: { dark, light },
      },
      ...grammars
    ]) => {
      const highlighter = await createHighlighterCore({
        themes: [dark, light],
        langs: grammars.map((grammar) => grammar.default),
        engine: createJavaScriptRegexEngine(),
      });
      // The first use of a grammar is slow. Warm up each one with the code of the page, one block in each task.
      for (const [code, lang] of samples) {
        highlighter.codeToTokensWithThemes(code, { lang, themes });
        await (globalThis.scheduler?.yield?.() ??
          new Promise((resolve) => setTimeout(resolve)));
      }
      return (shiki = highlighter);
    },
  );
  loading.catch(() => {
    // A later change tries the download again.
    loading = undefined;
  });
  return loading;
}

const escapeHtml = (text: string) =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const lineOf = (html: string) =>
  `<div class="ec-line"><div class="code">${html || "\n"}</div></div>`;

export const plainLines = (code: string) =>
  code
    .split("\n")
    .map((line) => lineOf(escapeHtml(line)))
    .join("");

// Expressive Code uses `--0` for the dark theme and `--1` for the light theme.
export function highlight(code: string, lang: Lang) {
  if (!shiki) return undefined;
  const tokens = shiki.codeToTokensWithThemes(code, { lang, themes });
  return tokens
    .map((line) => {
      const spans = line
        .map(({ content, variants }) => {
          const { dark, light } = variants;
          return `<span style="--0:${dark!.color};--1:${light!.color}">${escapeHtml(content)}</span>`;
        })
        .join("");
      return lineOf(spans);
    })
    .join("");
}
