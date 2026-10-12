import partytown from "@astrojs/partytown";
import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightLlmsTxt from "starlight-llms-txt";
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
const ogImageAlt = `${siteConfig.name}: scroll reveal animations for React, Vue, Astro and JavaScript.`;

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
        starlightLlmsTxt({
          projectName: siteConfig.name,
          description:
            "Awesome Reveal is an open source TypeScript library for scroll reveal animations in React, Vue, Astro and plain JavaScript.",
          details:
            "It has zero dependencies and about 2 kB gzipped or less for Reveal with one animation. It uses Intersection Observer and the Web Animations API, respects prefers-reduced-motion, and renders content hidden on the server with no flash. Packages: @awesome-reveal/react, @awesome-reveal/vue, @awesome-reveal/astro and @awesome-reveal/core. It is the successor of react-awesome-reveal v4.",
          optionalLinks: [
            {
              label: "GitHub",
              url: siteConfig.repoUrl,
              description: "Source code, issues and discussions",
            },
          ],
          exclude: ["v4/**"],
          customSelectors: { all: ["[data-markdown-ignore]"] },
        }),
        starlightVersions({
          current: { redirect: "root" },
          versions: [{ slug: "v4", redirect: "root" }],
        }),
      ],
      title: siteConfig.name,
      description: siteConfig.description,
      routeMiddleware: "./src/routeData.ts",
      components: {
        Footer: "./src/components/Footer.astro",
        PageTitle: "./src/components/PageTitle.astro",
      },
      editLink: {
        baseUrl: "https://github.com/morellodev/awesome-reveal-docs/edit/main/",
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
          href: siteConfig.repoUrl,
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
          label: "Recipes",
          items: [{ autogenerate: { directory: "recipes" } }],
        },
        {
          label: "Packages",
          items: ["react", "vue", "astro", "core"],
        },
        {
          label: "Guides",
          items: ["faq", "migrate-from-v4", "agent-skills"],
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
        { tag: "meta", attrs: { name: "twitter:image", content: ogUrl } },
        {
          tag: "meta",
          attrs: { name: "twitter:image:alt", content: ogImageAlt },
        },
        {
          tag: "meta",
          attrs: {
            name: "robots",
            content: "max-image-preview:large, max-snippet:-1",
          },
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
