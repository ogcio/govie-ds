# Government of Ireland Design System — Core (Mitosis)

This package serves as the **Single Source of Truth** for the Government of Ireland Design System components. It uses [Mitosis](https://github.com/BuilderIO/mitosis) to maintain a single codebase for components that are automatically compiled into native libraries for multiple frameworks (currently React and Angular).

By using Mitosis, we ensure that:

- **Consistency**: All framework-specific libraries share the exact same logic, structure, and behaviour.
- **Maintainability**: Bug fixes and features are implemented once in the core and propagated everywhere.
- **Performance**: Components are compiled to native code for each framework, avoiding the overhead of wrapper solutions.

## Scripts

- `pnpm build` — full generation process for all supported frameworks.
- `pnpm build:react` — React-only generation into `@ogcio/design-system-react`.
- `pnpm build:angular` — Angular-only generation into `@ogcio/design-system-angular`.
- `pnpm build:watch` — re-generate on every change in `atoms/`.

## Where things live

| Layer                      | Path                                                  |
| -------------------------- | ----------------------------------------------------- |
| Source (Mitosis)           | `packages/core/atoms/<Component>.lite.tsx`            |
| Shared Storybook meta      | `packages/core/atoms/storybook/<Component>.meta.ts`   |
| React output (generated)   | `packages/react/src/atoms/<Component>.tsx`            |
| React stories              | `packages/react/src/stories/<Component>.stories.tsx`  |
| Angular output (generated) | `packages/angular/src/atoms/<Component>.ts`           |
| Angular stories            | `packages/angular/src/stories/<Component>.stories.ts` |

## Workflow

### 1. Author the source

Components live in `packages/core/atoms/<Component>.lite.tsx`. Each component declares its typed `Props` at the top of the file and styles itself with `tailwind-variants` (`tv()`), with variants colocated in the same module. Shared helpers (enum unions, clamping utilities, constants) live next to the component or in `atoms/constants.ts` and `atoms/utilities.ts`.

Run `pnpm build:watch` while developing. The watcher regenerates the React and Angular outputs on every save, so the per-target shape evolves alongside the source. Generator plugins live in `packages/core/plugins/` (for example `strip-ref.ts`) and are wired through `react.config.ts` / `angular.config.ts`; reach for a plugin only when a generated output needs an across-the-board adjustment that the `.lite.tsx` source cannot express.

### 2. Describe shared Storybook metadata

The core layer defines the shared Storybook surface in `packages/core/atoms/storybook/<Component>.meta.ts`: `args`, `argTypes`, `parameters`, and `play` interaction tests. This metadata is consumed by every target's Storybook. Anything written here (a prop description, a play step, a control configuration) propagates everywhere.

Every prop entry needs a `description` and a `table.type.summary`. Autodocs builds its documentation surface from these fields, and a missing entry leaves that prop undocumented in every target's generated Storybook.

### 3. Generate

Run `pnpm build`. The generator emits React output to `packages/react/src/atoms/<Component>.tsx` and Angular output to `packages/angular/src/atoms/<Component>.ts`. Inspect both: generation can be quietly wrong in one target while clean in another, and the output is part of the review surface.

### 4. Write per-target stories

Per-target stories live in `packages/react/src/stories/<Component>.stories.tsx` and `packages/angular/src/stories/<Component>.stories.ts`. Each target imports the shared meta and adds framework-idiomatic examples on top: JSX composition on the React side, template syntax on the Angular side. Keep target-specific snowflakes contained to these files; anything that applies to every target belongs in the core `meta.ts`.

### 5. Validate per target

Run the per-target suites with `pnpm --filter @ogcio/design-system-{react,angular} test`. The full layered strategy is described in `docs/testing.md`: Vitest covers units and utilities, Storybook play functions drive interaction tests in the rendered DOM, and Playwright captures visual regressions.

A passing React build does not imply a passing Angular build. Each target has its own type-checker, renderer, and idiom. Verify both before signing off.

### 6. Accessibility

Three checks: axe via the Storybook a11y addon, a keyboard navigation pass, and a screen-reader spot-check (NVDA on Windows, VoiceOver on macOS) for any component with non-trivial interactive structure. Framework-specific accessibility bugs (Angular focus management, React event-bubbling timing) only surface in their own target's tests.

### 7. Sign-off

PR review by Lead with cross-framework scrutiny on both targets, visual diff (Playwright; Chromatic where still in use), and commit conventions per `docs/development.md`.

## Further reading

- `docs/development.md` — commit conventions, releases, versioning.
- `docs/testing.md` — testing strategy across layers.
