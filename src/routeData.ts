import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { markdownSlug } from "./lib/markdown-slug";

export const onRequest = defineRouteMiddleware((context) => {
  const { id, head } = context.locals.starlightRoute;
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
});
