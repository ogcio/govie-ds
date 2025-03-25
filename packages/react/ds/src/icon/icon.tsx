'use client';
import { meta } from '@govie-ds/tokens';
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

export type IconProps = React.HTMLAttributes<HTMLSpanElement> & {
  icon: IconId;
  size?: IconSize;
  filled?: boolean;
  disabled?: boolean;
  ariaHidden?: boolean;
  ariaLabel?: string;
  inline?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
};

export function Icon({
  icon,
  size = 'md',
  filled,
  disabled,
  ariaHidden,
  ariaLabel,
  inline = false,
  className = '',
  onClick,
  ...props
}: IconProps) {
  const fontSize = meta.light.resolved.primitive.size[size].$value;

  if (icon === 'social_bluesky') {
    return (
      <Bluesky
        size={fontSize}
        className={cn({
          'gi-block': !inline,
          'gi-inline-block': inline,
          'gi-stroke-gray-700': disabled,
        })}
      />
    );
  }
  if (icon === 'social_facebook') {
    return (
      <Facebook
        size={fontSize}
        className={cn({
          'gi-block': !inline,
          'gi-inline-block': inline,
          'gi-stroke-gray-700': disabled,
        })}
      />
    );
  }
  if (icon === 'social_instagram') {
    return (
      <Instagram
        size={fontSize}
        className={cn({
          'gi-block': !inline,
          'gi-inline-block': inline,
          'gi-stroke-gray-700': disabled,
        })}
      />
    );
  }
  if (icon === 'social_linkedin') {
    return (
      <Linkedin
        size={fontSize}
        className={cn({
          'gi-block': !inline,
          'gi-inline-block': inline,
          'gi-stroke-gray-700': disabled,
        })}
      />
    );
  }
  if (icon === 'social_threads') {
    return (
      <Threads
        size={fontSize}
        className={cn({
          'gi-block': !inline,
          'gi-inline-block': inline,
          'gi-stroke-gray-700': disabled,
        })}
      />
    );
  }
  if (icon === 'social_tiktok') {
    return (
      <Tiktok
        size={fontSize}
        className={cn({
          'gi-block': !inline,
          'gi-inline-block': inline,
          'gi-stroke-gray-700': disabled,
        })}
      />
    );
  }
  if (icon === 'social_x') {
    return (
      <X
        size={fontSize}
        className={cn({
          'gi-block': !inline,
          'gi-inline-block': inline,
          'gi-stroke-gray-700': disabled,
        })}
      />
    );
  }
  if (icon === 'social_youtube') {
    return (
      <Youtube
        size={fontSize}
        className={cn({
          'gi-block': !inline,
          'gi-inline-block': inline,
          'gi-stroke-gray-700': disabled,
        })}
      />
    );
  }
  if (icon === 'placeholder') {
    return (
      <Placeholder
        size={fontSize}
        className={cn({
          'gi-block': !inline,
          'gi-inline-block': inline,
          'gi-stroke-gray-700': disabled,
        })}
      />
    );
  }

  const iconStyle = filled
    ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' " + fontSize
    : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' " + fontSize;

  return (
    <span
      {...props}
      data-testid="govie-icon"
      onClick={onClick}
      aria-hidden={ariaHidden || undefined}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : 'presentation'}
      className={cn(
        { 'gi-block': !inline, 'gi-text-gray-700': disabled },
        'material-symbols-outlined',
        className,
      )}
      style={{
        fontSize,
        fontVariationSettings: iconStyle,
      }}
    >
      {icon as string}
    </span>
  );
}
