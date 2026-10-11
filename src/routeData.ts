import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

// Starlight sets og:title to the short sidebar title, also on pages with a keyword title in their head.
export const onRequest = defineRouteMiddleware(({ locals }) => {
  const { entry, head } = locals.starlightRoute;
  const title = entry.data.head.find(({ tag }) => tag === "title")?.content;
  const ogTitle = head.find(({ attrs }) => attrs?.property === "og:title");
  if (title && ogTitle?.attrs) ogTitle.attrs.content = title;
});
