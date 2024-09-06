import { z as zod } from 'zod';

export const containerSchema = zod.object({
  html: zod.string().optional(),
});

export type ContainerProps = zod.infer<typeof containerSchema>;
