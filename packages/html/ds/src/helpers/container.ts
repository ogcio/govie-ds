import { ContainerProps } from '../container/types';

export const createContainer = (arguments_: ContainerProps) => {
  const {
    content,
    fullWidth,
    insetTop,
    insetBottom,
    id,
    className = '',
  } = arguments_;

  const hasInset = Boolean(insetTop || insetBottom);

  let containerClass = '';
  if (hasInset) {
    containerClass = 'gi-layout-container-inset';
  } else if (fullWidth) {
    containerClass = 'gi-layout-container-full-width';
  } else {
    containerClass = 'gi-layout-container';
  }

  const container = document.createElement('div');
  container.className = `${containerClass}${className ? ` ${className}` : ''}`;
  container.dataset.testid = 'govie-container';

  if (id) {
    container.id = id;
  }
  if (insetTop) {
    container.dataset.insetTop = insetTop;
  }
  if (insetBottom) {
    container.dataset.insetBottom = insetBottom;
  }
  if (content) {
    container.innerHTML = content;
  }

  return container;
};
