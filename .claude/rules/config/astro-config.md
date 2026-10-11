---
paths:
  - "astro.config.mjs"
---

# Astro config

- The Starlight `title` shows on all pages, the archived versions included. Choose a title that also fits the archived packages.
- The Open Graph image URL has a `?v=` query. Increase it when you replace `public/og.png`. Social sites cache an image by its URL, so they keep the old image until the URL changes. They show the new URL after they read the page again, and old shares keep the old image.
- The Google Tag Manager scripts run in a Partytown worker. Keep `forward: ["dataLayer.push"]`: the Partytown guide for Google Tag Manager requires it, so that `dataLayer.push` calls on the main thread reach the worker.
- Starlight 0.x can change the config shape in a minor version. When `astro check` reports a config error, read the Starlight changelog for that version.
