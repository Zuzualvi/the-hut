# Workflow

How changes get from an idea to the live site.

## The repo

- Public GitHub repo. Anyone can read it; only collaborators can merge.
- `main` is protected by a ruleset:
  - Every change goes through a pull request. Direct pushes are rejected.
  - Merges are squash only: each PR becomes one commit on `main`, titled after the PR, with the PR description as the commit message.
  - No approvals are required, so whoever opens a PR can merge it.
  - A check (`npm run check` and `npm run build`) runs on every PR and must pass before merging.
  - Force-pushes and deleting `main` are blocked.
- Branches are deleted automatically after merging.

## Making a change

1. Start from the latest `main`: `git switch main && git pull`.
2. Create a branch with a short descriptive name: `git switch -c update-drink-prices`.
3. Make the change. Commit with a clear message.
4. Check your work (next section).
5. Push and open a PR: `git push -u origin update-drink-prices`, then `gh pr create`.
   - **Title:** what a customer would notice, e.g. "Cheesesteaks now 12.99" or "Add chicken nuggets to Classics". It becomes the commit title on `main`.
   - **Description:** a few plain sentences on what changed and where.
6. Tell the person what changed and ask whether to merge.
7. When they say yes: `gh pr merge --squash`.
8. Wait about a minute, then load https://thehutglassboro.com and confirm the change is live.

## Checking your work

Before opening a PR:

- `npm run check` and `npm run build` both pass. The PR check runs the same commands.
- Look at every page you touched at phone width (about 390px) and desktop width (1440px). Also try a mid-size laptop width (1024–1280px) if you changed a layout.
- Long names and prices must not overflow or collide. Menu rows use a dotted leader between name and price; long names should wrap cleanly.

If you can take screenshots:

- `npm run build`, then `npx astro preview` serves the built site at http://localhost:4321/.
- Headless Chrome won't go narrower than 500px. For phone width, screenshot a small HTML page that puts the site in a 390px-wide `<iframe>`.
- Scroll reveals can be caught half-finished. Run Chrome with `--force-prefers-reduced-motion` to see the final state, or wait a few seconds of real time.
- Stop the server when done: `lsof -nP -tiTCP:4321 -sTCP:LISTEN | xargs kill`.

## Deploys

- Merging to `main` deploys to production automatically. It's live in about 30–60 seconds.
- If the build fails, the previous version stays live. A broken PR can't take the site down, but it also won't ship.
- There's no separate staging site. The live site is where you confirm a change.
- Nothing needs to be configured by hand. There are no environment variables or secrets.

## Undoing a change

- On GitHub, open the merged PR and click **Revert**. That opens a new PR that undoes it. Merge that PR the same way.
- From the command line: `git revert <commit>` on a new branch, then open a PR as usual.
- Never rewrite `main`'s history. Force-pushes are blocked anyway.

## If something goes wrong

- **PR check fails:** read the log in the PR's Checks tab. It's usually a type error or a broken import. Fix it on the same branch and push again.
- **Merged but nothing changed:** wait a minute and hard-refresh the page. Check the commit's status on GitHub (a green tick means it deployed).
- **Site looks broken after a merge:** revert the PR (see above), then investigate on a new branch.
