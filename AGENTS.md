# awesome-reveal-docs

The docs site for the `@awesome-reveal/*` packages, at <https://awesome-reveal.morello.dev>. It uses Astro with Starlight. The packages are in [awesome-reveal/awesome-reveal](https://github.com/awesome-reveal/awesome-reveal). Their development branch is `next`.

## Map

- `src/content/docs/`: the current docs. Starlight makes the sidebar from `guides/`.
- `src/content/docs/v4/` and `src/content/versions/v4.json`: the archived docs of `react-awesome-reveal` v4. `starlight-versions` generates them.
- `src/content/i18n/en.json`: overrides of the UI strings, such as the notice on archived pages.
- `astro.config.mjs`: the site URL, the sidebar, the archived versions and the head tags (analytics and Open Graph).

## Commands

Use the Node version in `.nvmrc` and the pnpm version in `packageManager`. A shell can start with an older Node: check `node -v` first, because Astro 7 needs Node 22.12 or later.

- `pnpm dev --background`: start the dev server in the background, or print the URL of the dev server that already runs. Stop it with `pnpm astro dev stop`.
- `pnpm build`: run `astro check`, then build to `dist/`.
- `pnpm exec eslint .`
- `pnpm exec prettier --check .`, or `--write` to format.

The repo has no tests and no CI. Before a PR, run the build, ESLint and Prettier, and look at the changed pages in the dev server. The build does not check links or anchors.

## Deploys

Vercel deploys `main` to production and each branch to a preview URL. The `vercel` CLI is linked to the project: use it to read deploys and build logs, for example `vercel inspect <url> --logs`.

- `react-awesome-reveal.morello.dev` is the old domain. Vercel redirects it (308) to the new domain and keeps the path. Keep its DNS record in Cloudflare: the redirect and the TLS certificate renewal need it.
- The repo stays in the `morellodev` account, because the Vercel project is on the Hobby plan.

## Rules

- Ask the user before each change in Vercel, Cloudflare DNS or another external service. Reading is fine.
- Work on a branch, named `<type>/<description>`. Use Conventional Commits, and squash-merge PRs.
- Take API names, option defaults and examples from the `next` branch of the packages repo, not from the v4 archive.
