import { PhaseBannerProps } from '../phase-banner/types';
import { createContainer } from './container';
import { createTag } from './typography';

export const createPhaseBanner = (arguments_: PhaseBannerProps) => {
  const { level, content, wrap = 'none', padding = true } = arguments_;

  const banner = document.createElement('div');
  banner.dataset.testid = 'phase-banner';
  banner.className = 'gi-phase-banner-container';

  if (padding) {
    banner.classList.add('gi-px-4');
  }

  const tag = createTag({
    type: 'info',
    text: level,
  });
  banner.append(tag);

  if (content) {
    const contentDiv = document.createElement('div');
    contentDiv.append(content);
    banner.append(contentDiv);
  }

  if (wrap === 'container') {
    return createContainer({ content: banner.outerHTML });
  }
  if (wrap === 'container-full-width') {
    return createContainer({ content: banner.outerHTML, fullWidth: true });
  }

  return banner;
};
