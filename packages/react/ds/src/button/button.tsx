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
  type,
  form,
  value
}: ButtonProps) => {
  return (
    <button
      type={type}
      form={form}
      value={value}
      onClick={onClick}
      className={`gi-btn ${getVariantAppearanceClass({ disabled, variant, appearance })} ${getSizeClass(size)} ${isButtonDisabled({ disabled, variant, appearance })}`}
    >
      {children}
    </button>
  );
};
