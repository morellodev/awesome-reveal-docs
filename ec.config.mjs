import { defineEcConfig } from "@astrojs/starlight/expressive-code";
import { codeThemes } from "./src/site.config.ts";

export default defineEcConfig({
  themes: [codeThemes.dark, codeThemes.light],
  useStarlightUiThemeColors: true,
  customizeTheme(theme) {
    for (const { settings } of theme.settings) delete settings.fontStyle;
  },
});
