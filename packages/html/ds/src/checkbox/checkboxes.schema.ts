import * as zod from 'zod';

export enum CheckboxSizeEnum {
  Large = 'lg',
  Medium = 'md',
  Small = 'sm',
}

export const checkboxesSchema = zod.object({
  fieldId: zod.string({
    description: 'An unique ID given to the group of checkboxes',
    required_error: 'The unique ID is required',
  }),
  items: zod
    .object({
      label: zod.string({
        description:
          'The value of the checkbox that will be displayed on the screen',
        required_error: 'The value of the checkbox is required',
      }),
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
      // conditionalInput: ENUMS
    })
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
    .optional(),
  title: zod
    .object({
      value: zod.string({
        description: 'The name of the title',
      }),
      asHeading: zod
        .boolean({
          description:
            'Specifies if the title is a heading ( use only if you have one group of checkboxes in a page )',
        })
        .optional(),
      hint: zod
        .string({
          description: 'Specifies the hint of the title',
        })
        .optional(),
    })
    .optional(),
  checkboxesSize: zod.nativeEnum(CheckboxSizeEnum, {
    description: 'Specifies the size of the checkbox',
  }),
});

export type CheckboxesProps = zod.infer<typeof checkboxesSchema>;
