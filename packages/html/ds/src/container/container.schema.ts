import { z as zod } from 'zod';

export const containerSchema = zod.object({
  html: zod
    .string()
    .optional()
    .describe('the raw HTML that will be wrapped around the container'),
});

export type ContainerProps = zod.infer<typeof containerSchema>;
