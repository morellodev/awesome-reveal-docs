---
name: archiving-docs-versions
description: Archives the current docs as a version with starlight-versions, so that docs for a new major version can replace them. Use when a major release of the packages needs new docs, or when you add a version to the picker.
---

# Archive a docs version

`starlight-versions` keeps each archived version as a copy of the pages under `src/content/docs/<slug>/`. The v4 archive is an example.

1. Fix the errors in the current pages first, such as broken links and anchors. The archive copies them.
2. Add the version to `versions` in `astro.config.mjs`, with `{ slug: "v<major>", redirect: "root" }`. The picker lists the versions in the order of the array, so put the new one first.
3. Run `pnpm build`. The plugin writes `src/content/docs/<slug>/` and `src/content/versions/<slug>.json` when `astro dev` or `astro build` starts. Keep a copy of `dist/` for step 5.
4. The plugin prints each page again, and removes the empty lines around fenced code in JSX tags. Add them again (see `.claude/rules/docs/mdx-prettier.md`), then run `pnpm exec prettier --write src/content/docs/<slug>`.
5. Run `pnpm build` again. Check that the rendered text of each archived page did not change, for example with a text diff of the built HTML against the copy.
6. Check the notices in `src/content/i18n/en.json`. One key serves all archived versions through `{{slug}}`. The current text names the legacy `react-awesome-reveal` package. Rewrite it so that it fits each archived version.

## Check

- `pnpm build`, `pnpm exec eslint .` and `pnpm exec prettier --check .` pass.
- The picker shows the new version, and its pages show the notice.
- The links on the archived pages stay under `/<slug>/`.
- Old URLs of pages that the new docs remove need redirects to the archive. Ask the user where to put them before you add them.
