import * as zod from 'zod';
import { Size, Tag } from '../heading/heading.schema';
import { textInputSchema } from '../text-input/text-input.schema';

export enum RadioSizeEnum {
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
}

export const radioSchema = zod.object({
  value: zod.string({
    description:
      'The value associated with the input (this is also the value that is sent on submit)',
    required_error: 'The value associated with the input is required',
  }),
  name: zod
    .string({
      description: 'Name attribute of the input element',
    })
    .optional(),
  label: zod
    .string({
      description:
        'The value of the radio that will be displayed on the screen',
    })
    .optional(),
  hint: zod
    .string({
      description:
        'If there is additional text required in order to give the user more context',
    })
    .optional(),
  id: zod
    .string({
      description: 'The id of the Radio',
    })
    .optional(),
  size: zod
    .nativeEnum(RadioSizeEnum, {
      description: 'Specifies the size of the radio',
    })
    .optional(),
  checked: zod
    .boolean({ description: 'if true the component is checked' })
    .optional(),
});

export const radiosSchema = zod.object({
  groupId: zod.string({
    description: 'An unique ID given to the group of radios',
    required_error: 'The unique ID is required',
  }),
  inline: zod
    .boolean({
      description: 'specify if the radios are inline',
    })
    .optional(),
  items: zod
    .object({
      label: zod
        .string({
          description:
            'The value of the radio that will be displayed on the screen',
        })
        .optional(),
      value: zod.string({
        description:
          'The value associated with the input (this is also the value that is sent on submit)',
        required_error: 'The value associated with the input is required',
      }),
      hint: zod
        .string({
          description:
            'If there is additional text required in order to give the user more context',
        })
        .optional(),
      conditionalInput: textInputSchema
        .describe('Add a conditional input if neccessary')
        .optional(),
      checked: zod
        .boolean({ description: 'if true the radio is checked' })
        .optional(),
    })
    .describe(
      'Array of the radios which include the label,value and hint properties',
    )
    .array(),
  errorMessage: zod
    .string({
      description: 'The error message to be displayed',
    })
    .optional(),
  dividerOption: zod
    .object({
      label: zod.string({
        description: 'The value of the divider radio label',
      }),
      value: zod.string({
        description: 'The value associated with the divider radio input',
      }),
      hint: zod
        .string({
          description: 'The value of additional text of the divider radio',
        })
        .optional(),
      checked: zod
        .boolean({ description: 'if true the radio is checked' })
        .optional(),
    })
    .describe('if a radio is required with a separation from the other options')
    .optional(),
  title: zod
    .object({
      value: zod.string({
        description: 'The name of the title',
      }),
      asHeading: zod
        .object({
          size: zod.nativeEnum(Size, {
            description: 'Options for the size of the heading',
            required_error: 'Option is required',
          }),
          as: zod.nativeEnum(Tag, {
            description: 'Options for the tag element of the heading',
            required_error: 'A tag element is required',
          }),
        })
        .describe('Heading object which includes size and tag')
        .optional(),
      hint: zod
        .string({
          description: 'Specifies the hint of the title',
        })
        .optional(),
    })
    .describe(
      'The properties of the title which include value, asHeading and hint',
    )
    .optional(),
  size: zod
    .nativeEnum(RadioSizeEnum, {
      description: 'Specifies the size of the radio',
    })
    .optional(),
});

export type RadiosProps = zod.infer<typeof radiosSchema>;
export type RadioProps = zod.infer<typeof radioSchema>;
