---
paths:
  - "src/content/docs/v4/**"
  - "src/content/versions/**"
  - "src/content/i18n/**"
  - "astro.config.mjs"
---

# Archived versions

- The archived pages are a snapshot of the docs for one major version. Change them only to fix an error in that version.
- Each archived page has a `slug:` with the version prefix, and its links start with the prefix, for example `/v4/guides/`. Keep both. Without them, the page or the link goes to the current docs.
- The picker shows "Latest" for the current docs and the slug for each archived version. Do not label the current docs with its version: the packages restart at 1.0, so `1.x` next to `v4` looks older. Keep the labels short and without package names: the picker is 6.5em wide and cuts longer text.
- `src/content/i18n/en.json` overrides the notices on archived pages with the `starlightVersions.*.slug` keys. If a version gets a `label` in `astro.config.mjs`, the plugin reads the `*.label` keys instead, so rename the keys too.
