---
paths:
  - "src/content/docs/**/*.mdx"
---

# Page titles and descriptions

Starlight uses the frontmatter `title` for the sidebar label, the `<h1>`, `<title>` and `og:title`. Keep `title` short for the sidebar. Put the search title in the frontmatter `head` of each current page, as two entries with the same text:

```yaml
head:
  - tag: title
    content: "Fade, Slide and Spring Keyframes | Awesome Reveal"
  - tag: meta
    attrs:
      property: og:title
      content: "Fade, Slide and Spring Keyframes | Awesome Reveal"
```

- A `head` entry replaces the Starlight entry of the same tag or `property`, so each page has one `<title>` and one `og:title`. Without the `og:title` entry, link previews show the short `title`.
- Write the title in 60 characters or fewer. Start with the words that people search for, and end with `| Awesome Reveal` when it fits.
- Write the `description` in 140–160 characters. Use the keywords of the page, and describe only what the page contains.
- Do not add these entries to archived pages, such as `src/content/docs/v4/`.

To check, run `pnpm build`. Then compare `<title>` and `og:title` in `dist/<page>/index.html`.
