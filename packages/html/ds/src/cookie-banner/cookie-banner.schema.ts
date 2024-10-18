import * as zod from 'zod';
import { buttonSchema } from '../button/button-schema';
import { linkSchema } from '../link/link.schema';

export const cookieBannerSchema = zod.object({
  children: zod.string({
    description: 'The content of the default cookie banner',
    required_error: 'The content is required',
  }),
  accept: zod.object({
    children: zod.string({
      description: 'The content of the accepted cookie banner',
      required_error: 'The content is required',
    }),
    triggerButton: buttonSchema.describe(
      'The button that displays the accepted cookie banner',
    ),
  }),
  reject: zod.object({
    children: zod.string({
      description: 'The content of the rejected cookie banner',
      required_error: 'The content is required',
    }),
    triggerButton: buttonSchema.describe(
      'The button that displays the rejected cookie banner',
    ),
  }),
  dismissButton: buttonSchema
    .describe('The button that hides the cookie banner')
    .optional(),
  cookieLink: linkSchema
    .describe(
      'Additional Link in order to redirect the user to the cookies page',
    )
    .optional(),
});

export type CookieBannerProps = zod.infer<typeof cookieBannerSchema>
