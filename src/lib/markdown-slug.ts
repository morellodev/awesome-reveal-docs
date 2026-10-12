/** The slug of the `.md` file of a docs page, from a docs entry ID or a Starlight route ID. */
export const markdownSlug = (id: string) =>
  id.replace(/(^|\/)index$/, "") || "index";

/** The path of the `.md` file of a docs page, from a Starlight route ID. */
export const markdownPath = (id: string) => `/${markdownSlug(id)}.md`;
