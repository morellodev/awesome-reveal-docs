import type { HighlighterCore, LanguageRegistration } from "shiki/core";

export type Lang = "jsx" | "vue" | "astro" | "html" | "js" | "css";

const themes = { dark: "dark", light: "light" };

const grammarImports: Record<
  Lang,
  () => Promise<{ default: LanguageRegistration[] }>
> = {
  jsx: () => import("shiki/langs/jsx.mjs"),
  vue: () => import("shiki/langs/vue.mjs"),
  astro: () => import("shiki/langs/astro.mjs"),
  html: () => import("shiki/langs/html.mjs"),
  js: () => import("shiki/langs/javascript.mjs"),
  css: () => import("shiki/langs/css.mjs"),
};

let highlighter: HighlighterCore | undefined;
let highlighterLoad: Promise<HighlighterCore> | undefined;
const languageLoads = new Map<Lang, Promise<void>>();
const warmedUpLanguages = new Set<Lang>();

function loadHighlighterCore() {
  highlighterLoad ??= Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
    import("virtual:code-themes"),
  ]).then(
    async ([
      { createHighlighterCore },
      { createJavaScriptRegexEngine },
      {
        default: { dark, light },
      },
    ]) =>
      (highlighter = await createHighlighterCore({
        themes: [dark, light],
        langs: [],
        engine: createJavaScriptRegexEngine(),
      })),
  );
  highlighterLoad.catch(() => {
    highlighterLoad = undefined;
  });
  return highlighterLoad;
}

function loadAndWarmUpLanguage(lang: Lang, codeSamples: string[]) {
  let languageLoad = languageLoads.get(lang);
  if (!languageLoad) {
    languageLoad = Promise.all([
      loadHighlighterCore(),
      grammarImports[lang](),
    ]).then(async ([loadedHighlighter, { default: grammar }]) => {
      // A later lazy embed, such as jsx in vue, recompiles the grammar and loses its warm-up. The snippets use none.
      await loadedHighlighter.loadLanguage(
        ...grammar.map((registration) => ({
          ...registration,
          embeddedLangsLazy: [],
        })),
      );
      // The first use of a grammar is slow. Warm it up with the code of the page, one block in each task.
      for (const code of codeSamples) {
        loadedHighlighter.codeToTokensWithThemes(code, { lang, themes });
        await (globalThis.scheduler?.yield?.() ??
          new Promise((resolve) => setTimeout(resolve)));
      }
      warmedUpLanguages.add(lang);
    });
    languageLoads.set(lang, languageLoad);
    languageLoad.catch(() => languageLoads.delete(lang));
  }
  return languageLoad;
}

// Shiki loads only when a reader uses the form, and each grammar only when its code shows.
export function loadLanguagesOf(
  codeBlocks: (readonly [code: string, lang: Lang])[],
) {
  const langs = new Set(codeBlocks.map(([, lang]) => lang));
  return Promise.allSettled(
    [...langs].map((lang) =>
      loadAndWarmUpLanguage(
        lang,
        codeBlocks.flatMap(([code, blockLang]) =>
          blockLang === lang ? [code] : [],
        ),
      ),
    ),
  );
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
  if (!highlighter || !warmedUpLanguages.has(lang)) return undefined;
  const tokens = highlighter.codeToTokensWithThemes(code, { lang, themes });
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
