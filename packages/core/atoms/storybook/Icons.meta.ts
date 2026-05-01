import type { ArgTypes, StoryContext, Renderer } from 'storybook/internal/types';
import { within, expect } from 'storybook/test';
import type { IconProps } from '../icons/types';
import * as icons from '../icons';
import _ from 'lodash';

export const iconList = {
  base: [
    { Component: icons.AccessibilityIcon, name: 'Accessibility', selector: 'gi-accessibility-icon' },
    { Component: icons.AddCircleIcon, name: 'AddCircle', selector: 'gi-add-circle-icon' },
    { Component: icons.AppsIcon, name: 'Apps', selector: 'gi-apps-icon' },
    { Component: icons.AttachFileIcon, name: 'AttachFile', selector: 'gi-attach-file-icon' },
    { Component: icons.BlockIcon, name: 'Block', selector: 'gi-block-icon' },
    { Component: icons.CallIcon, name: 'Call', selector: 'gi-call-icon' },
    { Component: icons.CancelIcon, name: 'Cancel', selector: 'gi-cancel-icon' },
    { Component: icons.CandlestickChartIcon, name: 'CandlestickChart', selector: 'gi-candlestick-chart-icon' },
    { Component: icons.ChatBubbleIcon, name: 'ChatBubble', selector: 'gi-chat-bubble-icon' },
    { Component: icons.CheckIcon, name: 'Check', selector: 'gi-check-icon' },
    { Component: icons.CheckCircleIcon, name: 'CheckCircle', selector: 'gi-check-circle-icon' },
    { Component: icons.ChildCareIcon, name: 'ChildCare', selector: 'gi-child-care-icon' },
    { Component: icons.CloseIcon, name: 'Close', selector: 'gi-close-icon' },
    { Component: icons.ContentCopyIcon, name: 'ContentCopy', selector: 'gi-content-copy-icon' },
    { Component: icons.CreditCardIcon, name: 'CreditCard', selector: 'gi-credit-card-icon' },
    { Component: icons.DeleteIcon, name: 'Delete', selector: 'gi-delete-icon' },
    { Component: icons.DirectionsCarIcon, name: 'DirectionsCar', selector: 'gi-directions-car-icon' },
    { Component: icons.DoNotDisturbOnIcon, name: 'DoNotDisturbOn', selector: 'gi-do-not-disturb-on-icon' },
    { Component: icons.DownloadIcon, name: 'Download', selector: 'gi-download-icon' },
    { Component: icons.EditIcon, name: 'Edit', selector: 'gi-edit-icon' },
    { Component: icons.ErrorIcon, name: 'Error', selector: 'gi-error-icon' },
    { Component: icons.EventIcon, name: 'Event', selector: 'gi-event-icon' },
    { Component: icons.FilterListIcon, name: 'FilterList', selector: 'gi-filter-list-icon' },
    { Component: icons.HealthAndSafetyIcon, name: 'HealthAndSafety', selector: 'gi-health-and-safety-icon' },
    { Component: icons.HomeIcon, name: 'Home', selector: 'gi-home-icon' },
    { Component: icons.InfoIcon, name: 'Info', selector: 'gi-info-icon' },
    { Component: icons.LinkIcon, name: 'Link', selector: 'gi-link-icon' },
    { Component: icons.LocationOnIcon, name: 'LocationOn', selector: 'gi-location-on-icon' },
    { Component: icons.LoginIcon, name: 'Login', selector: 'gi-login-icon' },
    { Component: icons.LogoutIcon, name: 'Logout', selector: 'gi-logout-icon' },
    { Component: icons.MailIcon, name: 'Mail', selector: 'gi-mail-icon' },
    { Component: icons.MenuIcon, name: 'Menu', selector: 'gi-menu-icon' },
    { Component: icons.MicIcon, name: 'Mic', selector: 'gi-mic-icon' },
    { Component: icons.MoreHorizontalIcon, name: 'MoreHorizontal', selector: 'gi-more-horizontal-icon' },
    { Component: icons.MoreVerticalIcon, name: 'MoreVertical', selector: 'gi-more-vertical-icon' },
    { Component: icons.OpenInNewIcon, name: 'OpenInNew', selector: 'gi-open-in-new-icon' },
    { Component: icons.PersonIcon, name: 'Person', selector: 'gi-person-icon' },
    { Component: icons.PersonCancelIcon, name: 'PersonCancel', selector: 'gi-person-cancel-icon' },
    { Component: icons.PersonCheckIcon, name: 'PersonCheck', selector: 'gi-person-check-icon' },
    { Component: icons.PlaceholderIcon, name: 'Placeholder', selector: 'gi-placeholder-icon' },
    { Component: icons.RefreshIcon, name: 'Refresh', selector: 'gi-refresh-icon' },
    { Component: icons.SearchIcon, name: 'Search', selector: 'gi-search-icon' },
    { Component: icons.SendIcon, name: 'Send', selector: 'gi-send-icon' },
    { Component: icons.SettingsIcon, name: 'Settings', selector: 'gi-settings-icon' },
    { Component: icons.SortIcon, name: 'Sort', selector: 'gi-sort-icon' },
    { Component: icons.SpaceDashboardIcon, name: 'SpaceDashboard', selector: 'gi-space-dashboard-icon' },
    { Component: icons.SyncIcon, name: 'Sync', selector: 'gi-sync-icon' },
    { Component: icons.ThumbDownIcon, name: 'ThumbDown', selector: 'gi-thumb-down-icon' },
    { Component: icons.ThumbUpIcon, name: 'ThumbUp', selector: 'gi-thumb-up-icon' },
    { Component: icons.UnfoldMoreIcon, name: 'UnfoldMore', selector: 'gi-unfold-more-icon' },
    { Component: icons.UploadIcon, name: 'Upload', selector: 'gi-upload-icon' },
    { Component: icons.VisibilityIcon, name: 'Visibility', selector: 'gi-visibility-icon' },
    { Component: icons.VisibilityOffIcon, name: 'VisibilityOff', selector: 'gi-visibility-off-icon' },
    { Component: icons.WarningIcon, name: 'Warning', selector: 'gi-warning-icon' },
  ],
  navigation: [
    { Component: icons.ArrowDownwardIcon, name: 'ArrowDownward', selector: 'gi-arrow-downward-icon' },
    { Component: icons.ArrowForwardIcon, name: 'ArrowForward', selector: 'gi-arrow-forward-icon' },
    { Component: icons.ArrowLeftIcon, name: 'arrow_left', selector: 'gi-arrow-left-icon' },
    { Component: icons.ArrowOutwardIcon, name: 'ArrowOutward', selector: 'gi-arrow-outward-icon' },
    { Component: icons.ArrowRightIcon, name: 'ArrowRight', selector: 'gi-arrow-right-icon' },
    { Component: icons.ArrowUpwardIcon, name: 'ArrowUpward', selector: 'gi-arrow-upward-icon' },
    { Component: icons.FirstPageIcon, name: 'FirstPage', selector: 'gi-first-page-icon' },
    { Component: icons.LastPageIcon, name: 'LastPage', selector: 'gi-last-page-icon' },
    { Component: icons.SwapVerticalIcon, name: 'SwapVertical', selector: 'gi-swap-vertical-icon' },
    { Component: icons.KeyboardArrowDownIcon, name: 'KeyboardArrowDown', selector: 'gi-keyboard-arrow-down-icon' },
    { Component: icons.KeyboardArrowLeftIcon, name: 'KeyboardArrowLeft', selector: 'gi-keyboard-arrow-left-icon' },
    { Component: icons.KeyboardArrowRightIcon, name: 'KeyboardArrowRight', selector: 'gi-keyboard-arrow-right-icon' },
    { Component: icons.KeyboardArrowUpIcon, name: 'KeyboardArrowUp', selector: 'gi-keyboard-arrow-up-icon' },
  ],
  social: [
    { Component: icons.BlueskyIcon, name: 'Bluesky', selector: 'gi-bluesky-icon' },
    { Component: icons.FacebookIcon, name: 'Facebook', selector: 'gi-facebook-icon' },
    { Component: icons.InstagramIcon, name: 'Instagram', selector: 'gi-instagram-icon' },
    { Component: icons.LinkedinIcon, name: 'Linkedin', selector: 'gi-linkedin-icon' },
    { Component: icons.ThreadsIcon, name: 'Threads', selector: 'gi-threads-icon' },
    { Component: icons.TiktokIcon, name: 'Tiktok', selector: 'gi-tiktok-icon' },
    { Component: icons.XIcon, name: 'X', selector: 'gi-x-icon' },
    { Component: icons.YoutubeIcon, name: 'Youtube', selector: 'gi-youtube-icon' },
  ],
};

export const iconsMeta = {
  tags: ['autodocs'] as string[],
  title: 'Foundation/Icons',
  args: {
    size: 48,
    color: 'currentColor',
    label: '',
    className: '',
  },
  argTypes: {
    size: {
      control: 'number',
      description: 'Width and height of the icon in pixels.',
    },
    color: {
      control: 'color',
      description: 'Fill colour — defaults to `currentColor`.',
    },
    label: {
      control: 'text',
      description:
        'Accessible label. When set, renders `role="img"` and `aria-label`. When empty, the icon is hidden from assistive technology via `aria-hidden`.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names.',
    },
  } satisfies ArgTypes<IconProps>,
  parameters: {
    docs: {
      description: {
        component:
          'Use icons to visually reinforce actions, status, and navigation. Icons accept a `size` prop (in pixels), an optional `color`, and a `label` for accessibility. In React, the icon is suffixed with `Icon`, and in Angular, the icon selector name is wrapped with `gi-<icon-name>-icon`.',
      },
    },
  },
};
const iconName = (selector: string) => selector.replace('gi-', '').replace('-icon', '');

export const Default = {
  args: iconsMeta.args,
  play: async ({ canvasElement, step }: StoryContext<Renderer>) => {
    const canvas = within(canvasElement as HTMLElement);
    const { base, navigation, social } = iconList;
    const flatIconList = [...base, ...navigation, ...social];
    for (const { selector } of flatIconList) {
      await step(`renders ${selector} icon`, async () => {
        expect(canvas.getByTestId(selector)).toBeInTheDocument();
      });
    }
  },
};
