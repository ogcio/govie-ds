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
  | 'download'
  | 'keyboard_arrow_down'
  | 'info'
  | 'check_circle'
  | 'error';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type IconPropTypes = {
  icon: IconId | string;
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
}: IconPropTypes) {
  const fontSize = meta.light.resolved.primitive.size[size].$value;
  const iconStyle = filled
    ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
    : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
  const iconColor = disabled ? 'gi-text-gray-300' : '';
  const display = inline ? '' : 'gi-block';

  return (
    <span
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
