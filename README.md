# Astro React Starter

A static Astro starter with React islands, Tailwind CSS, and official shadcn **Lyra / React Aria** components. Mise pins Node **26.12.1** and pnpm **12.15.0**; project-local Vite Plus provides task running, Oxfmt formatting, and Oxlint checks. Lefthook runs read-only pre-commit checks.

## Start developing

Prerequisites: Git, Mise, and VS Code. No global JavaScript packages are required.

```sh
mise trust
mise install
mise exec -- pnpm install --frozen-lockfile
mise run dev
```

Open `http://localhost:4321`. In VS Code, accept the recommended extensions. Run **Tasks: Run Task → Dev**, then use **Debug Astro in Chrome** to debug. Launching VS Code with `code .` from a Mise-enabled terminal ensures the editor and Git hooks can find Mise. If an OS-launched VS Code cannot find Mise, add Mise to your user PATH and restart VS Code.

## Commands

Run `mise run <command>` for the pinned environment, or `pnpm run <command>` in a Mise-enabled terminal.

| Command         | Purpose                                                            |
| --------------- | ------------------------------------------------------------------ |
| `dev`           | Astro development server with hot reload                           |
| `build`         | Static production files in `dist/`                                 |
| `preview`       | Serve the built site locally                                       |
| `format`        | Format supported files, including Astro and Tailwind classes       |
| `check`         | Check formatting, lint supported JS/TS, and type-check Astro/React |
| `test:e2e`      | Playwright tests against the production preview; build first       |
| `verify`        | Checks, production build, and browser tests                        |
| `hooks:install` | Install or refresh Lefthook hooks                                  |
| `hooks:check`   | Run pre-commit jobs against currently staged paths                 |

Vite Plus tasks are available through `mise exec -- pnpm exec vp run dev` (and `build` / `preview`). **Use `vp run dev` for Astro**: bare `vp dev` starts Vite's standalone server. Inside project scripts, `vp` resolves to the locked local package. The template does not use the global Vite Plus runtime manager or its Git hooks.

Before running browser tests the first time:

```sh
mise exec -- pnpm exec playwright install chromium
mise run verify
```

Tests cover desktop and mobile Chromium, hydration, tabs, dialog keyboard focus, and persistent themes. CI installs browser system dependencies and runs the same `verify` command. Review failures with `pnpm exec playwright show-report`.

## Project structure

- `src/pages/`: Astro routes.
- `src/layouts/`: document shell, metadata, global CSS, and initial theme selection.
- `src/components/islands/`: interactive React entry points, hydrated explicitly with Astro client directives.
- `src/components/ui/`: generated, editable React Aria components using Lyra styling.
- `src/styles/global.css`: Tailwind entry and semantic light/dark tokens.
- `tests/`: browser smoke tests.

The showcase is a single React island so tabs, fields, and dialog contexts remain within one React tree. The default theme follows the OS until the user makes a choice; that choice is saved locally. The system monospace stack avoids font downloads.

## Add or customize components

```sh
mise exec -- pnpm run ui:add -- checkbox
mise run format
mise run check
```

`components.json` selects `aria-lyra`, neutral tokens, Lucide, and the `@/` aliases. Keep `rsc: false` for Astro. Component files belong to your project; customize them directly. Change colors in the global CSS tokens. The CLI remains a development dependency because the theme imports `shadcn/tailwind.css` during builds; install development dependencies in build environments.

## Git hooks

Dependency setup installs Lefthook locally through the guarded `prepare` script. Hook installation is skipped in CI, production-only setup, or copies without Git metadata. Only Lefthook is permitted to execute its dependency installation script through the committed pnpm build allowance. After initializing Git in a downloaded copy, run:

```sh
mise run hooks:install
```

Pre-commit runs formatting checks on staged supported paths and Oxlint on staged JS/TS paths, in parallel. Jobs skip when there are no matching files. Checks **never fix files or re-stage changes**. Run `mise run format`, review changes, and stage the intended edits to resolve failures.

Lefthook temporarily hides unstaged edits to partially staged files while checking, then restores them. The configured jobs do not fix or re-stage files. Review both `git diff` and `git diff --cached`; CI checks the committed result independently. Deleted paths and the generated lockfile are excluded from applicable checks.

Hooks call `mise exec -- pnpm ...`. If Git reports a missing Mise command, check the PATH available to the committing application. If hooks are absent, run `mise run hooks:install`; if tools are missing, run `mise install` and install dependencies. Full type checks, builds, and browser tests live in `verify` and CI rather than the commit hook.

## Reuse this template

1. Publish this repository to GitHub, then enable **Settings → General → Template repository**.
2. Choose **Use this template → Create a new repository**, or copy the project without `.git`, `node_modules`, build output, or test reports.
3. Change the package name, page metadata, favicon, and README for the new project. Replace the showcase and update its tests.
4. Follow the setup instructions above. For a local copy without Git, run `git init -b main` before installing dependencies, or install hooks afterward.

No deployment adapter, remote repository, backend, or hosting credentials are configured. Deploy `dist/` to your preferred static host; configure Astro's `site` and `base` if the destination needs them. Keep the repository private until you choose the licensing terms for your template.

## Tool and dependency updates

Update exact Node/pnpm pins in `mise.toml`, matching `packageManager` and `engines.node` in `package.json`. Run `mise install`, regenerate the lockfile, and run `verify` before committing.

When updating Vite Plus, update the `vite` core alias in `pnpm-workspace.yaml` to the same version and the Vitest override to the version shown by `pnpm exec vp toolchain`. Review compatibility before upgrading Astro or TypeScript: this starter uses TypeScript 6 because the Astro checker currently requires TypeScript below 7. Dependencies are saved exactly; commit both manifests and `pnpm-lock.yaml` after updates.

Oxc formatting/lint configuration lives in `vite.config.ts`; application integrations live in `astro.config.mjs`. Oxfmt sorts imports and Tailwind classes, and handles `.astro` with the installed Astro compiler package. Import sorting preserves side-effect import order. Oxlint enables `typescript`, `react`, `unicorn`, `oxc`, `import`, `jsx-a11y`, and `vitest`, with correctness rules treated as errors. `astro check` supplies Astro diagnostics. Workspace settings select Oxc as the formatter without modifying global VS Code settings.

React Compiler is enabled with `react({ compiler: true })` in Astro's integration. The optional `oxc-transform-react` dependency matches the installed Vite React plugin's supported version; a narrowly scoped pnpm peer allowance handles Astro's older optional compiler peer declaration. Browser tests verify the compiled island. React correctness lint rules include compiler diagnostics, following the [Oxc React Compiler guide](https://oxc.rs/blog/2026-08-18-react-compiler-support).
