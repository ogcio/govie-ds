import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { expect, within } from 'storybook/test';
import { createContainer } from '../helpers/container';
import { ContainerInsetSizeEnum, ContainerProps } from './types';

const meta: Meta<ContainerProps> = {
  title: 'Layout/Container',
};

export default meta;
type Story = StoryObj<ContainerProps>;

const createElement = (arguments_: ContainerProps) => {
  const component = createContainer(arguments_);

  return parse(component.outerHTML) as React.ReactElement;
};

export const Default: Story = {
  args: {
    content: `<p>This is a paragraph.</p>`,
  },
  render: (arguments_) => createElement(arguments_),
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
  render: (arguments_) => createElement(arguments_),
};

export const WithMediumInset: Story = {
  args: {
    content: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.Medium,
    insetBottom: ContainerInsetSizeEnum.Medium,
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithLargeInset: Story = {
  args: {
    content: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.Large,
    insetBottom: ContainerInsetSizeEnum.Large,
  },
  render: (arguments_) => createElement(arguments_),
};

export const WithExtraLargeInset: Story = {
  args: {
    content: 'Paragraph',
    insetTop: ContainerInsetSizeEnum.ExtraLarge,
    insetBottom: ContainerInsetSizeEnum.ExtraLarge,
  },
  render: (arguments_) => createElement(arguments_),
};
