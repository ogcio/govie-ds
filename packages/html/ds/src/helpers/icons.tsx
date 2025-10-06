import { IconProps, IconSize } from '../icon/icon.schema';

type IconSizeKey = (typeof IconSize)[keyof typeof IconSize];

export const createIcon = (iconProps: IconProps) => {
  const icon = document.createElement('span');

  const className = ['material-symbols-outlined'];

  const fontSize: Record<IconSizeKey, string> = {
    sm: '16',
    md: '24',
    lg: '32',
    xl: '49',
  };

  const iconSize: IconSizeKey =
    (iconProps.size as IconSizeKey) ?? IconSize.MEDIUM;

  switch (iconSize) {
    case 'sm': {
      className.push(`gi-text-[${fontSize.sm}px]`);

      break;
    }
    case 'lg': {
      className.push(`gi-text-[${fontSize.lg}px]`);

      break;
    }
    case 'xl': {
      className.push(`gi-text-[${fontSize.xl}px]`);

      break;
    }
    default: {
      className.push(`gi-text-[${fontSize.md}px]`);
    }
  }

  if (!iconProps.inline) {
    className.push('gi-block');
  }

  if (iconProps.disabled) {
    className.push('gi-text-gray-700');
  }

  if (iconProps.className) {
    className.push(iconProps.className);
  }

  if (iconProps.dataset) {
    for (const [key, value] of Object.entries(iconProps.dataset || {})) {
      icon.dataset[key] = value as string;
    }
  }

  icon.className = className.join(' ');
  icon.textContent = iconProps.icon || '';
  icon.role = 'alert';

  icon.style.cssText = iconProps.filled
    ? `font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' ${fontSize[iconSize]};`
    : `font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' ${fontSize[iconSize]};`;

  return icon;
};
