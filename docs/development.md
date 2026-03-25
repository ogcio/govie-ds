# Development guide

This document describes the conventions and processes used by the team working on the Government of Ireland Design System. It covers how we write commits, how releases are managed, and how one affects the other.

## Commit conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. Every commit message that reaches `main` must follow this format:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Commit types

| Type | Purpose | Appears in CHANGELOG | Version impact |
|------|---------|---------------------|----------------|
| `feat` | New feature or capability | Yes (Features) | Minor bump |
| `fix` | Bug fix or rollback of a broken change | Yes (Bug Fixes) | Patch bump |
| `perf` | Performance improvement | Yes (Performance Improvements) | Patch bump |
| `chore` | Maintenance, dependency updates, deprecations, formatting | Yes (Miscellaneous Chores) | Patch bump |
| `docs` | Documentation only | No (hidden) | Patch bump |
| `refactor` | Code restructuring without behaviour change | No (hidden) | Patch bump |
| `test` | Adding or updating tests | No (hidden) | Patch bump |
| `build` | Build system or tooling | No (hidden) | Patch bump |
| `ci` | CI/CD pipeline changes | No (hidden) | Patch bump |

Hidden types still trigger a version bump but do not appear in the public CHANGELOG. Choose the type that reflects the nature of the change — this directly affects what consumers see in release notes.

The full list of commit types and their CHANGELOG visibility is defined in [`release-please-config.json`](../release-please-config.json).

### Breaking changes

Append `!` after the type (or scope) to signal a breaking change:

```
feat!: remove deprecated Button variant prop
feat(react)!: rename onAction callback to onPress
```

A breaking change triggers a **major** version bump regardless of the commit type. Use the commit body or footer to explain what changed and how consumers should migrate.

### Scope

Use the scope field to reference the Azure Boards ticket associated with the change. This creates a traceable link between the commit and the work item:

```
feat(AB#12345): add date picker component
fix(AB#12346): resolve focus trap in modal
```

When there is no ticket, use a short descriptive scope or omit it entirely:

```
fix(Modal): resolve focus trap when closing
chore(React): upgrade storybook dependency
ci(Tokens): add publish step for design tokens
docs: fix typo in README
chore: upgrade vitest to v3
```

### Examples

Good:
```
feat(AB#34567): add pagination to Table component
fix(AB#34568): resolve keyboard navigation in Tabs
feat(AB#34569)!: restructure class naming convention
chore: upgrade vitest to v3
ci: update pipeline triggers
docs(react): add migration guide for v2
```

Avoid:
```
update button          # no type, unclear what changed
fix stuff              # no type prefix, vague description
feat: Fix bug          # wrong type for a bug fix
FEAT: add component    # types must be lowercase
```

## Release process

### How Release Please works

We use [Release Please](https://github.com/googleapis/release-please) to automate versioning and changelog generation. The tool reads commit messages on `main` and determines what version bumps are needed for each package.

The process:

1. **Commits land on `main`** — through merged pull requests.
2. **Release Please analyses commits** — it groups them by affected package and determines the version bump based on commit types.
3. **A Release PR is opened (or updated)** — this PR contains version bumps in `package.json` files, updated `CHANGELOG.md` entries, and manifest updates. It accumulates changes until merged.
4. **Merging the Release PR cuts the release** — tags are created, release notes are published on GitHub, and CI may publish packages.

### Configuration

Release Please is configured through two files at the repo root:

- `release-please-config.json` — defines which packages are tracked, their component names, commit type visibility, and PR title patterns.
- `.release-please-manifest.json` — tracks the current version of each package.

Packages are versioned independently. A commit affecting `packages/react/ds` does not bump the version of `packages/html/ds`.

### What to do when a Release PR appears

Release PRs are created automatically by Release Please. When you see one:

1. **Review the CHANGELOG entries** — make sure the descriptions make sense to consumers.
2. **Check the version bumps** — verify they match expectations (patch vs minor vs major).
3. **Merge when ready to release** — merging the Release PR triggers the actual release. Do not merge if you want to accumulate more changes first.

The Release PR title follows the pattern: `chore(auto-release): release main`.
