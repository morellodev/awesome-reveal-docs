---
paths:
  - "astro.config.mjs"
---

# Astro config

- The Starlight `title` shows on all pages, the archived versions included. Choose a title that also fits the archived packages.
- The Open Graph image URL has a `?v=` query. Increase it when you replace `public/og.png`, because social sites cache the image by URL.
- The Google Tag Manager scripts run in a Partytown worker. Keep `forward: ["dataLayer.push"]`, or the page sends no events.
- Starlight 0.x can change the config shape in a minor version. When `astro check` reports a config error, read the Starlight changelog for that version.
