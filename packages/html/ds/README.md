**NOTE**
> The components should only be used by early adopters and collaborate with the design system team as the components are currently in the alpha phase. 

## DS

#### About
Package that contains the components and the styles of the <strong>HTML global components</strong>

#### Scripts

| Script                        | Description                                                                                  |
| ------------------------------| ---------------------------------------------------------------------------------------------|
| `pnpm format`                 | Formats the code and and rewrites all processed files in place                               |
| `pnpm format:check`           | Verifies if the files are formatted accordingly                                              |
| `pnpm lint`                   | Identify and report on patterns found in ECMAScript/JavaScript code                          |
| `pnpm build`                  | Runs ``pnpm build:properties`` , ``pnpm build:ts`` and ``pnpm build:styles``  in succession  |
| `pnpm build:properties`       | Generate properties from the components schemas to ensure validation                         |
| `pnpm build:ts`               | Compiles, builds and optimises the components in a production ready state                    |
| `pnpm build:styles`           | Compiles, minifies and moves the tailwind styles in the ``dist`` folder                      |
| `pnpm postbuild`              | Archives the ``dist`` folder into a ``govie-frontend.zip`` file               |


## Storybook

### About
Package that contains the storybook for the HTML global components

### Getting Started
1. Ensure you have Node installed on your machine
2. Install pnpm by using `npm install -g pnpm` or `corepack enable pnpm`
2. Run `pnpm install` to install the required packages

### Scripts

| Script                 | Description                                               |
| ---------------------- | ----------------------------------------------------------|
| `pnpm dev`             | Compiles and serves a development build of your Storybook |
| `pnpm build`           | Compiles your Storybook instance so it can be deployed    |
