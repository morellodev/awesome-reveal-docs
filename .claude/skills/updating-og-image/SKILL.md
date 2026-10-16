---
name: updating-og-image
description: Renders the Open Graph image `public/og.png` from its HTML template and changes the image URL, so that social sites fetch the new image. Use when you change the OG image, or when the site name, the hero headline or the theme colors change.
---

# Update the OG image

[`assets/og-image.html`](assets/og-image.html) is the source of `public/og.png`. It copies the tokens of `src/styles/theme.css` and the fonts of `astro.config.mjs`, because it renders outside Astro.

1. Edit `assets/og-image.html`. Keep the constraints in [Constraints](#constraints).
2. Run `${CLAUDE_SKILL_DIR}/scripts/render.sh`. It needs Google Chrome, `pngquant` and network access for the Google Fonts. When the PNG changes, the script increases the `?v=` query of the image URL in `astro.config.mjs`. Social sites cache the image by its URL, so each new image needs a new version.
3. Look at `public/og.png` at full size. Then look at it at phone size: `sips -Z 360 public/og.png --out <scratchpad>/og-mobile.png`. All text must be readable at 360 px.
4. Run `pnpm build`. Make sure that `og:image` in `dist/index.html` has the new `?v=`.

Do not change `og.png` without `render.sh`: a new image with an old `?v=` stays hidden behind the cached image.

## Constraints

- Keep 1200×630 PNG, under 1 MB. Meta and LinkedIn show 1.91:1, and Meta does not list WebP for `og:image`.
- Keep all content inside the padding, with equal space on each side. Measure it: `magick public/og.png -fuzz 12% -trim -format '%wx%h%O' info:`. X shows the card at 2:1 and crops about 15 px at the top and the bottom.
- Keep the text large: a phone shows the card at about 30% of its size. X shows no title under the card, so the image must give the name and what the packages do.
- If you change the size, also change `og:image:width` and `og:image:height` in `astro.config.mjs`.
