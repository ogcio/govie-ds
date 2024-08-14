import * as zod from 'zod';

export const headerSchema = zod.object({
  title: zod.string({
    description: 'Title of the header.',
    required_error: 'Title is required.',
  }),
});
