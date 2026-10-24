# Astro React Starter

A static Astro starter with React 19 (Compiler enabled), Tailwind CSS v4, and shadcn **Lyra / React Aria** components.

Node and pnpm are pinned with [Mise](https://mise.jdx.dev/), formatting and linting run on Oxc via Vite Plus, and E2E tests use Playwright.

## Getting Started

Make sure you have [Mise](https://mise.jdx.dev/) installed, then run:

```sh
mise trust
mise run setup
mise run dev
```

Open `http://localhost:4321` to view the site.

`setup` installs the pinned tools through Mise, project dependencies from the lockfile, Lefthook hooks, and Chromium for browser tests. On Linux, Playwright may also require system packages: run `mise exec -- pnpm exec playwright install --with-deps chromium` if prompted.

> **Tip:** Open VS Code from a Mise-enabled terminal (`code .`) or add Mise to your user `PATH` so the editor and Git hooks can find `node` and `pnpm`.

## Commands

Run commands with `mise run <command>` (or `pnpm <command>` inside a Mise shell):

| Command                  | Description                                                   |
| ------------------------ | ------------------------------------------------------------- |
| `setup`                  | Install project dependencies, hooks, and Chromium (Mise only) |
| `ui:add <components...>` | Add shadcn components using the configured theme and icons    |
| `dev`                    | Start the local dev server                                    |
| `build`                  | Build static files to `dist/`                                 |
| `preview`                | Preview the production build locally                          |
| `format`                 | Format files with Oxfmt (including Astro & Tailwind)          |
| `check`                  | Check formatting, lint with Oxlint, and type-check            |
| `test:e2e`               | Run Playwright tests (requires a build first)                 |
| `verify`                 | Run all checks, build the site, and run E2E tests             |
| `hooks:install`          | Install Lefthook git hooks                                    |
| `hooks:check`            | Run pre-commit checks on staged files                         |

After setup, run the complete verification suite with:

```sh
mise run verify
```

## Project Structure

- `src/pages/` — Astro routes
- `src/layouts/` — Document shell, metadata, and theme initialization
- `src/components/islands/` — Interactive React roots hydrated with Astro client directives
- `src/components/ui/` — Editable shadcn (React Aria / Lyra) components
- `src/styles/global.css` — Tailwind setup and light/dark theme tokens
- `tests/` — Playwright smoke tests

## UI Components

Add new shadcn components with:

```sh
mise run ui:add checkbox
mise run format
```

Pass multiple component names (`mise run ui:add checkbox select`) or run `mise run ui:add` for the interactive picker. Use `--` before CLI options, for example `mise run ui:add -- --help`.

Components are generated into `src/components/ui/` and are yours to edit directly. Theme colors live in `src/styles/global.css`. Icons use `@hugeicons/react` with the free `@hugeicons/core-free-icons` pack; `components.json` selects Hugeicons for future shadcn additions.

## Git Hooks & Tooling Notes

- **Pre-commit hooks:** Installed automatically on `pnpm install` via Lefthook. Hooks only check staged files and won't auto-edit your working tree—run `mise run format` if a check fails.
- **Vite Plus (`vp`):** Oxfmt and Oxlint are configured in `vite.config.ts`. If calling `vp` directly, use `vp run dev` rather than `vp dev` so Astro's dev server runs instead of standalone Vite.
- **Updating tool versions:** Keep Node and pnpm versions in sync across `mise.toml` and `package.json`, and keep the `vite` alias in `pnpm-workspace.yaml` aligned when upgrading `vite-plus`.
