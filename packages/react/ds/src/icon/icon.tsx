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

export type IconVariant = 'default' | 'outlined';

export type IconPropTypes = {
  icon: IconId;
  size?: IconSize;
  variant?: IconVariant;
  color?: IconColor;
  ariaHidden?: boolean;
  ariaLabel?: string;
  inline?: boolean;
  className?: string;
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
}: IconPropTypes) {
  const fontSize = meta.light.resolved.primitive.size[size].$value;
  const iconStyle =
    variant === 'outlined' ? 'material-icons-outlined' : 'material-icons';
  const iconColor = color === 'disabled' ? 'gi-text-gray-300' : '';
  const display = inline ? '' : 'gi-block';

  return (
    <span
      aria-hidden={ariaHidden || undefined}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : 'presentation'}
      className={`${className} ${iconStyle} ${iconColor} ${display} ${fontSize}`}
      style={{ fontSize }}
    >
      {icon as string}
    </span>
  );
}
