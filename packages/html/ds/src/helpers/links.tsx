import { ButtonProps } from '../button/button.schema';
import { LinkProps } from '../link/link.schema';
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
    if (arguments_.noUnderline) {
      linkClass.push('gi-link-inherit');
    }
    if (arguments_.noUnderline) {
      linkClass.push('gi-link-no-underline');
    }
    if (arguments_.noVisited) {
      linkClass.push('gi-link-no-visited');
    }
  }

  anchor.textContent = arguments_.label;
  anchor.href = arguments_.href || '#';
  anchor.className = linkClass.join(' ');

  return anchor;
};
