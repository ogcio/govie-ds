'use client';
import {
  isButtonDisabled,
  getVariantAppearanceClass,
} from '../button/helpers.js';
import { ButtonProps, ButtonSize } from '../button/types.js';
import { Icon, IconProps } from '../icon/icon.js';

export type IconButtonProps = Omit<ButtonProps, 'children'> & {
  icon: Omit<IconProps, 'size'>;
  className?: string;
};

const getSizeClass = (size?: ButtonSize) => {
  let classes;
  if (size === 'small') {
    classes = 'gi-icon-btn-small';
  } else if (size === 'large') {
    classes = 'gi-icon-btn-large';
  } else {
    classes = 'gi-icon-btn-regular';
  }
  return classes;
};

export const IconButton = ({
  icon,
  variant,
  appearance,
  size,
  disabled,
  onClick,
  className = '',
}: IconButtonProps) => {
  const iconSize = size === 'small' ? 'sm' : 'md';
  return (
    <button
      aria-disabled={disabled}
      role="button"
      data-testid={`govieIconButton-${appearance}-${variant}-${size}-${disabled}`}
      onClick={onClick}
      className={`gi-btn ${getVariantAppearanceClass({ disabled, variant, appearance })} ${getSizeClass(size)} ${isButtonDisabled({ disabled, variant, appearance })} ${className}`}
    >
      <Icon size={iconSize} {...icon} />
    </button>
  );
};
