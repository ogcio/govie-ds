# Government of Ireland Design System — Core (Mitosis)


This package serves as the **Single Source of Truth** for the Government of Ireland Design System components. It uses [Mitosis](https://github.com/BuilderIO/mitosis) to maintain a single codebase for components that are automatically compiled into native, high-performance libraries for multiple frameworks (currently React and Angular).

By using Mitosis, we ensure that:
- **Consistency**: All framework-specific libraries share the exact same logic, structure, and behavior.
- **Maintainability**: Bug fixes and features are implemented once in the core and propagated everywhere.
- **Performance**: Components are compiled to native code for each framework, avoiding the overhead of "wrapper" solutions.

## Scripts

The following scripts are available for managing component generation:

- `pnpm build`: Runs the full generation process for all supported frameworks (React and Angular).
- `pnpm build:react`: Generates only the React components and outputs them to the `@ogcio/design-system-react` package.
- `pnpm build:angular`: Generates only the Angular components and outputs them to the `@ogcio/design-system-angular` package.

## Workflow

1. **Development**: Create or modify components in `atoms/` using the `.lite.tsx` format.
2. **Generation**: Run the build scripts to compile the source code.
3. **Verification**: Check the generated code in the respective package directories.
