import { ButtonProps } from '../button/types';
import { LinkProps } from '../link/types';
import { getButtonAppearanceClass, getButtonSizeClass } from './buttons';
import { createIcon } from './icons';

export const getLinkSizeClass = (size?: string) => {
  let classSize = '';
  switch (size) {
    case 'sm': {
      classSize = 'gi-link-sm';
      break;
    }
    default: {
      classSize = 'gi-link-md';
      break;
    }
  }
  return classSize;
};

export const createLink = (arguments_: LinkProps) => {
  const anchor = document.createElement('a') as HTMLAnchorElement;

  if (arguments_.external) {
    anchor.target = '_blank';
    anchor.rel = 'noreferrer noopener';
  }

  const linkClass = [];
  if (arguments_.asButton) {
    linkClass.push(
      'gi-btn',
      getButtonAppearanceClass(arguments_.asButton as ButtonProps),
      getButtonSizeClass(arguments_.size),
      '!gi-inline-flex',
    );
  } else {
    linkClass.push('gi-link', `${getLinkSizeClass(arguments_.size)}`);
    if (arguments_.noColor) {
      linkClass.push('gi-link-inherit');
    }
    if (arguments_.noUnderline) {
      linkClass.push('gi-link-no-underline');
    }
    if (arguments_.noVisited) {
      linkClass.push('gi-link-no-visited');
    }
    if (
      arguments_.appearance === 'light' &&
      !arguments_.asButton &&
      !arguments_.noColor &&
      !arguments_.noVisited &&
      !arguments_.disabled
    ) {
      linkClass.push('gi-link-light');
    }
    if (arguments_.disabled && !arguments_.asButton) {
      linkClass.push('gi-link-disabled');
    }
  }
  if (arguments_.size === 'sm') {
    linkClass.push('gi-text-sm');
  }
  if (arguments_.size === 'md') {
    linkClass.push('gi-text-md');
  }
  if (arguments_.size === 'lg') {
    linkClass.push('gi-text-lg');
  }
  if (arguments_.className) {
    linkClass.push(arguments_.className);
  }
  anchor.href = arguments_.href || '#';
  anchor.className = linkClass.join(' ');

  anchor.dataset['testid'] = arguments_.dataTestid || 'link';
  anchor.dataset['appearance'] = arguments_.appearance || '';

  anchor.href = arguments_.disabled
    ? 'javascript:void(0)'
    : arguments_.href || '#';

  const iconSize = 'sm';
  const hasIconStart = arguments_.iconStart && !arguments_.asButton;
  const hasIconEnd = arguments_.iconEnd && !arguments_.asButton;

  if (hasIconStart) {
    const start = document.createElement('span');
    start.className = 'gi-link-icon gi-link-icon-start';
    start.dataset.size = arguments_?.size || 'sm';
    start.append(createIcon({ icon: arguments_.iconStart, size: iconSize }));
    anchor.append(start);
  }

  if (hasIconStart || hasIconEnd) {
    const contentSpan = document.createElement('span');
    contentSpan.className = 'gi-pr-5 gi-pl-5';
    contentSpan.textContent = arguments_.content || '';
    anchor.append(contentSpan);
  } else {
    anchor.textContent = arguments_.content || '';
  }

  if (hasIconEnd) {
    const end = document.createElement('span');
    end.className = 'gi-link-icon gi-link-icon-end';
    end.dataset.size = arguments_?.size || 'sm';
    end.append(createIcon({ icon: arguments_.iconEnd, size: iconSize }));
    anchor.append(end);
  }

  return anchor;
};
