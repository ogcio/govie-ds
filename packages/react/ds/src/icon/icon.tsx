'use client';
import {
  ComponentPropsWithoutRef,
  ComponentType,
  forwardRef,
  MouseEventHandler,
} from 'react';
import { cn } from '../cn.js';
import { iconIds } from './icons.js';
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
    disabledClass: string;
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
  placeholder: { Component: Placeholder, disabledClass: 'gi-fill-gray-700' },
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
      ...props
    },
    ref,
  ) => {
    const fontSize = SIZE_MAP[size] ?? SIZE_MAP.sm;
    const reg = ICON_REGISTRY[String(icon)];

    if (reg) {
      const { Component, disabledClass } = reg;
      const svgClass = cn(
        { 'gi-block': !inline, 'gi-inline-block': inline },
        disabled && disabledClass,
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
