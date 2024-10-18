import * as zod from 'zod';

export const modalSchema = zod.object({
  html: zod.string({
    description: 'The content of the modal',
    required_error: 'The content is required',
  }),
  triggerButton: zod
    .string({
      description: 'The button used for opening the modal',
    })
    .optional(),
});

export type ModalProps = zod.infer<typeof modalSchema>;
