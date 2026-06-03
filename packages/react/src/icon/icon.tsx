'use client';
import type { ComponentPropsWithoutRef, ComponentType, MouseEventHandler } from 'react';
import { forwardRef } from 'react';
import clsx from 'clsx';
import AccessibilityIcon from '@/atoms/icons/Accessibility';
import AddCircle from '@/atoms/icons/AddCircle';
import AppsIcon from '@/atoms/icons/Apps';
import ArrowBackwardIcon from '@/atoms/icons/ArrowBackward';
import ArrowDownwardIcon from '@/atoms/icons/ArrowDownward';
import ArrowDropDownIcon from '@/atoms/icons/ArrowDropDown';
import ArrowDropUpIcon from '@/atoms/icons/ArrowDropUp';
import ArrowForwardIcon from '@/atoms/icons/ArrowForward';
import ArrowLeftIcon from '@/atoms/icons/ArrowLeft';
import ArrowOutwardIcon from '@/atoms/icons/ArrowOutward';
import ArrowRightIcon from '@/atoms/icons/ArrowRight';
import ArrowUpwardIcon from '@/atoms/icons/ArrowUpward';
import AttachFileIcon from '@/atoms/icons/AttachFile';
import BlockIcon from '@/atoms/icons/Block';
import CallIcon from '@/atoms/icons/Call';
import CancelIcon from '@/atoms/icons/Cancel';
import CandlestickChartIcon from '@/atoms/icons/CandlestickChart';
import ChatBubbleIcon from '@/atoms/icons/ChatBubble';
import CheckIcon from '@/atoms/icons/Check';
import CheckCircleIcon from '@/atoms/icons/CheckCircle';
import CloseIcon from '@/atoms/icons/Close';
import KeyboardArrowLeftIcon from '@/atoms/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@/atoms/icons/KeyboardArrowRight';
import ChildCareIcon from '@/atoms/icons/ChildCare';
import ContentCopyIcon from '@/atoms/icons/ContentCopy';
import CreditCardIcon from '@/atoms/icons/CreditCard';
import DeleteIcon from '@/atoms/icons/Delete';
import DirectionsCarIcon from '@/atoms/icons/DirectionsCar';
import DoNotDisturbOnIcon from '@/atoms/icons/DoNotDisturbOn';
import DownloadIcon from '@/atoms/icons/Download';
import EditIcon from '@/atoms/icons/Edit';
import ErrorIcon from '@/atoms/icons/Error';
import EventIcon from '@/atoms/icons/Event';
import FilterListIcon from '@/atoms/icons/FilterList';
import FirstPageIcon from '@/atoms/icons/FirstPage';
import HealthAndSafetyIcon from '@/atoms/icons/HealthAndSafety';
import HomeIcon from '@/atoms/icons/Home';
import InfoIcon from '@/atoms/icons/Info';
import KeyboardArrowDownIcon from '@/atoms/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@/atoms/icons/KeyboardArrowUp';
import LastPageIcon from '@/atoms/icons/LastPage';
import LinkIcon from '@/atoms/icons/Link';
import LocationOnIcon from '@/atoms/icons/LocationOn';
import LoginIcon from '@/atoms/icons/Login';
import LogoutIcon from '@/atoms/icons/Logout';
import MailIcon from '@/atoms/icons/Mail';
import MenuIcon from '@/atoms/icons/Menu';
import MicIcon from '@/atoms/icons/Mic';
import MoreHorizontalIcon from '@/atoms/icons/MoreHorizontal';
import MoreVerticalIcon from '@/atoms/icons/MoreVertical';
import OpenInNewIcon from '@/atoms/icons/OpenInNew';
import PersonIcon from '@/atoms/icons/Person';
import PersonCancelIcon from '@/atoms/icons/PersonCancel';
import PersonCheckIcon from '@/atoms/icons/PersonCheck';
import RefreshIcon from '@/atoms/icons/Refresh';
import SearchIcon from '@/atoms/icons/Search';
import SendIcon from '@/atoms/icons/Send';
import SettingsIcon from '@/atoms/icons/Settings';
import SortIcon from '@/atoms/icons/Sort';
import SpaceDashboardIcon from '@/atoms/icons/SpaceDashboard';
import SyncIcon from '@/atoms/icons/Sync';
import SwapVerticalIcon from '@/atoms/icons/SwapVertical';
import ThumbDownIcon from '@/atoms/icons/ThumbDown';
import ThumbUpIcon from '@/atoms/icons/ThumbUp';
import UnfoldMoreIcon from '@/atoms/icons/UnfoldMore';
import UploadIcon from '@/atoms/icons/Upload';
import VisibilityIcon from '@/atoms/icons/Visibility';
import VisibilityOffIcon from '@/atoms/icons/VisibilityOff';
import WarningIcon from '@/atoms/icons/Warning';
import WorkIcon from '@/atoms/icons/Work';
import BlueskyIcon from '@/atoms/icons/socials/Bluesky';
import FacebookIcon from '@/atoms/icons/socials/Facebook';
import InstagramIcon from '@/atoms/icons/socials/Instagram';
import LinkedinIcon from '@/atoms/icons/socials/Linkedin';
import ThreadsIcon from '@/atoms/icons/socials/Threads';
import TiktokIcon from '@/atoms/icons/socials/TikTok';
import XIcon from '@/atoms/icons/socials/X';
import YoutubeIcon from '@/atoms/icons/socials/Youtube';
import PlaceholderIcon from '@/atoms/icons/Placeholder';
import type { IconProps as GiIconProps } from '@/atoms/icons/types';

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
  dataTestId?: string;
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

const ICON_REGISTRY: Record<
  IconId,
  {
    Component: ComponentType<GiIconProps>;
    disabledClass?: string;
  }
> = {
  accessibility_new: { Component: AccessibilityIcon },
  add_circle: { Component: AddCircle },
  apps: { Component: AppsIcon },
  arrow_back: { Component: ArrowBackwardIcon },
  arrow_downward: { Component: ArrowDownwardIcon },
  arrow_drop_down: { Component: ArrowDropDownIcon },
  arrow_drop_up: { Component: ArrowDropUpIcon },
  arrow_forward: { Component: ArrowForwardIcon },
  arrow_left_alt: { Component: ArrowLeftIcon },
  arrow_outward: { Component: ArrowOutwardIcon },
  arrow_right_alt: { Component: ArrowRightIcon },
  arrow_upward: { Component: ArrowUpwardIcon },
  attach_file: { Component: AttachFileIcon },
  block: { Component: BlockIcon },
  call: { Component: CallIcon },
  cancel: { Component: CancelIcon },
  candlestick_chart: { Component: CandlestickChartIcon },
  chat_bubble: { Component: ChatBubbleIcon },
  check: { Component: CheckIcon },
  check_circle: { Component: CheckCircleIcon },
  chevron_left: { Component: KeyboardArrowLeftIcon },
  chevron_right: { Component: KeyboardArrowRightIcon },
  child_care: { Component: ChildCareIcon },
  close: { Component: CloseIcon },
  content_copy: { Component: ContentCopyIcon },
  credit_card: { Component: CreditCardIcon },
  delete: { Component: DeleteIcon },
  directions_car: { Component: DirectionsCarIcon },
  do_not_disturb_on: { Component: DoNotDisturbOnIcon },
  download: { Component: DownloadIcon },
  edit: { Component: EditIcon },
  error: { Component: ErrorIcon },
  event: { Component: EventIcon },
  filter_list: { Component: FilterListIcon },
  health_and_safety: { Component: HealthAndSafetyIcon },
  home: { Component: HomeIcon },
  info: { Component: InfoIcon },
  keyboard_arrow_down: { Component: KeyboardArrowDownIcon },
  keyboard_arrow_left: { Component: KeyboardArrowLeftIcon },
  keyboard_arrow_right: { Component: KeyboardArrowRightIcon },
  keyboard_arrow_up: { Component: KeyboardArrowUpIcon },
  link: { Component: LinkIcon },
  location_on: { Component: LocationOnIcon },
  login: { Component: LoginIcon },
  logout: { Component: LogoutIcon },
  mail: { Component: MailIcon },
  menu: { Component: MenuIcon },
  mic: { Component: MicIcon },
  more_horiz: { Component: MoreHorizontalIcon },
  more_vert: { Component: MoreVerticalIcon },
  open_in_new: { Component: OpenInNewIcon },
  person: { Component: PersonIcon },
  person_cancel: { Component: PersonCancelIcon },
  person_check: { Component: PersonCheckIcon },
  refresh: { Component: RefreshIcon },
  search: { Component: SearchIcon },
  send: { Component: SendIcon },
  settings: { Component: SettingsIcon },
  sort: { Component: SortIcon },
  space_dashboard: { Component: SpaceDashboardIcon },
  sync: { Component: SyncIcon },
  swap_vert: { Component: SwapVerticalIcon },
  thumb_down: { Component: ThumbDownIcon },
  thumb_up: { Component: ThumbUpIcon },
  unfold_more: { Component: UnfoldMoreIcon },
  upload: { Component: UploadIcon },
  visibility: { Component: VisibilityIcon },
  visibility_off: { Component: VisibilityOffIcon },
  warning: { Component: WarningIcon },
  work: { Component: WorkIcon },
  social_bluesky: { Component: BlueskyIcon },
  social_facebook: { Component: FacebookIcon },
  social_instagram: { Component: InstagramIcon },
  social_linkedin: { Component: LinkedinIcon },
  social_threads: { Component: ThreadsIcon },
  social_tiktok: { Component: TiktokIcon },
  social_x: { Component: XIcon },
  social_youtube: { Component: YoutubeIcon },
  placeholder: { Component: PlaceholderIcon },
  first_page: { Component: FirstPageIcon },
  last_page: { Component: LastPageIcon },
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
      dataTestId,
      ...props
    },
    ref,
  ) => {
    const fontSize = SIZE_MAP[size] ?? SIZE_MAP.md;
    const reg = ICON_REGISTRY[String(icon) as IconId];
    if (reg && !useFontIcon) {
      const { Component, disabledClass } = reg;
      const svgClass = clsx(
        { 'gi-block': !inline, 'gi-inline-block': inline },
        'gi-shrink-0',
        disabled && (disabledClass || 'gi-fill-gray-700'),
        className,
      );

      return (
        <Component id={props?.id} size={fontSize} className={svgClass} label={ariaLabel} dataTestId={dataTestId} />
      );
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
        className={clsx(
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

export type IconId =
  | 'accessibility_new'
  | 'add_circle'
  | 'apps'
  | 'arrow_back'
  | 'arrow_downward'
  | 'arrow_drop_down'
  | 'arrow_drop_up'
  | 'arrow_forward'
  | 'arrow_left_alt'
  | 'arrow_outward'
  | 'arrow_right_alt'
  | 'arrow_upward'
  | 'attach_file'
  | 'block'
  | 'call'
  | 'cancel'
  | 'candlestick_chart'
  | 'chat_bubble'
  | 'check'
  | 'check_circle'
  | 'chevron_left'
  | 'chevron_right'
  | 'child_care'
  | 'close'
  | 'content_copy'
  | 'credit_card'
  | 'delete'
  | 'directions_car'
  | 'do_not_disturb_on'
  | 'download'
  | 'edit'
  | 'error'
  | 'event'
  | 'filter_list'
  | 'health_and_safety'
  | 'home'
  | 'info'
  | 'keyboard_arrow_down'
  | 'keyboard_arrow_left'
  | 'keyboard_arrow_right'
  | 'keyboard_arrow_up'
  | 'link'
  | 'location_on'
  | 'login'
  | 'logout'
  | 'mail'
  | 'menu'
  | 'mic'
  | 'more_horiz'
  | 'more_vert'
  | 'open_in_new'
  | 'person'
  | 'person_cancel'
  | 'person_check'
  | 'refresh'
  | 'search'
  | 'send'
  | 'settings'
  | 'sort'
  | 'space_dashboard'
  | 'sync'
  | 'swap_vert'
  | 'thumb_down'
  | 'thumb_up'
  | 'unfold_more'
  | 'upload'
  | 'visibility'
  | 'visibility_off'
  | 'warning'
  | 'work'
  | 'social_bluesky'
  | 'social_facebook'
  | 'social_instagram'
  | 'social_linkedin'
  | 'social_threads'
  | 'social_tiktok'
  | 'social_x'
  | 'social_youtube'
  | 'placeholder'
  | 'first_page'
  | 'last_page';
