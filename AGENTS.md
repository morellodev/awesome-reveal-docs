# website

The docs site for the `@awesome-reveal/*` packages, at <https://awesome-reveal.dev>. It uses Astro with Starlight. The packages are in [awesome-reveal/awesome-reveal](https://github.com/awesome-reveal/awesome-reveal). Their development branch is `next`.

## Map

- `src/content/docs/`: the current docs.
- `src/content/docs/v4/` and `src/content/versions/v4.json`: the archived docs of `react-awesome-reveal` v4. `starlight-versions` generates them.
- `src/styles/theme.css`: the theme, on the Starlight tokens. The code colors are in `src/code-themes.ts`.
- `src/components/`: overrides of Starlight components. A font in `fonts` of `astro.config.mjs` loads only when `Head.astro` renders its `<Font>` tag.
- `src/content/i18n/en.json`: overrides of the UI strings, such as the notice on archived pages.
- `astro.config.mjs`: the site URL, the sidebar, the archived versions and the head tags (Open Graph).

## Commands

Use the Node version in `.nvmrc` and the pnpm version in `packageManager`. A shell can start with an older Node: check `node -v` first, because Astro 7 needs Node 22.12 or later.

- `pnpm dev`: start the dev server. When Astro detects an AI agent, it runs the server in the background and prints its URL. If a dev server already runs, it prints that URL. `/_astro/status` returns `{"ok": true}` when the server is ready. Stop it with `pnpm astro dev stop`.
- `pnpm build`: run `astro check`, then build to `dist/`.
- `pnpm exec eslint .`
- `pnpm exec prettier --write .` to format, and `--check` to check.

The repo has no tests and no CI. Before a PR, run the build, ESLint and Prettier, and look at the changed pages in the dev server. The build does not check links or anchors.

## Docs lookup

Search the Astro docs with the `astro-docs` MCP server in `.mcp.json`.

## Deploys

Cloudflare Workers serves `dist/` as static assets, with no adapter and no Worker code. `wrangler.jsonc` has the config. Workers Builds builds each push: `main` deploys to production, and other branches get a preview URL. Run `pnpm build && pnpm exec wrangler dev` to serve the build with the production routing.

- Cloudflare Web Analytics adds its beacon to the HTML pages by itself, so the site has no analytics code. A `no-transform` value in `Cache-Control` stops the beacon.
- `public/_redirects` sets the redirects. A rule applies also when an asset exists at its path.
- `public/_headers` gives `/_astro/*` a long `immutable` cache. Without the Cloudflare adapter, nothing else adds it.
- Production sends `.md` and `.txt` files without a `charset`, so `public/_headers` adds `charset=utf-8`. `wrangler dev` adds it by itself, so a local test does not show the problem.
- `_headers` matches paths only, so a 404 also gets the headers of its path, such as `immutable` under `/_astro/*`. A Response Header Transform Rule in the zone sets `Cache-Control: no-store` and `Content-Type: text/html; charset=utf-8` on each 404. Preview URLs do not use zone rules, so test the rule on production.
- Without `not_found_handling: "404-page"`, Workers does not serve the Starlight 404 page.
- The site opts in to AI training: `public/robots.txt` and `public/_headers` send `ai-train=yes` content signals. Keep each AI bot policy of the zone at Allow. A Block policy turns on the managed robots.txt, and Cloudflare then prepends `ai-train=no` and `Disallow` rules for AI crawlers to our file.
- `awesome-reveal.dev` is a Workers Custom Domain in `wrangler.jsonc`. A DNS record on the hostname blocks it. A redirect rule sends `www` to the apex with a 301. It needs the proxied `www` record.
- `react-awesome-reveal.morello.dev` is the old domain. A redirect rule in the `morello.dev` zone sends it to `awesome-reveal.dev` with a 301, and keeps the path. Keep its proxied `AAAA` record to `100::`: without a record, the hostname does not resolve, and the rule cannot run.

## Rules

- Ask the user before each change in Cloudflare (Workers, DNS, rules) or another external service. Reading is fine.
- Work on a branch, named `<type>/<description>`. Use Conventional Commits, and squash-merge PRs.
- Add an official Astro integration with `pnpm astro add <name>`, and other packages with `pnpm add`. Do not edit the dependencies in `package.json` by hand.
- Take API names, option defaults and examples from the `next` branch of the packages repo, not from the v4 archive.
