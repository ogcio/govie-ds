import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { beautifyHtmlNode } from '../storybook/storybook';
import { ContainerInsetSizeEnum, ContainerProps } from './types';

const meta: Meta<ContainerProps> = {
  title: 'Layout/Container',
};

export default meta;
type Story = StoryObj<ContainerProps>;

const createContainer = (arguments_: ContainerProps) => {
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

  return beautifyHtmlNode(container);
};

export const Default: Story = {
  args: {
    content: `<p>This is a paragraph.</p>`,
  },
  render: (arguments_) => createContainer(arguments_),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraph = canvas.getByText('This is a paragraph.');
    expect(paragraph.parentElement).toHaveClass('gi-layout-container');
  },
};

export const WithNoneInset: Story = {
  args: {
    content: 'Paragraph',
    insetBottom: ContainerInsetSizeEnum.None,
    insetTop: ContainerInsetSizeEnum.None,
  },
  render: (arguments_) => createContainer(arguments_),
};

export const WithMediumInset: Story = {
  args: {
    content: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.Medium,
    insetBottom: ContainerInsetSizeEnum.Medium,
  },
  render: (arguments_) => createContainer(arguments_),
};

export const WithLargeInset: Story = {
  args: {
    content: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.Large,
    insetBottom: ContainerInsetSizeEnum.Large,
  },
  render: (arguments_) => createContainer(arguments_),
};

export const WithExtraLargeInset: Story = {
  args: {
    content: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.ExtraLarge,
    insetBottom: ContainerInsetSizeEnum.ExtraLarge,
  },
  render: (arguments_) => createContainer(arguments_),
};
