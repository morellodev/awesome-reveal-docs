---
paths:
  - "src/content/docs/v4/**"
  - "src/content/versions/**"
  - "src/content/i18n/**"
  - "astro.config.mjs"
---

# Archived versions

- The archived pages are a snapshot of the docs for one major version. Change them only to fix an error in that version.
- Each archived page has a `slug:` that starts with the version prefix, for example `v4/`. Keep the prefix: without it, the page takes the URL of a current page.
- Links that start with `/` in archived pages start with the version prefix, for example `/v4/guides/`. Keep it, or the link goes to the current docs.
- The picker shows "Latest" for the current docs and the slug for each archived version. Do not label the current docs with its version: the packages restart at 1.0, so `1.x` next to `v4` looks older. Keep the labels short and without package names: the picker is 6.5em wide, its icons included, and cuts longer text.
- `src/content/i18n/en.json` overrides the notices on archived pages. If a version gets a `label` in `astro.config.mjs`, the plugin reads `starlightVersions.outdated.label` and `starlightVersions.search.outdated.label` (with `{{label}}`) instead of the `*.slug` keys, so add those keys too. The `link.latest` keys do not change.
