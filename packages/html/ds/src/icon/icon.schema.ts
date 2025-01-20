import { z as zod } from 'zod';

export enum IconId {
  Arrow_Forward = 'arrow_forward',
  Arrow_Left_Alt = 'arrow_back',
  Arrow_Right_Alt = 'arrow_forward',
  AttachFile = 'attach_file',
  Call = 'call',
  Candlestick_Chart = 'candlestick_chart',
  Check = 'check',
  CheckCircle = 'check_circle',
  ChevronLeft = 'chevron_left',
  ChevronRight = 'chevron_right',
  Close = 'close',
  Copy = 'content_copy',
  Delete = 'delete',
  Download = 'download',
  Edit = 'edit',
  Error = 'error',
  Home = 'home',
  Info = 'info',
  Keyboard_Arrow_Down = 'keyboard_arrow_down',
  Location = 'location_on',
  Logout = 'logout',
  Mail = 'mail',
  Menu = 'menu',
  Mic = 'mic',
  More_Horizontal = 'more_horiz',
  OpenInNew = 'open_in_new',
  Person = 'person',
  Search = 'search',
  Send = 'send',
  ThumbDown = 'thumb_down',
  ThumbUp = 'thumb_up',
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
    .nativeEnum(IconId, {
      description: 'Specifies the Icon name to show',
    })
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
