import { CardProps } from '../card/types';
import { createButton } from './buttons';
import { createIcon } from './icons';
import { createLink } from './links';
import { createParagraph, createTag } from './typography';

export const createCard = (arguments_: CardProps) => {
  const type = arguments_.type ?? 'vertical';
  const inset = arguments_.inset ?? 'none';
  const background = arguments_.background ?? 'white';
  const href = arguments_.href ?? '';
  const wrapText = !!arguments_.wrapText;

  const isMobile = globalThis
    ? (globalThis.matchMedia?.('(max-width: 640px)').matches ?? false)
    : false;
  const orientation = isMobile ? 'vertical' : type;

  const card = document.createElement('div');
  card.className = [
    'gi-card',
    'gi-not-prose',
    orientation === 'vertical' ? 'gi-card-vertical' : 'gi-card-horizontal',
    background === 'grey'
      ? 'gi-bg-color-surface-system-neutral-layer1'
      : 'gi-bg-white',
    inset === 'full' ? 'gi-p-4' : '',
  ]
    .filter(Boolean)
    .join(' ');
  card.setAttribute('role', 'article');
  card.setAttribute('aria-labelledby', 'card-title');
  card.setAttribute('aria-describedby', 'card-subtitle card-desc');

  if (arguments_.dataTestid) {
    card.dataset.testid = arguments_.dataTestid;
  }

  if (arguments_.media) {
    let mediaElement: HTMLElement | undefined;

    switch (arguments_.media.type) {
      case 'image': {
        const { src, alt, aspectRatio, ariaLabel, label } =
          arguments_.media.config;
        const div = document.createElement('div');
        div.className = 'gi-card-image';

        const anchor = createLink({ href, className: '!gi-block' });
        const image = document.createElement('img');
        image.src = src;
        image.alt = alt ?? '';

        if (aspectRatio) {
          image.style.aspectRatio = aspectRatio;
          image.className = 'gi-w-full';
        }

        const raw =
          ariaLabel ??
          label ??
          alt ??
          (typeof arguments_.title === 'string' ? arguments_.title : undefined);
        const safe = String(raw ?? '').trim() || 'Open image';
        anchor.setAttribute('aria-label', safe);
        anchor.title = safe;

        anchor.append(image);
        div.append(anchor);
        mediaElement = div;
        break;
      }

      case 'icon': {
        const div = document.createElement('div');
        div.className = 'gi-card-icon';

        const anchor = createLink({ href, noUnderline: true });
        const icon = createIcon({ ...arguments_.media.config });
        icon.setAttribute('aria-hidden', 'true'); // decorative glyph

        const {
          ariaLabel,
          label,
          title: iconTitle,
        } = (arguments_.media as any).config || {};
        const raw =
          ariaLabel ??
          label ??
          iconTitle ??
          (typeof arguments_.title === 'string' ? arguments_.title : undefined);
        const safe = String(raw ?? '').trim() || 'Open media';

        anchor.setAttribute('aria-label', safe);
        anchor.title = safe;

        anchor.append(icon);
        div.append(anchor);
        mediaElement = div;
        break;
      }

      case 'iframe': {
        const div = document.createElement('div');
        div.className = 'gi-card-iframe';

        const {
          src,
          allow,
          allowFullScreen,
          title: frameTitle,
        } = arguments_.media.config;
        const iframe = document.createElement('iframe');
        iframe.src = src;
        if (allow) {
          iframe.allow = allow;
        }
        if (allowFullScreen) {
          iframe.allowFullscreen = allowFullScreen;
        }

        const safe = String(frameTitle ?? '').trim() || 'Embedded content';
        iframe.title = safe;

        div.append(iframe);
        mediaElement = div;
        break;
      }

      default: {
        break;
      }
    }

    if (mediaElement) {
      card.append(mediaElement);
    }
  }

  const content = document.createElement('div');
  content.className = [
    'gi-card-content',
    inset === 'body' && orientation === 'horizontal' ? 'gi-py-4 gi-pr-4' : '',
    inset === 'body' && orientation === 'vertical' ? 'gi-px-4 gi-pb-4' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const header = document.createElement('div');
  header.className = 'gi-card-header';
  header.setAttribute('role', 'group');
  content.append(header);

  const heading = document.createElement('div');
  heading.className = 'gi-card-heading';
  header.append(heading);

  const title = document.createElement('div');
  title.className = 'gi-card-title';
  title.id = 'card-title';
  title.setAttribute('role', 'heading');
  title.setAttribute('aria-level', '2');

  if (typeof arguments_.title === 'string') {
    title.title = arguments_.title;
  }

  if (arguments_.title) {
    if (href) {
      const titleLink = createLink({ href });
      titleLink.textContent = String(arguments_.title);
      if (wrapText) {
        titleLink.classList.add('gi-card-wrap-text');
      }
      title.append(titleLink);
    } else {
      title.textContent = String(arguments_.title);
      if (wrapText) {
        title.classList.add('gi-card-wrap-text');
      }
    }
  } else if (wrapText) {
    title.classList.add('gi-card-wrap-text');
  }
  heading.append(title);

  if (arguments_.subtitle) {
    const subtitle = document.createElement('div');
    subtitle.className = 'gi-card-subheading';
    subtitle.id = 'card-subtitle';
    subtitle.dataset.testid = 'card-subtitle';
    if (typeof arguments_.subtitle === 'string') {
      subtitle.title = arguments_.subtitle;
    }
    subtitle.textContent = String(arguments_.subtitle);
    heading.append(subtitle);
  }

  if (arguments_.tag) {
    const tagContainer = document.createElement('div');
    tagContainer.className = 'gi-card-tag';
    tagContainer.setAttribute('role', 'note');
    if (typeof arguments_.tag.text === 'string') {
      tagContainer.setAttribute('aria-label', arguments_.tag.text);
    }
    const tag = createTag({ ...arguments_.tag });
    tagContainer.append(tag);
    header.append(tagContainer);
  }

  if (arguments_.content) {
    const paragraphContainer = document.createElement('div');
    paragraphContainer.className = 'gi-card-paragraph gi-w-full';
    paragraphContainer.id = 'card-desc';
    paragraphContainer.dataset.testid = 'card-desc';

    const paragraph = createParagraph({
      content: arguments_.content,
      size: 'sm',
    });
    paragraphContainer.append(paragraph);
    content.append(paragraphContainer);
  }

  if (arguments_.action) {
    const actionContainer = document.createElement('div');
    actionContainer.className = 'gi-card-action';
    actionContainer.setAttribute('role', 'group');

    let actionElement: HTMLElement;
    if (arguments_.action.type === 'link') {
      actionElement = createLink({ ...arguments_.action });
      if (arguments_.action.content) {
        actionElement.textContent = arguments_.action.content;
      }
    } else {
      actionElement = createButton({ ...arguments_.action });
      if (arguments_.action.content) {
        actionElement.textContent = arguments_.action.content;
      }
    }

    actionContainer.append(actionElement);
    content.append(actionContainer);
  }

  card.append(content);
  return card;
};
