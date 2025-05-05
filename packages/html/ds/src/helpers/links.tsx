import { ButtonProps } from '../button/types';
import { LinkProps } from '../link/types';
import { getButtonAppearanceClass, getButtonSizeClass } from './buttons';

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
  const anchor = document.createElement(
    arguments_.as || 'a',
  ) as HTMLAnchorElement;

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
  }

  if (arguments_.className) {
    linkClass.push(arguments_.className);
  }

  if (arguments_.content) {
    anchor.textContent = arguments_.content;
  }
  anchor.href = arguments_.href || '#';
  anchor.className = linkClass.join(' ');

  return anchor;
};
