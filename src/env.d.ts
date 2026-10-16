declare module "virtual:starlight-versions-config" {
  const config: import("starlight-versions").StarlightVersionsConfig;
  export default config;
}

// Astro's DOM types do not have the `switch` attribute of a checkbox yet.
declare namespace astroHTML.JSX {
  interface InputHTMLAttributes {
    switch?: boolean;
  }
}
