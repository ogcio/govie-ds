'use client';
import type {
  ComponentPropsWithoutRef,
  ComponentType,
  MouseEventHandler,
} from 'react';
import { forwardRef } from 'react';
import {
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  KeyboardArrowRightIcon,
  KeyboardArrowLeftIcon,
  CloseIcon,
  VisibilityIcon,
  VisibilityOffIcon,
  CheckCircleIcon,
  WarningIcon,
  InfoIcon,
  ErrorIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  FirstPageIcon,
  LastPageIcon,
} from '../atoms/icons';
import { cn } from '../cn.js';
import type { iconIds } from './icons.js';
import Bluesky from './svgs/bluesky.js';
import Facebook from './svgs/facebook.js';
import Instagram from './svgs/instagram.js';
import Linkedin from './svgs/linkedin.js';
import Placeholder from './svgs/placeholder.js';
import Threads from './svgs/threads.js';
import Tiktok from './svgs/tiktok.js';
import X from './svgs/x.js';
import Youtube from './svgs/youtube.js';

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

const ICON_REGISTRY: Record<
  string,
  {
    Component: ComponentType<{ size: string; className: string }>;
    disabledClass?: string;
  }
> = {
  social_bluesky: { Component: Bluesky, disabledClass: 'gi-stroke-gray-700' },
  social_facebook: { Component: Facebook, disabledClass: 'gi-stroke-gray-700' },
  social_instagram: {
    Component: Instagram,
    disabledClass: 'gi-stroke-gray-700',
  },
  social_linkedin: { Component: Linkedin, disabledClass: 'gi-stroke-gray-700' },
  social_threads: { Component: Threads, disabledClass: 'gi-stroke-gray-700' },
  social_tiktok: { Component: Tiktok, disabledClass: 'gi-stroke-gray-700' },
  social_x: { Component: X, disabledClass: 'gi-stroke-gray-700' },
  social_youtube: { Component: Youtube, disabledClass: 'gi-stroke-gray-700' },
  placeholder: { Component: Placeholder },
  keyboard_arrow_down: { Component: KeyboardArrowDownIcon },
  keyboard_arrow_up: { Component: KeyboardArrowUpIcon },
  close: { Component: CloseIcon },
  visibility: { Component: VisibilityIcon },
  visibility_off: { Component: VisibilityOffIcon },
  info: { Component: InfoIcon },
  error: { Component: ErrorIcon },
  warning: { Component: WarningIcon },
  check_circle: { Component: CheckCircleIcon },
  keyboard_arrow_left: { Component: KeyboardArrowLeftIcon },
  keyboard_arrow_right: { Component: KeyboardArrowRightIcon },
  chevron_left: { Component: KeyboardArrowLeftIcon },
  chevron_right: { Component: KeyboardArrowRightIcon },
  arrow_left_alt: { Component: ArrowLeftIcon },
  arrow_right_alt: { Component: ArrowRightIcon },
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
      ...props
    },
    ref,
  ) => {
    const fontSize = SIZE_MAP[size] ?? SIZE_MAP.md;
    const reg = ICON_REGISTRY[String(icon)];

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
