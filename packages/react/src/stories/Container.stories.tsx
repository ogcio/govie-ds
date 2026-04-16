import type { Meta, StoryObj } from '@storybook/react-vite';
import Container from '../atoms/Container';
import {
  containerMeta,
  Default as defaultStory,
  WithNoneInset as withNoneInset,
  WithMediumInset as withMediumInset,
  WithLargeInset as withLargeInset,
  WithExtraLargeInset as withExtraLargeInset,
  TestRenderIndentedHTMLContent as testRenderIndentedHTMLContent,
  TestSafelyRenderHTMLContent as testSafelyRenderHTMLContent,
  TestHandleEmptyContentGracefully as testHandleEmptyContentGracefully,
} from '../atoms/storybook/Container.meta';

const meta: Meta<typeof Container> = {
  ...containerMeta,
  title: 'Layout/Container',
  component: Container,
};

export default meta;

type Story = StoryObj<typeof Container>;

export const Default: Story = { ...defaultStory };

export const WithNoneInset: Story = { ...withNoneInset };

export const WithMediumInset: Story = { ...withMediumInset };

export const WithLargeInset: Story = { ...withLargeInset };

export const WithExtraLargeInset: Story = { ...withExtraLargeInset };

export const TestRenderIndentedHTMLContent: Story = {
  ...testRenderIndentedHTMLContent,
};

export const TestSafelyRenderHTMLContent: Story = {
  ...testSafelyRenderHTMLContent,
};

export const TestHandleEmptyContentGracefully: Story = {
  ...testHandleEmptyContentGracefully,
};
