'use client';
import { meta } from '@govie-ds/tokens';
import { iconIds } from './icons.js';
import Facebook from './svgs/Facebook.js';
import Instagram from './svgs/instagram.js';
import Linkedin from './svgs/linkedin.js';
import X from './svgs/x.js';
import Youtube from './svgs/youtube.js';
import { cn } from '../cn.js';

export type IconId = (typeof iconIds)[number];

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type IconPropTypes = React.HTMLAttributes<HTMLSpanElement> & {
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
}: IconPropTypes) {
  const fontSize = meta.light.resolved.primitive.size[size].$value;
  const display = inline ? '' : 'gi-block';
  const strokeColor = disabled ? 'gi-stroke-gray-700' : '';
  const iconColor = disabled ? 'gi-text-gray-700' : '';

  if (icon === 'social_facebook') {
    return <Facebook size={fontSize} className={cn(display, strokeColor)} />;
  }
  if (icon === 'social_instagram') {
    return <Instagram size={fontSize} className={cn(display, strokeColor)} />;
  }
  if (icon === 'social_linkedin') {
    return <Linkedin size={fontSize} className={cn(display, strokeColor)} />;
  }
  if (icon === 'social_x') {
    return <X size={fontSize} className={cn(display, strokeColor)} />;
  }
  if (icon === 'social_youtube') {
    return <Youtube size={fontSize} className={cn(display, strokeColor)} />;
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
      className={`material-symbols-outlined ${className} ${iconColor} ${display}`}
      style={{
        fontSize,
        fontVariationSettings: iconStyle,
      }}
    >
      {icon as string}
    </span>
  );
}
