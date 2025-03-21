import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { createButton } from '../helpers/buttons';
import { createIcon } from '../helpers/icons';
import { createLink } from '../helpers/links';
import { createParagraph, createTag } from '../helpers/typography';
import { IconId, IconSize } from '../icon/icon.schema';
import { beautifyHtmlNode } from '../storybook/storybook';
import { CardProps } from './types';

const meta: Meta<CardProps> = {
  title: 'Components/Card',
};

export default meta;
type Story = StoryObj<CardProps>;

const createCard = (arguments_: CardProps) => {
  const card = document.createElement('div');
  card.className = `gi-card gi-card-${arguments_.type || 'vertical'} gi-card-inset-${arguments_.inset || 'none'}`;
  card.role = 'region';
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
        const anchor = createLink({ href: arguments_.href });
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
        div.ariaHidden = 'true';
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
  if (arguments_.href) {
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
    const paragraph = createParagraph({ size: 'md' });
    paragraph.textContent = arguments_.content;
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

const createElement = (arguments_: CardProps) => {
  const component = createCard(arguments_);
  return beautifyHtmlNode(component);
};

export const Default: Story = {
  args: {
    type: 'horizontal',
    title: 'Card Title',
    subTitle: 'This is the subtitle',
    inset: 'none',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: 'https://placeholderjs.com/400x300',
        alt: 'Alt text for image',
      },
    },
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: { text: 'New', type: 'info' },
    action: {
      type: 'button',
      content: 'Action 1',
      variant: 'secondary',
    },
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const titleElement = canvas.getByText('Card Title');
    expect(titleElement).toBeTruthy();
    expect(titleElement.tagName).toBe('A');

    const contentElement = canvas.getByText(
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    );
    expect(contentElement).toBeTruthy();
    expect(contentElement.tagName).toBe('P');

    const subTitleElement = canvas.getByText('This is the subtitle');
    expect(subTitleElement.tagName).toBe('DIV');
    expect(subTitleElement.classList.contains('gi-card-subheading')).toBe(true);

    const tagElement = canvas.getByText('New');
    expect(tagElement).toBeTruthy();

    const imageElement = canvasElement.querySelector('img')!;
    expect(imageElement).toBeTruthy();
    expect(imageElement.getAttribute('src')).toBe(
      'https://placeholderjs.com/400x300',
    );
    expect(imageElement.getAttribute('alt')).toBe('Alt text for image');

    const actionLink1 = canvas.getByText('Action 1');
    expect(actionLink1).toBeTruthy();
  },
};

export const VerticalWithoutImage: Story = {
  args: {
    type: 'vertical',
    title: 'Vertical Card Without Image',
    subTitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'link',
      size: 'md',
      href: '#',
      content: 'Learn More',
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const VerticalWithLink: Story = {
  args: {
    type: 'vertical',
    title: 'Vertical Card',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: 'https://placeholderjs.com/400x300',
        alt: '400x300',
      },
    },
    subTitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: { text: 'Featured', type: 'info' },
    action: {
      type: 'link',
      size: 'md',
      href: '#',
      content: 'View More',
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const VerticalWithButton: Story = {
  args: {
    type: 'vertical',
    title: 'Vertical Card',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: 'https://placeholderjs.com/400x300',
        alt: '400x300',
      },
    },
    subTitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tag: { text: 'Featured', type: 'info' },
    action: {
      type: 'button',
      content: 'Button',
      variant: 'secondary',
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const Horizontal: Story = {
  args: {
    type: 'horizontal',
    title: 'Horizontal Card',
    subTitle: 'Subtitle Here',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: 'https://placeholderjs.com/600x360',
        alt: '600x360',
      },
    },
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'button',
      content: 'Click Me',
      variant: 'secondary',
    },
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const cardElement = canvasElement.querySelector('.gi-card-horizontal')!;
    expect(cardElement).toBeTruthy();
  },
};

export const HorizontalWithoutImage: Story = {
  args: {
    type: 'horizontal',
    title: 'Horizontal Card Without Image',
    subTitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'link',
      size: 'md',
      href: '#',
      content: 'Learn More',
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const HorizontalWithIcon: Story = {
  args: {
    type: 'horizontal',
    media: {
      type: 'icon',
      config: {
        icon: IconId.Download,
        size: IconSize.EXTRA_LARGE,
        className: 'gi-text-gray-500',
      },
    },
    title: 'Card With Icon',
    subTitle: 'Subtitle Here',
    content:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    action: {
      type: 'button',
      content: 'Download',
      variant: 'secondary',
    },
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithIframeEmbed: Story = {
  args: {
    type: 'horizontal',
    title: 'Featured Video',
    href: '#',
    media: {
      type: 'iframe',
      config: {
        src: 'https://www.youtube.com/embed/K4TOrB7at0Y',
        title: 'Sample YouTube Video',
        allowFullScreen: true,
        allow:
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      },
    },
    content:
      'This card demonstrates embedding a YouTube video using an iframe.',
    tag: {
      text: 'Video',
      type: 'info',
    },
    action: {
      type: 'button',
      content: 'Watch Later',
      variant: 'secondary',
    },
    inset: 'none',
  },
  render: (arguments_) => createElement(arguments_),
  play: async ({ canvasElement }) => {
    const iframeElement = canvasElement.querySelector('iframe')!;
    expect(iframeElement).toBeTruthy();
    expect(iframeElement.getAttribute('src')).toBe(
      'https://www.youtube.com/embed/K4TOrB7at0Y',
    );
    expect(iframeElement.getAttribute('title')).toBe('Sample YouTube Video');
  },
};

export const MediaImageWithAspectRatio: Story = {
  args: {
    type: 'vertical',
    title: 'Card Title',
    subTitle: 'Subheading',
    href: '#',
    media: {
      type: 'image',
      config: {
        src: 'https://placeholderjs.com/600x400',
        alt: '16 / 9 aspect ratio image',
        aspectRatio: '16 / 9',
      },
    },
    content: 'Card with 16 / 9 aspect ratio media',
    action: {
      type: 'button',
      content: 'Button',
      variant: 'secondary',
    },
    tag: { text: 'Featured', type: 'info' },
    inset: 'none',
  },
  render: (arguments_) => createElement(arguments_),
};
