import { z as zod } from 'zod';
import { getEnumValues } from '../helpers';

export const IconId = {
  Accessibility_New: 'accessibility_new',
  Add_Circle: 'add_circle',
  Apps: 'apps',
  Arrow_Back: 'arrow_back',
  Arrow_Downward: 'arrow_downward',
  Arrow_Forward: 'arrow_forward',
  Arrow_left: 'arrow_left_alt',
  Arrow_Outward: 'arrow_outward',
  Arrow_Right: 'arrow_right_alt',
  Arrow_Upward: 'arrow_upward',
  Attach_File: 'attach_file',
  Block: 'block',
  Call: 'call',
  Cancel: 'cancel',
  Candlestick_Chart: 'candlestick_chart',
  Chat_Bubble: 'chat_bubble',
  Check: 'check',
  Check_Circle: 'check_circle',
  Chevron_Left: 'chevron_left',
  Chevron_Right: 'chevron_right',
  Child_Care: 'child_care',
  Close: 'close',
  Copy: 'content_copy',
  Credit_Card: 'credit_card',
  Delete: 'delete',
  Car: 'directions_car',
  Remove_Circle: 'do_not_disturb_on',
  Download: 'download',
  Edit: 'edit',
  Error: 'error',
  Event: 'event',
  Filter_List: 'filter_list',
  health_And_Safety: 'health_and_safety',
  Home: 'home',
  Info: 'info',
  Keyboard_Arrow_Down: 'keyboard_arrow_down',
  Keyboard_Arrow_Up: 'keyboard_arrow_up',
  Location: 'location_on',
  Login: 'login',
  Logout: 'logout',
  Mail: 'mail',
  Menu: 'menu',
  Mic: 'mic',
  More_Horizontal: 'more_horiz',
  More_Vertical: 'more_vert',
  Open_In_New: 'open_in_new',
  Person: 'person',
  Person_Cancel: 'person_cancel',
  Person_Check: 'person_check',
  Refresh: 'refresh',
  Search: 'search',
  Send: 'send',
  Settings: 'settings',
  Sort: 'sort',
  Space_Dashboard: 'space_dashboard',
  Sync: 'sync',
  ThumbDown: 'thumb_down',
  ThumbUp: 'thumb_up',
  Upload: 'upload',
  Visibility: 'visibility',
  Visibility_off: 'visibility_off',
  Warning: 'warning',
  Work: 'work',
  Placeholder: 'placeholder',
  FirstPage: 'first_page',
  LastPage: 'last_page',
} as const;

export type IconIdType = (typeof IconId)[keyof typeof IconId];

export const IconSize = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  EXTRA_LARGE: 'xl',
} as const;

export const iconSchema = zod.object({
  icon: zod
    .enum(getEnumValues(IconId), {
      description: 'Specifies the Icon name to show',
    })
    .describe('Icon reference')
    .optional(),
  size: zod
    .enum(getEnumValues(IconSize), {
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
  dataset: zod.record(zod.string()).optional(),
});

export type IconProps = zod.infer<typeof iconSchema>;
