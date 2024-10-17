'use client';
import {
  isButtonDisabled,
  getVariantAppearanceClass,
} from '../button/helpers.js';
import { ButtonProps, ButtonSize } from '../button/types.js';
import { Icon, IconPropTypes } from '../icon/icon.js';

type IconButtonType = Omit<ButtonProps, 'children'> & {
  icon: Omit<IconPropTypes, 'size'>;
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
}: IconButtonType) => {
  const iconSize = size === 'large' ? 'md' : 'sm';
  return (
    <button
      onClick={onClick}
      className={`gi-btn ${getVariantAppearanceClass({ disabled, variant, appearance })} ${getSizeClass(size)} ${isButtonDisabled({ disabled, variant, appearance })}`}
    >
      <Icon size={iconSize} {...icon} />
    </button>
  );
};
