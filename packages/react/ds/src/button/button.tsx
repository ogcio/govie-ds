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
  className,
}: ButtonProps) => {
  return (
    <button
      className={`gi-btn ${getVariantAppearanceClass({ disabled, variant, appearance })} ${getSizeClass(size)} ${isButtonDisabled({ disabled, variant, appearance })} ${className}`}
    >
      {children}
    </button>
  );
};
