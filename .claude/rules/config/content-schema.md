---
paths:
  - "src/content.config.ts"
---

# Content schema

- After a change to a schema, the running dev server can keep the old entries in `.astro/data-store.json`. A new field is then `undefined` in `Astro.locals.starlightRoute.entry.data`, and its default does not apply. `pnpm build` is not affected.
- To refresh the entries:
  1. Run `pnpm astro dev stop`.
  2. Delete `.astro/data-store.json`.
  3. Run `pnpm dev`.
- `pnpm astro sync --force` does not fix it. It writes `node_modules/.astro/data-store.json`, not the file that the dev server reads. The Astro docs do not document this behavior. We saw it with Astro 7.4.
