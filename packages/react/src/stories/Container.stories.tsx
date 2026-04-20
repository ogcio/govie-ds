import type { Meta, StoryObj } from '@storybook/react-vite';
import Container, {
  ContainerInsetSizeEnum,
  ContainerMaxWidthEnum,
  ContainerGutterSizeEnum,
} from '../atoms/Container';
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
  AllGutterSizes as allGutterSizes,
  AllMaxWidths as allMaxWidths,
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

export const AllGutterSizes: Story = {
  ...allGutterSizes,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-8">
      {Object.values(ContainerGutterSizeEnum).map((gutter) => (
        <div key={gutter} className="gi-flex gi-flex-col gi-gap-2">
          <span className="gi-font-bold gi-font-primary">{gutter}</span>
          <Container gutterSize={gutter}>
            Sample content for gutter {gutter}.
          </Container>
        </div>
      ))}
    </div>
  ),
};

export const AllMaxWidths: Story = {
  ...allMaxWidths,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-8">
      {Object.values(ContainerMaxWidthEnum).map((maxWidth) => (
        <div key={maxWidth} className="gi-flex gi-flex-col gi-gap-2">
          <span className="gi-font-bold gi-font-primary">{maxWidth}</span>
          <Container
            maxWidth={maxWidth}
            insetTop={ContainerInsetSizeEnum.None}
            insetBottom={ContainerInsetSizeEnum.None}
            className="gi-border-sm gi-border-solid gi-border-color-border-system-neutral-subtle"
          >
            Sample content for max width {maxWidth}.
          </Container>
        </div>
      ))}
    </div>
  ),
};
