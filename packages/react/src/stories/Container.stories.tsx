import type { Meta, StoryObj } from '@storybook/react-vite';
import Container from '../atoms/Container';
import { MaxWidth } from '../atoms/utilities';
import {
  containerMeta,
  Default as defaultStory,
  WithInset as withInset,
  GuttersOnAndOff as guttersOnAndOff,
  TestRenderIndentedHTMLContent as testRenderIndentedHTMLContent,
  TestSafelyRenderHTMLContent as testSafelyRenderHTMLContent,
  TestHandleEmptyContentGracefully as testHandleEmptyContentGracefully,
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

export const WithInset: Story = { ...withInset };

export const GuttersOnAndOff: Story = {
  ...guttersOnAndOff,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-8">
      <div className="gi-flex gi-flex-col gi-gap-2">
        <span className="gi-font-bold gi-font-primary">gutters: true</span>
        <Container gutters dataTestId="govie-container">
          Sample content with horizontal gutters.
        </Container>
      </div>
      <div className="gi-flex gi-flex-col gi-gap-2">
        <span className="gi-font-bold gi-font-primary">gutters: false</span>
        <Container gutters={false} dataTestId="govie-container">
          Sample content without horizontal gutters.
        </Container>
      </div>
    </div>
  ),
};

export const TestRenderIndentedHTMLContent: Story = {
  ...testRenderIndentedHTMLContent,
};

export const TestSafelyRenderHTMLContent: Story = {
  ...testSafelyRenderHTMLContent,
};

export const TestHandleEmptyContentGracefully: Story = {
  ...testHandleEmptyContentGracefully,
};

export const AllMaxWidths: Story = {
  ...allMaxWidths,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-8">
      {Object.values(MaxWidth).map((maxWidth) => (
        <div key={maxWidth} className="gi-flex gi-flex-col gi-gap-2">
          <span className="gi-font-bold gi-font-primary">{maxWidth}</span>
          <Container
            maxWidth={maxWidth}
            inset={false}
            dataTestId="govie-container"
            className="gi-border-sm gi-border-solid gi-border-color-border-system-neutral-subtle"
          >
            Sample content for max width {maxWidth}.
          </Container>
        </div>
      ))}
    </div>
  ),
};
