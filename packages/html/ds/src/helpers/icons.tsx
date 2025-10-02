import { IconProps } from '../icon/icon.schema';

export const createIcon = (iconProps: IconProps) => {
  const icon = document.createElement('span');

  const className = ['material-symbols-outlined'];

  if (iconProps.size == 'sm') {
    className.push('gi-text-[16px]');
  } else if (iconProps.size == 'lg') {
    className.push('gi-text-[32px]');
  } else if (iconProps.size == 'xl') {
    className.push('gi-text-[49px]');
  } else {
    className.push('gi-text-[24px]');
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

  if (!iconProps.noFilledClass) {
    icon.style = iconProps.filled
      ? "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;"
      : "font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;";
  }

  return icon;
};
