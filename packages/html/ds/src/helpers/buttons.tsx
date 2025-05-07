import { ButtonProps } from '../button/types';
import { IconButtonProps } from '../icon-button/types';
import { createIcon } from './icons';

export const getButtonSizeClass = (size?: string) => {
  let classSize = '';
  switch (size) {
    case 'small': {
      classSize = 'gi-btn-small';
      break;
    }
    case 'large': {
      classSize = 'gi-btn-large';
      break;
    }
    default: {
      classSize = 'gi-btn-regular';
      break;
    }
  }
  return classSize;
};

export const getButtonAppearanceClass = (
  buttonProps: ButtonProps | IconButtonProps,
) => {
  let classAppearance;
  if (buttonProps.disabled) {
    if (buttonProps.variant === 'secondary') {
      if (buttonProps.appearance === 'dark') {
        classAppearance = 'gi-btn-secondary-dark-disabled';
      } else if (buttonProps.appearance === 'light') {
        classAppearance = 'gi-btn-secondary-light-disabled';
      } else {
        classAppearance = 'gi-btn-secondary-disabled';
      }
    } else if (buttonProps.variant === 'flat') {
      if (buttonProps.appearance === 'dark') {
        classAppearance = 'gi-btn-flat-dark-disabled';
      } else if (buttonProps.appearance === 'light') {
        classAppearance = 'gi-btn-flat-light-disabled';
      } else {
        classAppearance = 'gi-btn-flat-disabled';
      }
    } else {
      if (buttonProps.appearance === 'dark') {
        classAppearance = 'gi-btn-primary-dark-disabled';
      } else if (buttonProps.appearance === 'light') {
        classAppearance = 'gi-btn-primary-light-disabled';
      } else {
        classAppearance = 'gi-btn-primary-disabled';
      }
    }
  } else {
    if (buttonProps.variant === 'secondary') {
      if (buttonProps.appearance === 'dark') {
        classAppearance = 'gi-btn-secondary-dark';
      } else if (buttonProps.appearance === 'light') {
        classAppearance = 'gi-btn-secondary-light';
      } else {
        classAppearance = 'gi-btn-secondary';
      }
    } else if (buttonProps.variant === 'flat') {
      if (buttonProps.appearance === 'dark') {
        classAppearance = 'gi-btn-flat-dark';
      } else if (buttonProps.appearance === 'light') {
        classAppearance = 'gi-btn-flat-light';
      } else {
        classAppearance = 'gi-btn-flat';
      }
    } else {
      if (buttonProps.appearance === 'dark') {
        classAppearance = 'gi-btn-primary-dark';
      } else if (buttonProps.appearance === 'light') {
        classAppearance = 'gi-btn-primary-light';
      } else {
        classAppearance = 'gi-btn-primary';
      }
    }
  }
  return classAppearance;
};

export const createButton = (arguments_: ButtonProps) => {
  const classSize = getButtonSizeClass(arguments_.size);
  const classAppearance = getButtonAppearanceClass(arguments_);

  const component = document.createElement('button') as HTMLButtonElement;
  component.className =
    `gi-btn ${classSize} ${classAppearance} ${arguments_.className || ''}`.trim();
  if (arguments_.content) {
    component.innerHTML = arguments_.content;
  }

  return component;
};

export const createIconButton = (arguments_: IconButtonProps) => {
  let classSize;

  if (arguments_.size == 'small') {
    classSize = 'gi-icon-btn-small';
  } else if (arguments_.size == 'large') {
    classSize = 'gi-icon-btn-large';
  } else {
    classSize = 'gi-icon-btn-regular';
  }

  const classAppearance = getButtonAppearanceClass(arguments_);

  const component = document.createElement('button') as HTMLButtonElement;
  component.className =
    `gi-btn ${classSize} ${classAppearance} ${arguments_.className || ''}`.trim();

  if (arguments_.id) {
    component.setAttribute('id', arguments_.id);
  }

  const iconSize = arguments_.size === 'small' ? 'sm' : 'md';
  const icon = createIcon({ ...arguments_.icon, size: iconSize });

  component.disabled = !!arguments_.disabled;

  component.append(icon);

  return component;
};
