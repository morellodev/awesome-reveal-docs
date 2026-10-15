interface Palette {
  background: string;
  text: string;
  muted: string;
  keyword: string;
  literal: string;
}

function codeTheme(name: string, type: "dark" | "light", palette: Palette) {
  const { background, text, muted, keyword, literal } = palette;
  return {
    name,
    type,
    colors: {
      "editor.background": background,
      "editor.foreground": text,
      "scrollbarSlider.background": `${muted}33`,
      "scrollbarSlider.hoverBackground": `${muted}66`,
    },
    tokenColors: [
      { settings: { foreground: text } },
      {
        scope: ["comment", "punctuation", "meta.brace", "keyword.operator"],
        settings: { foreground: muted },
      },
      {
        scope: [
          "keyword",
          "storage",
          "entity.other.attribute-name",
          "entity.name.function",
          "support.function",
          "meta.object-literal.key",
          "support.type.property-name",
        ],
        settings: { foreground: keyword },
      },
      {
        scope: [
          "string",
          "constant",
          "entity.name.tag",
          "support.class.component",
          "entity.name.type",
          "markup.inline.raw",
        ],
        settings: { foreground: literal },
      },
    ],
  };
}

export const codeThemes = {
  dark: codeTheme("ink", "dark", {
    background: "#1e2340",
    text: "#eef0f7",
    muted: "#989baa",
    keyword: "#9fd3e6",
    literal: "#ffd23f",
  }),
  light: codeTheme("paper", "light", {
    background: "#f6f7fb",
    text: "#181b36",
    muted: "#5d6077",
    keyword: "#1d6a82",
    literal: "#8a5800",
  }),
};
