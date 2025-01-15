import * as zod from 'zod';

export const modalSchema = zod.object({
  triggerButton: zod
    .string({
      description: 'The button used for opening the modal',
    })
    .optional(),
  closeButtonLabel: zod
    .string({
      description: 'The custom label for close button',
    })
    .optional(),
  title: zod
    .string({
      description: 'The title of the modal',
    })
    .optional(),
  body: zod.string({
    description: 'The main content or body of the modal',
  }),
  footer: zod
    .string({
      description: 'The footer content of the modal',
    })
    .optional(),
  isOpen: zod
    .boolean({
      description: 'Set the modal to open',
    })
    .optional(),
});

export type ModalProps = zod.infer<typeof modalSchema>;
