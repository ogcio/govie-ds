import { z as zod } from 'zod';

export const containerSchema = zod.object({
  html: zod
    .string({
      description: 'The raw HTML that will be wrapped around the container',
    })
    .optional(),
});

export type ContainerProps = zod.infer<typeof containerSchema>;
