import partytown from "@astrojs/partytown";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightVersions from "starlight-versions";
import { siteConfig } from "./src/site.config";

const site = "https://awesome-reveal.morello.dev";
// The v4 README and old links point to these root URLs.
const v4Guides = [
  "attention-seekers",
  "custom-animations",
  "getting-started",
  "older-browsers",
  "performances",
  "revealing-effects",
  "rsc-frameworks",
  "typescript-support",
];
const ogUrl = new URL("og.png?v=3", site).href;
const description =
  "Reveal-on-scroll animations for many frameworks, with the Intersection Observer API and the Web Animations API.";
const ogImageAlt =
  "Awesome Reveal: scroll reveal animations for React, Vue, Astro and JavaScript.";

// https://astro.build/config
export default defineConfig({
  site,
  redirects: Object.fromEntries(
    v4Guides.map((page) => [`/guides/${page}`, `/v4/guides/${page}/`]),
  ),
  experimental: {
    contentIntellisense: true,
  },
  integrations: [
    starlight({
      plugins: [
        starlightHeadingBadges(),
        starlightVersions({
          current: { redirect: "root" },
          versions: [{ slug: "v4", redirect: "root" }],
        }),
      ],
      title: "Awesome Reveal",
      description,
      components: {
        Footer: "./src/components/Footer.astro",
      },
      social: [
        { icon: "heart", label: "Sponsor", href: siteConfig.sponsorUrl },
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
        "getting-started",
        {
          label: "Concepts",
          items: [{ autogenerate: { directory: "concepts" } }],
        },
        {
          label: "Packages",
          items: ["react", "vue", "astro", "core"],
        },
        {
          label: "Guides",
          items: ["migrate-from-v4", "agent-skills"],
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
        {
          tag: "meta",
          attrs: { property: "og:image:width", content: "1200" },
        },
        {
          tag: "meta",
          attrs: { property: "og:image:height", content: "630" },
        },
        {
          tag: "link",
          attrs: { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        },
      ],
    }),
    partytown({ config: { forward: ["dataLayer.push"] } }),
  ],
});
