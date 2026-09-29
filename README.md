# The Hut

Website for The Hut, a late-night toasted-sub shop in Glassboro, NJ.

Live: https://thehutglassboro.com · menu: https://thehutglassboro.com/menu

## Updating the site with Claude

You don't need to install anything. Use Claude Code on the web:

1. Go to [claude.ai/code](https://claude.ai/code) and connect your GitHub account when asked.
2. Pick this repository.
3. Say what you want in plain words, e.g. "Change the cheesesteak price to 13.99" or "Add a Sunday special called The Sunday Scaries for $9.99".
4. Claude makes the change on a separate branch and opens a pull request. That's a proposed change; nothing is live yet.
5. Read Claude's summary. If it looks right, tell Claude to merge it, or click **Squash and merge** on the pull request in GitHub.
6. About a minute later, the change is live. Check https://thehutglassboro.com.

**To undo a change,** open the merged pull request on GitHub and click **Revert**, then merge the pull request that creates. Or ask Claude to revert it.

Claude reads `AGENTS.md` and the `docs/` folder to learn how the site is built and how it should look, so you don't need to explain any of that.

## How it works

- **Content:** the menu, prices, hours, specials and links are in `src/data/site.ts`.
- **Look and feel:** colors, fonts and components are documented in `docs/design-system.md`.
- **Changes:** every change goes through a pull request to `main`. Merging deploys the site automatically. A check runs on every pull request and must pass first, so a broken change can't be merged. See `docs/workflow.md`.
- **Hosting:** Vercel, with the domain `thehutglassboro.com`. `www.thehutglassboro.com` redirects to it.

## Develop locally

```sh
fnm use          # Node 24 (.nvmrc)
npm install
npm run dev      # http://localhost:4321/
npm run check    # type-check
npm run build
```

Built with Astro, Tailwind CSS v4 and the Motion library.
