import * as zod from 'zod';
import { Size, Tag } from '../heading/heading.schema';

export enum CheckboxSizeEnum {
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
}

export const checkboxSchema = zod.object({
  checkboxId: zod.string({
    description: 'An unique ID given to the checkbox',
    required_error: 'The ID is required',
  }),
  value: zod.string({
    description:
      'The value associated with the input (this is also the value that is sent on submit)',
    required_error: 'The value associated with the input is required',
  }),
  label: zod
    .string({
      description:
        'The value of the checkbox that will be displayed on the screen',
    })
    .optional(),
  ariaLabel: zod
    .string({ description: 'the default accessible name of the element' })
    .optional(),
  hint: zod
    .string({
      description:
        'if there is additional text required in order to give the user more context',
    })
    .optional(),
  checked: zod
    .boolean({ description: 'if true the component is checked' })
    .optional(),
  size: zod
    .nativeEnum(CheckboxSizeEnum, {
      description: 'Specifies the size of the checkbox',
    })
    .optional(),
  disabled: zod
    .boolean({
      description: 'Disable state for item',
    })
    .optional(),
  name: zod
    .string({
      description: 'The name associated with the input',
    })
    .optional(),
});

export const checkboxesSchema = zod.object({
  fieldId: zod.string({
    description: 'An unique ID given to the group of checkboxes',
    required_error: 'The unique ID is required',
  }),
  items: zod
    .object({
      label: zod
        .string({
          description:
            'The value of the checkbox that will be displayed on the screen',
        })
        .optional(),
      ariaLabel: zod
        .string({ description: 'the default accessible name of the element' })
        .optional(),
      value: zod.string({
        description:
          'The value associated with the input (this is also the value that is sent on submit)',
        required_error: 'The value associated with the input is required',
      }),
      hint: zod
        .string({
          description:
            'if there is additional text required in order to give the user more context',
        })
        .optional(),
      checked: zod
        .boolean({ description: 'if true the component is checked' })
        .optional(),
      className: zod.string({ description: 'aditional classes' }).optional(),
      disabled: zod
        .boolean({
          description: 'Disable state for item',
        })
        .optional(),
    })
    .describe(
      'Array of the checkboxes which include the label,value and hint properties',
    )
    .array(),
  errorMessage: zod
    .string({
      description: 'The error message to be displayed',
    })
    .optional(),
  noneOption: zod
    .object({
      label: zod.string({
        description: 'the value of the none checkbox label',
      }),
      value: zod.string({
        description: 'The value associated with the none checkbox input',
      }),
      hint: zod
        .string({
          description: 'The value of additional text of the none checkbox',
        })
        .optional(),
    })
    .describe('if a checkbox is required to unselect all the other checkboxes')
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
            description: 'Options for the as element of the heading',
            required_error: 'An as element is required',
          }),
        })
        .describe('Heading object which includes size and as properties')
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
    .nativeEnum(CheckboxSizeEnum, {
      description: 'Specifies the size of the checkbox',
    })
    .optional(),
});

export type CheckboxesProps = zod.infer<typeof checkboxesSchema>;
export type CheckboxProps = zod.infer<typeof checkboxSchema>;
