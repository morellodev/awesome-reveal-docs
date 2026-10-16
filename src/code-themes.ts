interface Palette {
  background: string;
  bar: string;
  text: string;
  muted: string;
  keyword: string;
  literal: string;
}

function codeTheme(name: string, type: "dark" | "light", palette: Palette) {
  const { background, bar, text, muted, keyword, literal } = palette;
  return {
    name,
    type,
    colors: {
      "editor.background": background,
      "editor.foreground": text,
      "editorGroupHeader.tabsBackground": bar,
      "tab.activeBackground": background,
      "terminal.background": background,
      "titleBar.activeBackground": bar,
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

// Backgrounds are the theme.css palette pre-mixed: Expressive Code checks syntax contrast against them, so they cannot be CSS variables.
// The `--sl-color-accent-low` token of theme.css pre-mixed, for the same reason.
export const markBackground: [dark: string, light: string] = [
  "#3c3212",
  "#f6e4b2",
];

export const codeThemes = {
  dark: codeTheme("ink", "dark", {
    background: "#202641",
    bar: "#1c213c",
    text: "#eef0f7",
    muted: "#989baa",
    keyword: "#9fd3e6",
    literal: "#ffd23f",
  }),
  light: codeTheme("paper", "light", {
    background: "#f7f8fb",
    bar: "#e4e6ef",
    text: "#181b36",
    muted: "#5d6077",
    keyword: "#076e87",
    literal: "#8a5800",
  }),
};
