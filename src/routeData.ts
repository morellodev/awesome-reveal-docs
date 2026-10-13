import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { markdownPath, markdownSlug } from "./lib/markdown-slug";
import { structuredData } from "./lib/structured-data";
import { isArchived } from "./site.config";

export const onRequest = defineRouteMiddleware((context) => {
  const { id, head, entry } = context.locals.starlightRoute;
  if (id === "404") return;
  const archived = isArchived(id);
  // The search title is the better headline than the short sidebar title.
  const searchTitle = entry.data.head.find(
    (tag) => tag.tag === "title",
  )?.content;
  if (!archived && typeof searchTitle === "string") {
    const [ogTitle] = head.splice(
      head.findIndex((tag) => tag.attrs?.property === "og:title"),
      1,
    );
    ogTitle!.attrs!.content = searchTitle;
    // Starlight puts frontmatter meta tags last. Put this tag first among them to keep the head order.
    const frontmatterMetas = entry.data.head.filter(
      (tag) => tag.tag === "meta",
    ).length;
    head.splice(head.length - frontmatterMetas, 0, ogTitle!);
  }
  head.push(
    {
      tag: "link",
      attrs: {
        rel: "alternate",
        type: "text/markdown",
        href: markdownPath(id),
      },
    },
    { tag: "link", attrs: { rel: "describedby", href: "/llms.txt" } },
  );

  if (archived) return;

  head.push({
    tag: "script",
    attrs: { type: "application/ld+json" },
    content: JSON.stringify(
      structuredData({
        id: markdownSlug(id),
        title: typeof searchTitle === "string" ? searchTitle : entry.data.title,
        description: entry.data.description,
        body: entry.body,
        url: new URL(context.url.pathname, context.site).href,
        siteUrl: new URL("/", context.site).href,
      }),
    ),
  });
});
