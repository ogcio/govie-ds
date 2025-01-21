import { z as zod } from 'zod';

export enum IconId {
  Accessibility_New = 'accessibility_new', // Accessibility new
  Add_Circle = 'add_circle', //  outline
  Apps = 'apps', // Apps
  Arrow_Back = 'arrow_back', // Arrow back
  Arrow_Downward = 'arrow_downward', // Arrow downward
  Arrow_Forward = 'arrow_forward', // Arrow forward
  Arrow_left = 'arrow_left_alt', // Arrow left
  Arrow_Outward = 'arrow_outward', // Arrow outward
  Arrow_Right = 'arrow_right_alt', // Arrow right
  Arrow_Upward = 'arrow_upward', // Arrow upward
  Attach_File = 'attach_file', // Attach file
  Block = 'block', // Block
  Call = 'call', // Call
  Cancel = 'cancel', // Cancel
  Candlestick_Chart = 'candlestick_chart',
  Chat_Bubble = 'chat_bubble', // Chat bubble
  Check = 'check', // Check
  Check_Circle = 'check_circle', // Check circle
  Chevron_Left = 'chevron_left', // Chevron left
  Chevron_Right = 'chevron_right', // Chevron right
  Child_Care = 'child_care', // Child care
  Close = 'close', // Close
  Copy = 'content_copy', // Content copy
  Credit_Card = 'credit_card', // Credit card
  Delete = 'delete', // Delete
  Car = 'directions_car', // Car
  Remove_Circle = 'do_not_disturb_on', // Remove circle outline
  Download = 'download', // File download
  Edit = 'edit', // Edit
  Error = 'error', // Error
  Event = 'event', // Event
  Filter_List = 'filter_list', // Filter list
  health_And_Safety = 'health_and_safety', // Health and safety
  Home = 'home', // Home
  Info = 'info', // Info
  Keyboard_Arrow_Down = 'keyboard_arrow_down', // Keyboard arrow down
  Keyboard_Arrow_Up = 'keyboard_arrow_up', // Keyboard arrow up
  Location = 'location_on', // Location on
  Login = 'login', // Login
  Logout = 'logout', // Logout
  Mail = 'mail', // Email
  Menu = 'menu', // Menu
  Mic = 'mic', // Mic
  More_Horizontal = 'more_horiz', // More horizontal
  More_Vertical = 'more_vert', // More vertical
  Open_In_New = 'open_in_new', // Open in new
  Person = 'person', // Person
  Person_Cancel = 'person_cancel', // Person cancel
  Person_Check = 'person_check', // Person check
  Refresh = 'refresh', // Refresh
  Search = 'search', // Search
  Send = 'send', // Send
  Settings = 'settings', // Settings
  Sort = 'sort', // Sort
  Space_Dashboard = 'space_dashboard', // Space dashboard
  Sync = 'sync', // Sync
  ThumbDown = 'thumb_down', // Thumb down
  ThumbUp = 'thumb_up', // Thumb up
  Upload = 'upload', // File upload
  Visibility = 'visibility', // Visibility
  Visibility_off = 'visibility_off', // Visibility off
  Warning = 'warning', // Warning
  Work = 'work', // Work
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
