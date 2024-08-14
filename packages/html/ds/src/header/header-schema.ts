import * as zod from 'zod';

export const headerSchema = zod.object({
  title: zod.string({
    required_error: 'Title is required.',
  }),
});
