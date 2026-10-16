---
paths:
  - "astro.config.mjs"
---

# Astro config

- The Starlight `title` shows on all pages, the archived versions included. Choose a title that also fits the archived packages.
- The Open Graph image URL has a `?v=` query, so social sites fetch a new image. The `updating-og-image` skill renders the image and increases the query. Do not change the query by hand.
- Starlight 0.x can change the config shape in a minor version. When `astro check` reports a config error, read the Starlight changelog for that version.
