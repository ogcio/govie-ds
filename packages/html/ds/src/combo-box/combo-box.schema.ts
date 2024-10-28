import * as zod from 'zod';

export const DropdownItemSchema = zod.object({
  label: zod.string({ description: 'The label for the dropdown Item' }),
  options: zod
    .array(
      zod.object({
        label: zod.string({
          description: 'The label for the option in the dropdown',
        }),
        value: zod.string({
          description: 'The value for the option in the dropdown',
        }),
      }),
    )
    .describe('Array of options that will be displayed in the dropdown'),
  noSearch: zod
    .boolean({
      description: 'Specify if the dropdown does not need a search component',
    })
    .optional(),
});

export const ComboBoxSchema = zod.object({
  action: zod.string({ description: 'The URL for the form submission' }),
  method: zod
    .union([zod.literal('get'), zod.literal('post')])
    .describe('The type of request for the submission')
    .optional(),
  dropdownItems: zod
    .array(DropdownItemSchema)
    .describe('Array of dropdown item used in the combo box'),
  id: zod.string({ description: 'The id of the combobox' }).optional(),
});

export type ComboBoxProps = zod.infer<typeof ComboBoxSchema>;
