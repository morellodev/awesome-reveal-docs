---
paths:
  - "src/content/docs/**"
---

# Sources for the docs content

The current docs describe the `@awesome-reveal/*` packages. Check each API name, option default and code example against the `next` branch of [awesome-reveal/awesome-reveal](https://github.com/awesome-reveal/awesome-reveal). Read a local clone of the packages repo on `next`, and pull it first. Without a clone, read the file on GitHub at `https://raw.githubusercontent.com/awesome-reveal/awesome-reveal/next/<path>`. Browse the file tree at `https://github.com/awesome-reveal/awesome-reveal/tree/next`.

Where to find the facts:

- The JSDoc in `packages/core/src` and `packages/react/src` has the option docs and defaults.
- The consumer skills in `packages/*/skills` have examples. The `<package>:package` tests type-check their `ts` and `tsx` fences. The package READMEs have more examples, but no test checks them.
- The `migrating-from-v4` skills list the changes from `react-awesome-reveal` v4.

The v4 archive (`src/content/docs/v4/`) documents a different API. Do not copy examples from it into the current docs.

The build does not check links or anchors. Open each changed link in the dev server, and check that the anchor exists on the target page.
