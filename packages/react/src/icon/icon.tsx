'use client';
import type {
  ComponentPropsWithoutRef,
  ComponentType,
  MouseEventHandler} from 'react';
import {
  forwardRef
} from 'react';
import * as Icons from '../atoms/icons';
import { cn } from '../cn.js';
import type { iconIds } from './icons';

export type IconId = (typeof iconIds)[number];
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type IconProps = {
  icon: IconId;
  size?: IconSize;
  filled?: boolean;
  disabled?: boolean;
  ariaHidden?: boolean;
  ariaLabel?: string;
  inline?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  /**
   * Use font icon instead of svg
   * Used as a fallback for consistency during Mitosis migration.
   */
  useFontIcon?: boolean;
} & Omit<ComponentPropsWithoutRef<'span'>, 'children'>;

const SIZE_MAP: Record<IconSize, string> = {
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

type IconRegistryEntry = {
  Component: ComponentType<{ size: string; className: string }>;
  disabledClass?: string;
};
const ICON_REGISTRY: Record<IconId, IconRegistryEntry> = {
  accessibility_new: { Component: Icons.AccessibilityIcon },
  add_circle: { Component: Icons.AddCircleIcon },
  apps: { Component: Icons.AppsIcon },
  arrow_back: { Component: Icons.ArrowBackIcon },
  arrow_downward: { Component: Icons.ArrowDownIcon },
  arrow_drop_down: { Component: Icons.ArrowDropDownIcon },
  arrow_drop_up: { Component: Icons.ArrowDropUpIcon },
  arrow_forward: { Component: Icons.ArrowForwardIcon },
  arrow_left_alt: { Component: Icons.ArrowLeftIcon },
  arrow_outward: { Component: Icons.ArrowOutwardIcon },
  arrow_right_alt: { Component: Icons.ArrowRightIcon },
  arrow_upward: { Component: Icons.ArrowUpIcon },
  attach_file: { Component: Icons.AttachFileIcon },
  block: { Component: Icons.BlockIcon },
  call: { Component: Icons.CallIcon },
  cancel: { Component: Icons.CancelIcon },
  candlestick_chart: { Component: Icons.CandlestickChartIcon },
  chat_bubble: { Component: Icons.ChatBubbleIcon },
  check: { Component: Icons.CheckIcon },
  check_circle: { Component: Icons.CheckCircleIcon },
  chevron_left: { Component: Icons.KeyboardArrowLeftIcon },
  chevron_right: { Component: Icons.KeyboardArrowRightIcon },
  child_care: { Component: Icons.ChildCareIcon },
  close: { Component: Icons.CloseIcon },
  content_copy: { Component: Icons.ContentCopyIcon },
  credit_card: { Component: Icons.CreditCardIcon },
  delete: { Component: Icons.DeleteIcon },
  directions_car: { Component: Icons.DirectionsCarIcon },
  do_not_disturb_on: { Component: Icons.DoNotDisturbOnIcon },
  download: { Component: Icons.DownloadIcon },
  edit: { Component: Icons.EditIcon },
  error: { Component: Icons.ErrorIcon },
  event: { Component: Icons.EventIcon },
  filter_list: { Component: Icons.FilterListIcon },
  health_and_safety: { Component: Icons.HealthAndSafetyIcon },
  home: { Component: Icons.HomeIcon },
  info: { Component: Icons.InfoIcon },
  keyboard_arrow_down: { Component: Icons.KeyboardArrowDownIcon },
  keyboard_arrow_up: { Component: Icons.KeyboardArrowUpIcon },
  link: { Component: Icons.LinkIcon },
  location_on: { Component: Icons.LocationOnIcon },
  login: { Component: Icons.LoginIcon },
  logout: { Component: Icons.LogoutIcon },
  mail: { Component: Icons.MailIcon },
  menu: { Component: Icons.MenuIcon },
  mic: { Component: Icons.MicIcon },
  more_horiz: { Component: Icons.MoreHorizontalIcon },
  more_vert: { Component: Icons.MoreVerticalIcon },
  open_in_new: { Component: Icons.OpenInNewIcon },
  person: { Component: Icons.PersonIcon },
  person_cancel: { Component: Icons.PersonCancelIcon },
  person_check: { Component: Icons.PersonCheckIcon },
  refresh: { Component: Icons.RefreshIcon },
  search: { Component: Icons.SearchIcon },
  send: { Component: Icons.SendIcon },
  settings: { Component: Icons.SettingsIcon },
  sort: { Component: Icons.SortIcon },
  space_dashboard: { Component: Icons.SpaceDashboardIcon },
  sync: { Component: Icons.SyncIcon },
  swap_vert: { Component: Icons.SwapVerticalIcon },
  thumb_down: { Component: Icons.ThumbDownIcon },
  thumb_up: { Component: Icons.ThumbUpIcon },
  unfold_more: { Component: Icons.UnfoldMoreIcon },
  upload: { Component: Icons.UploadIcon },
  visibility: { Component: Icons.VisibilityIcon },
  visibility_off: { Component: Icons.VisibilityOffIcon },
  warning: { Component: Icons.WarningIcon },
  work: { Component: Icons.WorkIcon },

  placeholder: { Component: Icons.PlaceholderIcon },
  first_page: { Component: Icons.FirstPageIcon },
  last_page: { Component: Icons.LastPageIcon },

  social_bluesky: {
    Component: Icons.BlueskyIcon,
    disabledClass: 'gi-stroke-gray-700',
  },
  social_facebook: {
    Component: Icons.FacebookIcon,
    disabledClass: 'gi-stroke-gray-700',
  },
  social_instagram: {
    Component: Icons.InstagramIcon,
    disabledClass: 'gi-stroke-gray-700',
  },
  social_linkedin: {
    Component: Icons.LinkedinIcon,
    disabledClass: 'gi-stroke-gray-700',
  },
  social_threads: {
    Component: Icons.ThreadsIcon,
    disabledClass: 'gi-stroke-gray-700',
  },
  social_tiktok: {
    Component: Icons.TiktokIcon,
    disabledClass: 'gi-stroke-gray-700',
  },
  social_x: { Component: Icons.XIcon, disabledClass: 'gi-stroke-gray-700' },
  social_youtube: {
    Component: Icons.YoutubeIcon,
    disabledClass: 'gi-stroke-gray-700',
  },
};

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      icon,
      size = 'md',
      filled,
      disabled,
      ariaHidden,
      ariaLabel,
      inline,
      className,
      onClick,
      useFontIcon,
      ...props
    },
    ref,
  ) => {
    const fontSize = SIZE_MAP[size] ?? SIZE_MAP.md;
    const reg = ICON_REGISTRY[icon];

    if (reg && !useFontIcon) {
      const { Component, disabledClass } = reg;
      const svgClass = cn(
        { 'gi-block': !inline, 'gi-inline-block': inline },
        'gi-shrink-0',
        disabled && (disabledClass || 'gi-fill-gray-700'),
        className,
      );

      return <Component size={fontSize} className={svgClass} />;
    }

    return (
      <span
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        data-testid={'govie-icon'}
        {...props}
        ref={ref}
        onClick={onClick}
        role={ariaLabel ? 'img' : 'presentation'}
        className={cn(
          {
            'gi-block': !inline,
            'gi-inline-block': inline,
            'gi-text-gray-700': disabled,
          },
          'material-symbols-outlined',
          className,
        )}
        style={{
          fontSize,
          fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' ${fontSize}`,
          ...props?.style,
        }}
      >
        {icon as string}
      </span>
    );
  },
);

export default Icon;
