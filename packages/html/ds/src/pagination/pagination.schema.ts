import * as zod from 'zod';

export const paginationSchema = zod.object({
  currentPage: zod
    .number()
    .int()
    .positive('Page number must be positive')
    .describe('Current active page number'),

  totalPages: zod
    .number()
    .int()
    .positive('Total pages must be positive')
    .describe('Total number of available pages'),
});

export type PaginationProps = zod.infer<typeof paginationSchema>;
