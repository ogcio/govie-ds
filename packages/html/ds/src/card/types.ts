import { ButtonProps } from '../button/types';
import { IconProps } from '../icon/icon.schema';
import { LinkProps } from '../link/types';
import { TagProps } from '../tag/types';

type Action =
  | (ButtonProps & { type: 'button' })
  | (LinkProps & { type: 'link' });

type ImagePropTypes = {
  src: string;
  alt?: string;
  aspectRatio?: '4/3' | '1/1' | `${number}/${number}`;
};

type IframePropTypes = {
  src: string;
  title?: string;
  allowFullScreen?: boolean;
  allow?: string;
};

type MediaContent =
  | {
      type: 'image';
      config: ImagePropTypes;
    }
  | {
      type: 'icon';
      config: IconProps;
    }
  | {
      type: 'iframe';
      config: IframePropTypes;
    };

export type CardProps = {
  type: 'vertical' | 'horizontal';
  inset?: 'body' | 'full' | 'none';
  title: string;
  subTitle?: string;
  href?: string;
  media?: MediaContent;
  tag?: TagProps;
  content?: string;
  action?: Action;
  dataTestid?: string;
};

// import * as zod from 'zod';

// import { getEnumValues } from '../helpers';
// import { iconSchema } from '../icon/icon.schema';

// export const CardType = {
//   Vertical: 'vertical',
//   Horizontal: 'horizontal',
// } as const;

// export const InsetType = {
//   None: 'none',
//   Body: 'body',
//   Full: 'full',
// } as const;

// const imagePropsSchema = zod.object({
//   src: zod.string().describe('Source URL for the image'),
//   alt: zod.string().optional().describe('Alt text for the image'),
//   aspectRatio: zod
//     .string()
//     .refine((value) => /^\d+\/\d+$/.test(value), {
//       message:
//         "Aspect ratio must be in 'width/height' format (e.g., '16/9', '4/3')",
//     })
//     .optional()
//     .describe('Aspect ratio for the image'),
// });

// const iframePropsSchema = zod.object({
//   src: zod.string().describe('Source URL for the iframe'),
//   title: zod.string().optional().describe('Title for the iframe'),
//   allowFullScreen: zod.boolean().optional().describe('Allow fullscreen mode'),
//   allow: zod.string().optional().describe('Permissions for the iframe'),
// });

// const mediaContentSchema = zod.discriminatedUnion('type', [
//   zod.object({
//     type: zod.literal('image'),
//     config: imagePropsSchema,
//   }),
//   zod.object({
//     type: zod.literal('icon'),
//     config: iconSchema,
//   }),
//   zod.object({
//     type: zod.literal('iframe'),
//     config: iframePropsSchema,
//   }),
// ]);

// // const actionSchema = zod.discriminatedUnion('type', [
// //   buttonSchema.extend({
// //     type: zod.literal('button').describe('Type of action is a button'),
// //   }),
// //   linkSchema.extend({
// //     type: zod.literal('link').describe('Type of action is a link'),
// //   }),
// // ]);

// export const cardSchema = zod.object({
//   type: zod.enum(getEnumValues(CardType), {
//     description: 'Defines whether the card is vertical or horizontal',
//   }),
//   title: zod
//     .string({
//       description: 'Title of the card',
//     })
//     .optional(),
//   subTitle: zod
//     .string({
//       description: 'subTitle of the card',
//     })
//     .optional(),
//   href: zod
//     .string({
//       description: 'URL for the card title link (if applicable)',
//     })
//     .optional(),
//   media: mediaContentSchema
//     .describe('Media content for the card (image, icon, or iframe)')
//     .optional(),
//   inset: zod
//     .enum(getEnumValues(InsetType), {
//       description: 'Defines where the content is inset',
//     })
//     .optional(),
//   tag: tagSchema.describe('Define tag properties').optional(),
//   content: zod
//     .string({
//       description: 'Content or description of the card',
//     })
//     .optional(),
//   // action: actionSchema
//   //   .describe('Defines the action for the card (either a button or link)')
//   //   .optional(),
//   dataTestid: zod
//     .string({
//       description: 'Test id for the component.',
//     })
//     .optional(),
// });

// export type CardProps = zod.infer<typeof cardSchema>;
