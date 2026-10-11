import partytown from "@astrojs/partytown";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightHeadingBadges from "starlight-heading-badges";

const site = "https://awesome-reveal.morello.dev";
const ogUrl = new URL("og.png?v=1", site).href;
const ogImageAlt =
  "Add stunning, performant scroll reveal animations to your React applications with zero dependencies.";

// https://astro.build/config
export default defineConfig({
  site,
  experimental: {
    contentIntellisense: true,
  },
  integrations: [
    starlight({
      plugins: [starlightHeadingBadges()],
      title: "React Awesome Reveal",
      social: [
        {
          icon: "email",
          label: "Email",
          href: "mailto:dennismorello@gmail.com",
        },
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/awesome-reveal/awesome-reveal",
        },
        {
          icon: "linkedin",
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/dennismorello",
        },
        {
          icon: "blueSky",
          label: "Bluesky",
          href: "https://bsky.app/profile/morello.dev",
        },
        { icon: "x.com", label: "X", href: "https://x.com/morellodev" },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [{ autogenerate: { directory: "guides" } }],
        },
      ],
      head: [
        {
          tag: "script",
          attrs: {
            type: "text/partytown",
            src: "https://www.googletagmanager.com/gtag/js?id=GTM-PNLQX9W4",
          },
        },
        {
          tag: "script",
          attrs: {
            type: "text/partytown",
          },
          content:
            "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','GTM-PNLQX9W4');",
        },
        {
          tag: "meta",
          attrs: { property: "og:image", content: ogUrl },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:alt", content: ogImageAlt },
        },
      ],
    }),
    partytown({ config: { forward: ["dataLayer.push"] } }),
  ],
});
