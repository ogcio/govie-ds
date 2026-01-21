import { MitosisPlugin } from '@builder.io/mitosis'
import format from '@prettier/sync'
import config from '@ogcio/design-system-prettier-config'
import type { Options } from 'prettier'

/**
 * Custom Prettier formatter for Mitosis code generation.
 */
const prettierFormat: MitosisPlugin = () => ({
  code: {
    post: (code) =>
      format.format(code, {
        parser: 'typescript',
        ...(config as Options),
      }),
  },
})

export default prettierFormat
