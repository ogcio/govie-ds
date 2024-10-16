'use client';
import {
  isButtonDisabled,
  getSizeClass,
  getVariantAppearanceClass,
} from './helpers.js';
import { ButtonProps } from './types.js';

export const Button = ({
  variant,
  appearance,
  size,
  disabled,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`gi-btn ${getVariantAppearanceClass({ disabled, variant, appearance })} ${getSizeClass(size)} ${isButtonDisabled({ disabled, variant, appearance })}`}
    >
      {children}
    </button>
  );
};
