import { ParagraphProps } from '../paragraph/types';
import { TagProps } from '../tag/types';

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
  component.className =
    `${classSize} ${alignClass} ${whitespaceClass} gi-max-w-prose`.trim();
  if (arguments_.content) {
    component.textContent = arguments_.content;
  }
  component.dataset.testid = arguments_.dataTestid;

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
