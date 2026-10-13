import { ExpressiveCodeTheme } from "@expressive-code/core";
import type { AstroIntegration } from "astro";
import { bundledThemes } from "shiki";
import { codeThemes } from "../site.config";

const id = "virtual:code-themes";
const resolvedId = `\0${id}`;

async function themeOf(name: keyof typeof codeThemes, background: string) {
  const { default: raw } = await bundledThemes[codeThemes[name]]();
  // Expressive Code applies the same contrast to the static code, so the colors match.
  const { type, fg, settings } = new ExpressiveCodeTheme(
    raw,
  ).ensureMinSyntaxHighlightingColorContrast(5.5, background);
  return { name, type, fg, settings };
}

export default function codeThemesModule(): AstroIntegration {
  return {
    name: "code-themes",
    hooks: {
      "astro:config:setup": ({ updateConfig }) => {
        updateConfig({
          vite: {
            plugins: [
              {
                name: "code-themes",
                resolveId: (source) => (source === id ? resolvedId : undefined),
                async load(source) {
                  if (source !== resolvedId) return;
                  // Starlight sets these code backgrounds when `useStarlightUiThemeColors` is on.
                  const themes = {
                    dark: await themeOf("dark", "#23262f"),
                    light: await themeOf("light", "#f6f7f9"),
                  };
                  return `export default JSON.parse(${JSON.stringify(JSON.stringify(themes))});`;
                },
              },
            ],
          },
        });
      },
      "astro:config:done": ({ injectTypes }) => {
        injectTypes({
          filename: "types.d.ts",
          content: `declare module "${id}" {
  import type { ThemeRegistrationRaw } from "shiki/core";
  const themes: Record<"dark" | "light", ThemeRegistrationRaw>;
  export default themes;
}`,
        });
      },
    },
  };
}
