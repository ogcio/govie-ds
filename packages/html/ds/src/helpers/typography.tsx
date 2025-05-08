import { HeadingProps } from '../heading/types';
import { ParagraphProps } from '../paragraph/types';
import { TagProps } from '../tag/types';

export const createHeading = (arguments_: HeadingProps) => {
  let classSize = '';
  if (arguments_.size === undefined) {
    switch (arguments_.as) {
      case 'h6': {
        classSize = 'gi-heading-2xs';
        break;
      }
      case 'h5': {
        classSize = 'gi-heading-xs';
        break;
      }
      case 'h4': {
        classSize = 'gi-heading-sm';
        break;
      }
      case 'h3': {
        classSize = 'gi-heading-md';
        break;
      }
      case 'h2': {
        classSize = 'gi-heading-lg';
        break;
      }
      default: {
        classSize = 'gi-heading-xl';
        break;
      }
    }
  } else {
    switch (arguments_.size) {
      case '2xs': {
        classSize = 'gi-heading-2xs';
        break;
      }
      case 'xs': {
        classSize = 'gi-heading-xs';
        break;
      }
      case 'sm': {
        classSize = 'gi-heading-sm';
        break;
      }
      case 'md': {
        classSize = 'gi-heading-md';
        break;
      }
      case 'lg': {
        classSize = 'gi-heading-lg';
        break;
      }
      case 'xl': {
        classSize = 'gi-heading-xl';
        break;
      }
    }
  }

  const component = document.createElement(arguments_.as ?? 'h1');
  component.className = classSize;
  if (arguments_.content) {
    component.textContent = arguments_.content;
  }

  if (arguments_.caption) {
    const caption = document.createElement('span');
    caption.className = 'gi-text-gray-600';
    caption.textContent = arguments_.caption;

    const container = document.createElement('div');
    container.append(caption);
    container.append(component);
    return container;
  } else {
    return component;
  }
};

export const createParagraph = (arguments_: ParagraphProps) => {
  let classSize = '';
  if (arguments_.size == 'lg') {
    classSize = arguments_.as == 'span' ? 'gi-span-lg' : 'gi-paragraph-lg';
  } else if (arguments_.size == 'sm') {
    classSize = arguments_.as == 'span' ? 'gi-span-sm' : 'gi-paragraph-sm';
  } else {
    classSize = arguments_.as == 'span' ? 'gi-span-md' : 'gi-paragraph-md';
  }

  let alignClass = '';
  if (arguments_.align == 'end') {
    alignClass = 'gi-text-end';
  } else if (arguments_.align == 'center') {
    alignClass = 'gi-text-center';
  } else if (arguments_.align == 'justify') {
    alignClass = 'gi-text-justify';
  } else {
    alignClass = 'gi-text-start';
  }

  let whitespaceClass = '';
  if (arguments_.whitespace == 'pre') {
    whitespaceClass = 'gi-whitespace-pre';
  } else if (arguments_.whitespace == 'pre-wrap') {
    whitespaceClass = 'gi-whitespace-pre-wrap';
  } else if (arguments_.whitespace == 'break-spaces') {
    whitespaceClass = 'gi-whitespace-break-spaces';
  } else {
    whitespaceClass = 'gi-whitespace-normal';
  }

  const component = document.createElement(arguments_.as ?? 'p');
  component.className = `${classSize} ${alignClass} ${whitespaceClass}`.trim();
  if (arguments_.content) {
    component.innerHTML = arguments_.content;
  }
  if (arguments_.dataTestid) {
    component.dataset.testid = arguments_.dataTestid;
  }

  return component;
};

export const createTag = (arguments_: TagProps) => {
  const tagClasses = {
    default: 'gi-tag-default',
    info: 'gi-tag-info',
    success: 'gi-tag-success',
    warning: 'gi-tag-warning',
    error: 'gi-tag-error',
    counter: 'gi-tag-counter',
    counterWarning: 'gi-tag-counter-warning',
  };
  const tag = document.createElement('strong');
  tag.className = `gi-tag ${tagClasses[arguments_.type || 'info']}`;
  tag.textContent = arguments_.text;
  return tag;
};
