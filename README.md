# Astro React Starter

A static Astro starter with React 19 (Compiler enabled), Tailwind CSS v4, and shadcn **Lyra / React Aria** components.

Node and pnpm are pinned with [Mise](https://mise.jdx.dev/). Vite Plus owns task execution, formatting, linting, and the dependency-install interface. E2E tests use Playwright.

## Getting Started

Install [Mise](https://mise.jdx.dev/) and the [standalone Vite Plus CLI](https://viteplus.dev/guide/global-cli) (version **1.4.0**). Global `vp` must be on your PATH before setup; it delegates project tasks to the locked local Vite Plus after dependencies are installed. Then run:

```sh
mise trust
mise run setup
mise run dev
```

Open `http://localhost:4321` to view the site.

`setup` installs the pinned tools through Mise, project dependencies through `vp install --frozen-lockfile`, Lefthook hooks, and Chromium for browser tests. On Linux, Playwright may also require system packages: run `mise exec -- vp exec playwright install --with-deps chromium` if prompted.

> **Tip:** Open VS Code from a Mise-enabled terminal (`code .`) or add Mise and Vite Plus to your user `PATH` so the editor and Git hooks can find them. Keep Vite Plus in system-first environment mode (`vp env off`) to use Mise's Node and pnpm versions. Setup does not change your global environment settings.

## Commands

Run commands with `mise run <command>` or `vp run <command>` inside a Mise-enabled shell. Command definitions live in `package.json`; Mise delegates their execution to Vite Plus. `setup` is the bootstrap task defined in Mise.

Install dependencies with `vp install`, add them with `vp add <package>`, and run local binaries with `vp exec <binary>`. Vite Plus uses the declared package manager underneath, currently pnpm. Task commands do not invoke pnpm; changing the installation backend later still requires updating the package-manager declaration, lockfile, and dependency overrides.

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

The equivalent Vite Plus command is `vp run ui:add checkbox` (or `vp run ui:add --help` for shadcn's options).

Components are generated into `src/components/ui/` and are yours to edit directly. Theme colors live in `src/styles/global.css`. Icons use `@hugeicons/react` with the free `@hugeicons/core-free-icons` pack; `components.json` selects Hugeicons for future shadcn additions.

## Git Hooks & Tooling Notes

- **Pre-commit hooks:** Installed automatically on `vp install` via Lefthook. Hook jobs use `mise exec -- vp` and only check staged files; run `mise run format` if a check fails.
- **Vite Plus (`vp`):** Oxfmt and Oxlint are configured in `vite.config.ts`. If calling `vp` directly, use `vp run dev` rather than `vp dev` so Astro's dev server runs instead of standalone Vite.
- **Updating tool versions:** Keep Node and pnpm versions in sync across `mise.toml` and `package.json`, and keep the `vite` alias in `pnpm-workspace.yaml` aligned when upgrading `vite-plus`.
- **CI:** Uses the official `voidzero-dev/setup-vp` action, reads the Vite Plus version from `package.json`, caches dependencies, and installs with the frozen lockfile. Node and package-manager management are disabled in the action so Mise supplies the pinned tools. Browser installation and verification run through Vite Plus.
