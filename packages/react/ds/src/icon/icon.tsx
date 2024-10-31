'use client';
import { meta } from '@govie-ds/tokens';

export type IconId =
  | 'copy'
  | 'edit'
  | 'mic'
  | 'send'
  | 'thumb_down'
  | 'thumb_up'
  | 'open_in_new'
  | 'attach_file'
  | 'close'
  | 'search'
  | 'menu'
  | 'home'
  | 'logout'
  | 'download';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type IconColor = 'default' | 'disabled';

export type IconVariant = 'default' | 'filled';

export type IconPropTypes = {
  icon: IconId | string;
  size?: IconSize;
  variant?: IconVariant;
  color?: IconColor;
  ariaHidden?: boolean;
  ariaLabel?: string;
  inline?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
};

export function Icon({
  icon,
  size = 'md',
  variant = 'default',
  color = 'default',
  ariaHidden,
  ariaLabel,
  inline = false,
  className = '',
  onClick,
}: IconPropTypes) {
  const fontSize = meta.light.resolved.primitive.size[size].$value;
  const iconStyle =
    variant === 'filled'
      ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
      : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
  const iconColor = color === 'disabled' ? 'gi-text-gray-300' : '';
  const display = inline ? '' : 'gi-block';

  return (
    <span
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
