import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightLlmsTxt from "starlight-llms-txt";
import starlightVersions from "starlight-versions";
import codeThemesModule from "./src/integrations/code-themes";
import { siteConfig } from "./src/site.config";

const site = "https://awesome-reveal.dev";
const ogUrl = new URL("og.png?v=3", site).href;
const ogImageAlt = `${siteConfig.name}: scroll reveal animations for React, Vue, Astro and JavaScript.`;

// https://astro.build/config
export default defineConfig({
  site,
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
        baseUrl: "https://github.com/awesome-reveal/website/edit/main/",
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
          label: "Examples",
          items: [{ autogenerate: { directory: "examples" } }],
        },
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
          items: [
            "nextjs",
            "reveal-on-data",
            "faq",
            "migrate-from-v4",
            "agent-skills",
          ],
        },
      ],
      head: [
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
    codeThemesModule(),
  ],
});
