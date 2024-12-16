import { z as zod } from 'zod';

export enum IconId {
  Copy = 'content_copy',
  Edit = 'edit',
  Mic = 'mic',
  Send = 'send',
  ThumbDown = 'thumb_down',
  ThumbUp = 'thumb_up',
  OpenInNew = 'open_in_new',
  AttachFile = 'attach_file',
  Download = 'download',
  Keyboard_Arrow_Down = 'keyboard_arrow_down',
  Close = 'close',
  Search = 'search',
  Menu = 'menu',
  Home = 'home',
  Logout = 'logout',
  Info = 'info',
  CheckCircle = 'check_circle',
  Check = 'check',
  Error = 'error',
  Warning = 'warning',
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
      zod
        .string({ description: 'Custom string for any other icon' })
        .min(1, { message: 'Custom string for any other icon' }),
    ])
    .describe('Icon reference')
    .optional(),
  size: zod
    .nativeEnum(IconSize, {
      description: 'Specifies the Icon size',
    })
    .optional(),
  filled: zod
    .boolean({
      description: 'Define icon style filled',
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
  id: zod
    .string({
      description: 'custom icon id',
    })
    .optional(),
});

export type IconProps = zod.infer<typeof iconSchema>;
