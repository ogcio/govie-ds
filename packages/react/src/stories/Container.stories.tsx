import type { Meta, StoryObj } from '@storybook/react-vite';
import Container, { MaxWidth } from '../atoms/Container';
import type {
  Container as LegacyContainer} from '../container/container.js';
import {
  ContainerInsetSizeEnum,
} from '../container/container.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { map } from 'lodash';
import {
  containerMeta,
  Default as defaultStory,
  WithInset as withInset,
  GuttersOnAndOff as guttersOnAndOff,
  RendersIndentedHTMLContent as rendersIndentedHTMLContent,
  HandlesEmptyContentGracefully as handlesEmptyContentGracefully,
  AllMaxWidths as allMaxWidths,
} from '../atoms/storybook/Container.meta';

const meta: Meta<typeof Container> = {
  ...containerMeta,
  title: 'Layout/Container',
  component: Container,
};

export default meta;

type Story = StoryObj<typeof Container>;
type LegacyContainerStory = StoryObj<typeof LegacyContainer>;

export const Default: Story = { ...defaultStory };

export const WithInset: Story = { ...withInset };

export const GuttersOnAndOff: Story = {
  ...guttersOnAndOff,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-8">
      <p>Try scaling the viewport to see the responsive gutters in action.</p>
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

export const RendersIndentedHTMLContent: Story = {
  ...rendersIndentedHTMLContent,
  tags: ['skip-playwright'],
};

export const HandlesEmptyContentGracefully: Story = {
  ...handlesEmptyContentGracefully,
  tags: ['skip-playwright'],
};

export const AllMaxWidths: Story = {
  ...allMaxWidths,
  render: () => (
    <div className="gi-flex gi-flex-col gi-gap-8">
      {map(MaxWidth, (maxWidth) => (
        <div key={maxWidth} className="gi-flex gi-flex-col gi-gap-2">
          <span className="gi-font-bold gi-font-primary">{maxWidth}</span>
          <Container
            maxWidth={maxWidth}
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
