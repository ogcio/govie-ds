import { meta } from '@govie-ds/tokens';

export type IconId =
  | 'copy'
  | 'edit'
  | 'mic'
  | 'send'
  | 'thumb_down'
  | 'thumb_up'
  | 'open_in_new'
  | 'attach_file';

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type IconColor = 'default' | 'disabled';

export type IconVariant = 'default' | 'filled';

export function Icon({
  icon,
  size = 'md',
  variant = 'default',
  color = 'default',
  ariaHidden,
  ariaLabel,
  inline = false,
}: {
  icon: IconId;
  size?: IconSize;
  variant?: IconVariant;
  color?: IconColor;
  ariaHidden?: boolean;
  ariaLabel?: string;
  inline?: boolean;
}) {
  const fontSize = meta.light.resolved.primitive.size[size].$value;
  const iconStyle =
    variant === 'filled' ? 'material-icons' : 'material-icons-outlined';
  const iconColor = color === 'disabled' ? 'gi-text-gray-300' : '';
  const textSize = `gi-text-[${fontSize}]`;
  const display = inline ? '' : 'gi-block';

  return (
    <span
      aria-hidden={ariaHidden || undefined}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : 'presentation'}
      className={`${iconStyle} ${iconColor} ${textSize} ${display}`}
    >
      {icon as string}
    </span>
  );
}
