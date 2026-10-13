---
name: updating-dependencies
description: Updates Astro, Starlight, the Starlight plugins, the lint and format tools, Node or pnpm in the docs site, then checks the site and the Workers Builds preview. Use when you update dependencies, when `pnpm outdated` lists packages, or when the packages repo changes its Node or pnpm version.
---

# Update the dependencies

Do the update on a branch, for example `build/update-dependencies`.

## Versions to keep

- Node and pnpm: use the same versions as the packages repo (its `.nvmrc` and `packageManager`). To change pnpm, copy the `packageManager` field with its hash. pnpm then downloads and runs that version.
- Workers Builds reads the Node version from `.nvmrc`. For pnpm, its docs name only the `PNPM_VERSION` build variable, and the default is pnpm 10.11.1. When `packageManager` changes, ask the user to set `PNPM_VERSION` to the same version in the Worker settings (Settings > Build > Build variables and secrets).
- TypeScript: stay on the highest version that `@astrojs/check` and `typescript-eslint` support. Check their `peerDependencies` with `pnpm view <package> peerDependencies` before you update TypeScript. `typescript-eslint` often allows only some minor versions, for example `<6.1.0`.

## Update

1. Read the release notes of each Astro major version and each Starlight minor version that the update crosses. Starlight is 0.x, so a minor version can change the config shape.
2. Update Astro and the official integrations with `pnpm dlx @astrojs/upgrade`. When a package has a breaking change, the tool asks for confirmation in a terminal prompt, and it has no flag to skip it. In the agent shell, run it through `script`, and send Enter to accept:

   ```sh
   (sleep 15; printf '\r') | script -q /dev/null pnpm dlx @astrojs/upgrade
   ```

3. Update the other packages with `pnpm update --latest <package>...`, and keep the TypeScript limit above. Do not edit the versions in `package.json` by hand.
4. pnpm runs no build script that `allowBuilds` in `pnpm-workspace.yaml` does not list, and the install fails with `ERR_PNPM_IGNORED_BUILDS`. Approve a new one with `pnpm approve-builds <package>` only when the package needs it, such as `esbuild` and `sharp`.

## Check

1. `pnpm peers check`, `pnpm build`, `pnpm exec eslint .` and `pnpm exec prettier --check .`.
2. Compare the home page, one guide and one archived page with production, for example with screenshots. A Starlight update can change the layout a little.
3. Push, open a PR, and wait for the "Workers Builds" check in `gh pr checks`. Then open the preview URL. Wrangler cannot read the build log, so ask the user for the Node and pnpm versions and the new build warnings in the log.
