import { CommonModule } from '@angular/common';
import type { StoryObj } from '@storybook/angular';
import Container, { MaxWidth } from '../atoms/Container';
import {
  containerMeta,
  Default as defaultStory,
  WithInset as withInset,
  GuttersOnAndOff as guttersOnAndOff,
  HandlesEmptyContentGracefully as handlesEmptyContentGracefully,
  AllMaxWidths as allMaxWidths,
} from '../atoms/storybook/Container.meta';

const meta = {
  ...containerMeta,
  title: 'Layout/Container',
};

export default meta;

const renderWithProjectedText = (props: Record<string, unknown>) => ({
  props: {
    ...props,
    content: props['children'] as string,
  },
  moduleMetadata: {
    imports: [Container],
  },
  template: `
    <gi-container
      [inset]="inset"
      [gutters]="gutters"
      [maxWidth]="maxWidth"
      [id]="id"
      [className]="className"
      [dataTestId]="dataTestId"
    >
      {{ content }}
    </gi-container>
  `,
});

export const Default: StoryObj = {
  ...defaultStory,
  render: (props) => renderWithProjectedText(props as Record<string, unknown>),
};

export const WithInset: StoryObj = {
  ...withInset,
  render: (props) => renderWithProjectedText(props as Record<string, unknown>),
};

export const GuttersOnAndOff: StoryObj = {
  ...guttersOnAndOff,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [Container, CommonModule],
    },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-8">
        <p>Try scaling the viewport to see the responsive gutters in action.</p>
        <div class="gi-flex gi-flex-col gi-gap-2">
          <span class="gi-font-bold gi-font-primary">gutters: true</span>
          <gi-container [gutters]="true" dataTestId="govie-container">
            Sample content with horizontal gutters.
          </gi-container>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2">
          <span class="gi-font-bold gi-font-primary">gutters: false</span>
          <gi-container [gutters]="false" dataTestId="govie-container">
            Sample content without horizontal gutters.
          </gi-container>
        </div>
      </div>
    `,
  }),
};

export const HandlesEmptyContentGracefully: StoryObj = {
  ...handlesEmptyContentGracefully,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [Container],
    },
    template: `
      <gi-container [inset]="inset" [gutters]="gutters" [dataTestId]="dataTestId">
        <p>
          <script>alert('XSS')</script>Safe content
        </p>
      </gi-container>
    `,
  }),
};

export const AllMaxWidths: StoryObj = {
  ...allMaxWidths,
  render: () => ({
    props: {
      maxWidths: Object.values(MaxWidth),
    },
    moduleMetadata: {
      imports: [Container, CommonModule],
    },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-8">
        <div *ngFor="let maxWidth of maxWidths" class="gi-flex gi-flex-col gi-gap-2">
          <span class="gi-font-bold gi-font-primary">{{ maxWidth }}</span>
          <gi-container
            [maxWidth]="maxWidth"
            [inset]="false"
            dataTestId="govie-container"
            className="gi-border-sm gi-border-solid gi-border-color-border-system-neutral-subtle"
          >
            Sample content for max width {{ maxWidth }}.
          </gi-container>
        </div>
      </div>
    `,
  }),
};
