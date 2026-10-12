import { siteConfig } from "../site.config";

const context = "https://schema.org";

const plainText = (markdown: string) =>
  markdown
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[`*]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/** The questions are the `##` headings of the page, and the answers are the text below them. */
const faqPage = (body: string) => {
  const sections = body.split(/^## /m).slice(1);
  if (!sections.length) throw new Error("The FAQ page has no `##` question.");
  return {
    "@type": "FAQPage",
    mainEntity: sections.map((section) => {
      const end = section.indexOf("\n");
      return {
        "@type": "Question",
        name: plainText(section.slice(0, end)),
        acceptedAnswer: {
          "@type": "Answer",
          text: plainText(section.slice(end)),
        },
      };
    }),
  };
};

interface PageData {
  id: string;
  title: string;
  description?: string | undefined;
  body?: string | undefined;
  url: string;
  siteUrl: string;
}

export function structuredData({
  id,
  title,
  description,
  body,
  url,
  siteUrl,
}: PageData) {
  const website = { "@type": "WebSite", name: siteConfig.name, url: siteUrl };

  if (id === "index") {
    return {
      "@context": context,
      "@type": "SoftwareSourceCode",
      name: siteConfig.name,
      description: siteConfig.description,
      url: siteUrl,
      codeRepository: siteConfig.repoUrl,
      programmingLanguage: "TypeScript",
      license: "https://opensource.org/licenses/MIT",
      author: siteConfig.author,
    };
  }

  return {
    "@context": context,
    "@graph": [
      ...(id === "faq" && body ? [faqPage(body)] : []),
      {
        "@type": "TechArticle",
        headline: title,
        description,
        url,
        inLanguage: "en",
        author: siteConfig.author,
        publisher: { "@id": siteConfig.author["@id"] },
        isPartOf: website,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteConfig.name,
            item: siteUrl,
          },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      },
    ],
  };
}
