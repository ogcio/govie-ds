import { z as zod } from 'zod';

export enum IconId {
  Copy = 'copy',
  Edit = 'edit',
  Mic = 'mic',
  Send = 'send',
  ThumbDown = 'thumb_down',
  ThumbUp = 'thumb_up',
  OpenInNew = 'open_in_new',
  AttachFile = 'attach_file',
  Download = 'download',
}

export enum IconSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

export const iconSchema = zod.object({
  icon: zod
    .union([
      zod.nativeEnum(IconId, {
        description: 'Specifies the Icon name to show',
      }),
      zod.string().min(1, { message: 'Custom string for any other icon' }),
    ])
    .optional(),
  size: zod
    .nativeEnum(IconSize, {
      description: 'Specifies the Icon size',
    })
    .optional(),
  outlined: zod
    .boolean({
      description: 'Define icon style outlined',
    })
    .optional(),
  disabled: zod
    .boolean({
      description: 'Set disabled look&feel',
    })
    .optional(),
  ariaHidden: zod
    .boolean({
      description: 'Set ARIA hidden field',
    })
    .optional(),
  ariaLabel: zod
    .string({
      description: 'Set ARIA Label field',
    })
    .optional(),
  inline: zod
    .boolean({
      description: 'View as inline (block is default).',
    })
    .optional(),
  className: zod
    .string({
      description: 'Custom classes',
    })
    .optional(),
});

export type IconProps = zod.infer<typeof iconSchema>;
