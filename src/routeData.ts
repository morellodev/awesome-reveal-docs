import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

type HeadTag = { attrs?: Record<string, unknown> | undefined };
const isOgTitle = ({ attrs }: HeadTag) => attrs?.property === "og:title";

// Starlight sets og:title to the short sidebar title, also on pages with a keyword title in their head.
export const onRequest = defineRouteMiddleware(({ locals }) => {
  const { entry, head } = locals.starlightRoute;
  if (entry.data.head.some(isOgTitle)) return;
  const title = entry.data.head.find(({ tag }) => tag === "title")?.content;
  const ogTitle = head.find(isOgTitle);
  if (title && ogTitle?.attrs) ogTitle.attrs.content = title;
});
