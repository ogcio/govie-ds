import * as zod from 'zod';
// import { buttonSchema } from '../button/types';
// import { linkSchema } from '../link/types';

export const cookieBannerSchema = zod.object({
  children: zod.string({
    description: 'The content of the default cookie banner',
    required_error: 'The content is required',
  }),
  accept: zod
    .object({
      children: zod.string({
        description: 'The content of the accepted cookie banner',
        required_error: 'The content is required',
      }),
      // triggerButton: buttonSchema.describe(
      //   'The button that displays the accepted cookie banner',
      // ),
    })
    .describe(
      'Properties for the accepted cookie ( Button triger and content)',
    ),
  reject: zod
    .object({
      children: zod.string({
        description: 'The content of the rejected cookie banner',
        required_error: 'The content is required',
      }),
      // triggerButton: buttonSchema.describe(
      //   'The button that displays the rejected cookie banner',
      // ),
    })
    .describe('Properties for the accepted cookie ( Button triger and content'),
  // dismissButton: buttonSchema
  //   .describe('The button that hides the cookie banner')
  //   .optional(),
  // cookieLink: linkSchema
  //   .describe(
  //     'Additional Link in order to redirect the user to the cookies page',
  //   )
  //   .optional(),
  dataTestid: zod
    .string({
      description: 'Test id for the component.',
    })
    .optional(),
});

export type CookieBannerProps = zod.infer<typeof cookieBannerSchema>;
