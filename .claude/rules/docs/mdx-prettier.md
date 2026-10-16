---
paths:
  - "src/content/docs/**/*.mdx"
---

# Prettier and code in JSX

Inside a JSX tag, such as `<TabItem>`, write code with the Starlight `<Code>` component, not with a fenced code block:

- For one line, use `<Code code="pnpm add x" lang="shell" />`.
- For more lines, put the code in a separate file. Import it with `?raw`, and use `<Code code={name} lang="jsx" />`. Prettier formats the file as code.

Prettier 3.9 and the 4.0 alpha still parse MDX with an old MDX parser:

- It merges a fenced code block inside a JSX tag into one line, for example ` ```shell pnpm add x ``` `. An empty line around the fence prevents it, but `starlight-versions` removes that empty line when it creates a snapshot.
- It removes the indentation of a multi-line template literal in a JSX attribute.
- It ends an MDX `export` at the first empty line, so a multi-line string in an export breaks.

`prettier --check` and `pnpm build` both pass on that output.

Format with `pnpm exec prettier --write`. Do not edit a file by hand to satisfy `--check`. Prettier formats all content, the snapshots included, so do not add content paths to `.prettierignore`.
