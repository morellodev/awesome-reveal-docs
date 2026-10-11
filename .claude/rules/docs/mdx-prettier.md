---
paths:
  - "src/content/docs/**/*.mdx"
---

# Prettier and fenced code in JSX

Put an empty line between a JSX tag (for example `<TabItem>`) and a fenced code block inside it. Do not use whitespace-only lines there. Without the empty line, Prettier 3.9 merges the fence into one line, for example ` ```shell pnpm add x ``` `. `prettier --check` and `pnpm build` both pass on the broken output, so compare the rendered page.

`starlight-versions` prints each page again when it creates a version snapshot (`src/content/docs/<version>/`). Its printer removes these empty lines. Add them again in the snapshot before you run `prettier --write`.

Prettier formats all content, the snapshots included. Do not add content paths to `.prettierignore`.
