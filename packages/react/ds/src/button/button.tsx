import {
  isButtonDisabled,
  getIconPosition,
  getSizeClass,
  getVariantAppearanceClass,
} from './helpers.js';
import { ButtonProps } from './types.js';

export const Button = ({
  variant,
  appearance,
  size,
  label,
  disabled,
  iconEnd,
  icon,
}: ButtonProps) => {
  return (
    <button
      className={`gi-btn ${getVariantAppearanceClass({ disabled, variant, appearance })} ${getSizeClass(size)} ${getIconPosition(iconEnd)} ${isButtonDisabled({ disabled, variant, appearance })}`}
    >
      {icon && icon}
      {label}
    </button>
  );
};
