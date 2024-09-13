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
}

export enum IconSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  ExtraLarge = 'xl',
}

export const iconSchema = zod.object({
  icon: zod
    .nativeEnum(IconId, {
      description: 'Specifies the Icon name to show',
    })
    .optional(),
  size: zod
    .nativeEnum(IconSize, {
      description: 'Specifies the Icon size',
    })
    .optional(),
  outlined: zod.boolean().optional(),
  disabled: zod.boolean().optional(),
  ariaHidden: zod.boolean().optional(),
  ariaLabel: zod.string().optional(),
  inline: zod.boolean().optional(),
});

export type IconProps = zod.infer<typeof iconSchema>;
