import { ButtonAppearance, ButtonVariant, ButtonSize } from './types.js';

export const getVariantAppearanceClass = ({
  disabled,
  variant,
  appearance,
}: {
  disabled?: boolean;
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
}) => {
  let classes;
  if (!disabled) {
    if (variant === 'secondary') {
      if (appearance === 'dark') {
        classes = 'gi-btn-secondary-dark';
      } else if (appearance === 'light') {
        classes = 'gi-btn-secondary-light';
      } else {
        classes = 'gi-btn-secondary';
      }
    } else if (variant === 'flat') {
      if (appearance === 'dark') {
        classes = 'gi-btn-flat-dark';
      } else if (appearance === 'light') {
        classes = 'gi-btn-flat-light';
      } else {
        classes = 'gi-btn-flat';
      }
    } else {
      if (appearance === 'dark') {
        classes = 'gi-btn-primary-dark';
      } else if (appearance === 'light') {
        classes = 'gi-btn-primary-light';
      } else {
        classes = 'gi-btn-primary';
      }
    }
  }
  return classes;
};

export const getSizeClass = (size?: ButtonSize) => {
  let classes;
  if (size === 'small') {
    classes = 'gi-btn-small';
  } else if (size === 'large') {
    classes = 'gi-btn-large';
  } else {
    classes = 'gi-btn-regular';
  }
  return classes;
};

export const isButtonDisabled = ({
  disabled,
  variant,
  appearance,
}: {
  disabled?: boolean;
  variant?: ButtonVariant;
  appearance?: ButtonAppearance;
}) => {
  let classes;
  if (disabled) {
    if (variant === 'secondary') {
      if (appearance === 'dark') {
        classes = 'gi-btn-secondary-dark-disabled';
      } else if (appearance === 'light') {
        classes = 'gi-btn-secondary-light-disabled';
      } else {
        classes = 'gi-btn-secondary-disabled';
      }
    } else if (variant === 'flat') {
      if (appearance === 'dark') {
        classes = 'gi-btn-flat-dark-disabled';
      } else if (appearance === 'light') {
        classes = 'gi-btn-flat-light-disabled';
      } else {
        classes = 'gi-btn-flat-disabled';
      }
    } else {
      if (appearance === 'dark') {
        classes = 'gi-btn-primary-dark-disabled';
      } else if (appearance === 'light') {
        classes = 'gi-btn-primary-light-disabled';
      } else {
        classes = 'gi-btn-primary-disabled';
      }
    }
  }
  return classes;
};
