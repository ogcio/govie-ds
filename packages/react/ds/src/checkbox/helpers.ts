import { CheckboxSizeEnum, type CheckboxSizeEnumType } from './types.js';

export const getTickSize = (size: CheckboxSizeEnumType): string => {
  switch (size) {
    case CheckboxSizeEnum.Large: {
      return 'checked:before:gi-w-7 checked:before:gi-h-3.5 checked:before:gi-left-1.5 checked:before:gi-top-2';
    }
    case CheckboxSizeEnum.Small: {
      return 'checked:before:gi-w-4 checked:before:gi-h-2 checked:before:gi-left-0.5 checked:before:gi-top-1';
    }
    default: {
      return 'checked:before:gi-w-5 checked:before:gi-h-2.5 checked:before:gi-left-1 checked:before:gi-top-1.5';
    }
  }
};

export const getSizeClass = (size: CheckboxSizeEnumType): string => {
  switch (size) {
    case CheckboxSizeEnum.Large: {
      return 'gi-w-11 gi-h-11';
    }
    case CheckboxSizeEnum.Small: {
      return 'gi-w-6 gi-h-6';
    }
    default: {
      return 'gi-w-8 gi-h-8';
    }
  }
};
