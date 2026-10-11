---
paths:
  - "src/content/docs/**/*.mdx"
---

# Prettier and code in JSX

Inside a JSX tag, such as `<TabItem>`, write code with the Starlight `<Code code="..." lang="..." />` component, not with a fenced code block. Prettier formats `<Code>` like other JSX.

Prettier 3.9 and the 4.0 alpha still parse MDX with an old MDX parser. They merge a fenced code block inside a JSX tag into one line, for example ` ```shell pnpm add x ``` `. `prettier --check` and `pnpm build` both pass on that output. An empty line around the fence prevents it, but `starlight-versions` removes that empty line when it creates a snapshot.

Format with `pnpm exec prettier --write`. Do not edit a file by hand to satisfy `--check`. Prettier formats all content, the snapshots included, so do not add content paths to `.prettierignore`.
