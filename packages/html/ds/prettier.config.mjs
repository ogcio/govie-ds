/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */

import sharedPrettierConfig from '@govie-ds/prettier-config' with { type: 'json' }

const config = {
    ...sharedPrettierConfig,
    plugins: ['prettier-plugin-jinja-template'],
    overrides: [
        {
            files: ['*.html'],
            options: {
                parser: 'jinja-template',
            },
        },
    ],
}

export default config
