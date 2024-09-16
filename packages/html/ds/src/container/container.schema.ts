import { z as zod } from 'zod';

export const containerSchema = zod.object({
  html: zod
    .string({
      description: 'HTML content of the container',
    })
    .optional(),
});

export type ContainerProps = zod.infer<typeof containerSchema>;
