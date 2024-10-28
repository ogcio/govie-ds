import * as zod from 'zod';

export const DropdownItemSchema = zod.object({})

export const ComboBoxSchema = zod.object({
    action: zod.string({description: 'The URL for the form submission'}),
    method: zod.union([zod.literal('get'),zod.literal('post')]).describe('The type of request for the submission').optional(),
    id: zod.string({description:'The id of the combobox'})
})