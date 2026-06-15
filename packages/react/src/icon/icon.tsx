'use client';
import type { ComponentPropsWithoutRef, MouseEventHandler } from 'react';
import { forwardRef } from 'react';
import _ from 'lodash';
import clsx from 'clsx';
import AccessibilityIcon from '@/atoms/icons/Accessibility';
import AddCircleIcon from '@/atoms/icons/AddCircle';
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

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type IconProps = {
  icon: IconId;
  size?: IconSize;
  disabled?: boolean;
  /** @deprecated For SVG components, ariaHidden is calculated based on the `ariaLabel` prop. `true` if `ariaLabel` is not passed. */
  ariaHidden?: boolean;
  ariaLabel?: string;
  inline?: boolean;
  className?: string;
  dataTestId?: string;
  /** @deprecated Use `IconButton` to add interactivity to your icons */
  onClick?: MouseEventHandler<HTMLSpanElement>;
  /** @deprecated Filled icons are now unsupported due to icons migrating to direct SVG imports. */
  filled?: boolean;
  /** @deprecated  Icons now ship as SVGs. This prop forces a Material Symbols font fallback. The package will stop including the Material Symbols stylesheet; import fonts manually if you still need this. See [here](https://ds.services.gov.ie/components/library/icon/react/) for more details. */
  useFontIcon?: boolean;
} & Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'onClick'>;

const SIZE_MAP: Record<IconSize, string> = {
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

const ICON_REGISTRY = {
  accessibility_new: AccessibilityIcon,
  add_circle: AddCircleIcon,
  apps: AppsIcon,
  arrow_back: ArrowBackwardIcon,
  arrow_downward: ArrowDownwardIcon,
  arrow_drop_down: ArrowDropDownIcon,
  arrow_drop_up: ArrowDropUpIcon,
  arrow_forward: ArrowForwardIcon,
  arrow_left_alt: ArrowLeftIcon,
  arrow_outward: ArrowOutwardIcon,
  arrow_right_alt: ArrowRightIcon,
  arrow_upward: ArrowUpwardIcon,
  attach_file: AttachFileIcon,
  block: BlockIcon,
  call: CallIcon,
  cancel: CancelIcon,
  candlestick_chart: CandlestickChartIcon,
  chat_bubble: ChatBubbleIcon,
  check: CheckIcon,
  check_circle: CheckCircleIcon,
  chevron_left: KeyboardArrowLeftIcon,
  chevron_right: KeyboardArrowRightIcon,
  child_care: ChildCareIcon,
  close: CloseIcon,
  content_copy: ContentCopyIcon,
  credit_card: CreditCardIcon,
  delete: DeleteIcon,
  directions_car: DirectionsCarIcon,
  do_not_disturb_on: DoNotDisturbOnIcon,
  download: DownloadIcon,
  edit: EditIcon,
  error: ErrorIcon,
  event: EventIcon,
  filter_list: FilterListIcon,
  health_and_safety: HealthAndSafetyIcon,
  home: HomeIcon,
  info: InfoIcon,
  keyboard_arrow_down: KeyboardArrowDownIcon,
  keyboard_arrow_left: KeyboardArrowLeftIcon,
  keyboard_arrow_right: KeyboardArrowRightIcon,
  keyboard_arrow_up: KeyboardArrowUpIcon,
  link: LinkIcon,
  location_on: LocationOnIcon,
  login: LoginIcon,
  logout: LogoutIcon,
  mail: MailIcon,
  menu: MenuIcon,
  mic: MicIcon,
  more_horiz: MoreHorizontalIcon,
  more_vert: MoreVerticalIcon,
  open_in_new: OpenInNewIcon,
  person: PersonIcon,
  person_cancel: PersonCancelIcon,
  person_check: PersonCheckIcon,
  refresh: RefreshIcon,
  search: SearchIcon,
  send: SendIcon,
  settings: SettingsIcon,
  sort: SortIcon,
  space_dashboard: SpaceDashboardIcon,
  sync: SyncIcon,
  swap_vert: SwapVerticalIcon,
  thumb_down: ThumbDownIcon,
  thumb_up: ThumbUpIcon,
  unfold_more: UnfoldMoreIcon,
  upload: UploadIcon,
  visibility: VisibilityIcon,
  visibility_off: VisibilityOffIcon,
  warning: WarningIcon,
  work: WorkIcon,
  social_bluesky: BlueskyIcon,
  social_facebook: FacebookIcon,
  social_instagram: InstagramIcon,
  social_linkedin: LinkedinIcon,
  social_threads: ThreadsIcon,
  social_tiktok: TiktokIcon,
  social_x: XIcon,
  social_youtube: YoutubeIcon,
  placeholder: PlaceholderIcon,
  first_page: FirstPageIcon,
  last_page: LastPageIcon,
} as const;

export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  (
    {
      icon,
      size = 'md',
      disabled,
      id,
      ariaHidden,
      ariaLabel,
      inline,
      className,
      onClick,
      useFontIcon,
      filled,
      dataTestId,
      ...props
    },
    ref,
  ) => {
    const fontSize = SIZE_MAP[size] ?? SIZE_MAP.md;
    const Component = ICON_REGISTRY[icon];

    if (Component && !useFontIcon) {
      const svgClass = clsx(
        'gi-shrink-0',
        { 'gi-block': !inline, 'gi-inline-block': inline, 'gi-fill-gray-700': disabled },
        className,
      );

      return <Component id={id} size={fontSize} className={svgClass} label={ariaLabel} dataTestId={dataTestId} />;
    }

    return (
      <span
        aria-hidden={ariaHidden}
        aria-label={ariaLabel}
        data-testid={dataTestId ?? 'govie-icon'}
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
          ...props?.style,
        }}
      >
        {icon as string}
      </span>
    );
  },
);

export default Icon;

export type IconId = keyof typeof ICON_REGISTRY;

export const Icons = _.keys(ICON_REGISTRY);
