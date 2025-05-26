import { CardProps } from '../card/types';
import { createButton } from './buttons';
import { createIcon } from './icons';
import { createLink } from './links';
import { createParagraph, createTag } from './typography';

export const createCard = (arguments_: CardProps) => {
  const isTitleOnly =
    !arguments_.title || (!arguments_.href && !arguments_.titleAsChild);

  const card = document.createElement('div');
  card.className = `gi-card gi-card-${arguments_.type || 'vertical'} gi-card-inset-${arguments_.inset || 'none'}`;

  if (arguments_.dataTestid) {
    card.dataset.testid = arguments_.dataTestid;
  }

  let mediaElement: HTMLElement | undefined;
  if (arguments_.media) {
    switch (arguments_.media.type) {
      case 'image': {
        const { src, alt, aspectRatio } = arguments_.media.config;
        const div = document.createElement('div');
        div.className = 'gi-card-image';
        const anchor = createLink({
          href: arguments_.href || '#',
          className: '!gi-block',
        });
        const image = document.createElement('img');
        image.src = src;
        if (alt) {
          image.alt = alt;
        }
        if (aspectRatio) {
          image.style.aspectRatio = aspectRatio;
          image.className = 'gi-w-full';
        }
        anchor.append(image);
        div.append(anchor);
        mediaElement = div;
        break;
      }
      case 'icon': {
        const div = document.createElement('div');
        div.className = 'gi-card-icon';

        const anchor = createLink({ href: arguments_.href });
        const icon = createIcon({ ...arguments_.media.config });
        anchor.append(icon);
        div.append(anchor);
        mediaElement = div;
        break;
      }
      case 'iframe': {
        const div = document.createElement('div');
        div.className = 'gi-card-iframe';
        const iframe = document.createElement('iframe');
        iframe.src = arguments_.media.config.src;
        if (arguments_.media.config.allow) {
          iframe.allow = arguments_.media.config.allow;
        }
        if (arguments_.media.config.allowFullScreen) {
          iframe.allowFullscreen = arguments_.media.config.allowFullScreen;
        }
        if (arguments_.media.config.title) {
          iframe.title = arguments_.media.config.title;
        }
        div.append(iframe);
        mediaElement = div;
        break;
      }
    }
  }

  if (mediaElement) {
    card.append(mediaElement);
  }

  const content = document.createElement('div');
  content.className = `gi-card-content gi-card-inset-${arguments_.inset || 'none'}`;

  const header = document.createElement('div');
  header.className = 'gi-card-header';
  content.append(header);

  const heading = document.createElement('div');
  heading.className = 'gi-card-heading';
  header.append(heading);

  const title = document.createElement('div');
  title.className = 'gi-card-title';
  if (arguments_.href && !isTitleOnly) {
    const titleLink = createLink({ href: arguments_.href });
    titleLink.textContent = arguments_.title;
    title.append(titleLink);
  } else {
    title.textContent = arguments_.title;
  }
  heading.append(title);

  if (arguments_.subTitle) {
    const subTitle = document.createElement('div');
    subTitle.className = 'gi-card-subheading';
    subTitle.textContent = arguments_.subTitle;
    heading.append(subTitle);
  }

  if (arguments_.tag) {
    const tagContainer = document.createElement('div');
    tagContainer.className = 'gi-card-tag';
    const tag = createTag({ ...arguments_.tag });
    tagContainer.append(tag);
    header.append(tagContainer);
  }

  if (arguments_.content) {
    const paragraphContainer = document.createElement('div');
    paragraphContainer.className = 'gi-card-paragraph';
    const paragraph = createParagraph({
      content: arguments_.content,
      size: 'md',
    });
    paragraphContainer.append(paragraph);
    content.append(paragraphContainer);
  }

  if (arguments_.action) {
    const actionContainer = document.createElement('div');
    actionContainer.className = 'gi-card-action';

    let action;
    if (arguments_.action.type === 'link') {
      action = createLink({ ...arguments_.action });
      if (arguments_.action.content) {
        action.textContent = arguments_.action.content;
      }
    } else {
      action = createButton({ ...arguments_.action });
      if (arguments_.action.content) {
        action.textContent = arguments_.action.content;
      }
    }

    actionContainer.append(action);
    content.append(actionContainer);
  }
  card.append(content);
  return card;
};
