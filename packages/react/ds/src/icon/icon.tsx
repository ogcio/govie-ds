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

export type IconVariant = 'default' | 'outlined';

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
  let fontSize = 'gi-text-md';
  switch (size) {
    case 'sm': {
      fontSize = 'gi-text-sm';
      break;
    }
    case 'md': {
      fontSize = 'gi-text-md';
      break;
    }
    case 'lg': {
      fontSize = 'gi-text-lg';
      break;
    }
    case 'xl': {
      fontSize = 'gi-text-xl';
      break;
    }
  }

  const iconStyle =
    variant === 'outlined' ? 'material-icons-outlined' : 'material-icons';
  const iconColor = color === 'disabled' ? 'gi-text-gray-300' : '';
  const display = inline ? '' : 'gi-block';

  return (
    <span
      aria-hidden={ariaHidden || undefined}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : 'presentation'}
      className={`${iconStyle} ${iconColor} ${display} ${fontSize}`}
    >
      {icon as string}
    </span>
  );
}
