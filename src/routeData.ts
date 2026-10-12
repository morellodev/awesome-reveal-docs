import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { markdownSlug } from "./lib/markdown-slug";
import { siteConfig } from "./site.config";

const sections: Record<string, string> = {
  concepts: "Concepts",
  recipes: "Recipes",
  react: "Packages",
  vue: "Packages",
  astro: "Packages",
  core: "Packages",
  "migrate-from-v4": "Guides",
  "agent-skills": "Guides",
  faq: "Guides",
};

const plainText = (markdown: string) =>
  markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*]/g, "")
    .replace(/\s+/g, " ")
    .trim();

// The FAQ page is the single source of its structured data.
const faqPage = (body: string) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: body
    .split(/^## /m)
    .slice(1)
    .map((section) => {
      const [question = "", ...answer] = section.split("\n");
      return {
        "@type": "Question",
        name: plainText(question),
        acceptedAnswer: {
          "@type": "Answer",
          text: plainText(answer.join(" ")),
        },
      };
    }),
});

export const onRequest = defineRouteMiddleware((context) => {
  const { id, head, entry } = context.locals.starlightRoute;
  if (id === "404") return;
  head.push(
    {
      tag: "link",
      attrs: {
        rel: "alternate",
        type: "text/markdown",
        href: `/${markdownSlug(id)}.md`,
      },
    },
    { tag: "link", attrs: { rel: "describedby", href: "/llms.txt" } },
  );

  // The landing page has its own structured data, and v4 is an archive.
  if (id === "index" || id.startsWith("v4/")) return;

  const url = new URL(context.url.pathname, context.site).href;
  const section = sections[id.split("/")[0] ?? id];
  const trail = [
    { name: siteConfig.name, url: new URL("/", context.site).href },
    ...(section ? [{ name: section }] : []),
    { name: entry.data.title, url },
  ];
  head.push({
    tag: "script",
    attrs: { type: "application/ld+json" },
    content: JSON.stringify([
      ...(id === "faq" && entry.body ? [faqPage(entry.body)] : []),
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: entry.data.title,
        description: entry.data.description,
        url,
        inLanguage: "en",
        author: siteConfig.author,
        publisher: siteConfig.author,
        isPartOf: {
          "@type": "WebSite",
          name: siteConfig.name,
          url: new URL("/", context.site).href,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          ...item,
        })),
      },
    ]),
  });
});
