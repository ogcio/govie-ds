import { CommonModule } from '@angular/common';
import type { StoryObj } from '@storybook/angular';
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

const meta = {
  ...containerMeta,
  title: 'Layout/Container',
};

export default meta;

const renderWithProjectedText = (arguments_: Record<string, unknown>) => ({
  props: {
    ...arguments_,
    content: typeof arguments_['children'] === 'string' ? arguments_['children'] : '',
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
  render: (arguments_) => renderWithProjectedText(arguments_ as Record<string, unknown>),
};

export const WithInset: StoryObj = {
  ...withInset,
  render: (arguments_) => renderWithProjectedText(arguments_ as Record<string, unknown>),
};

export const GuttersOnAndOff: StoryObj = {
  ...guttersOnAndOff,
  render: () => ({
    moduleMetadata: {
      imports: [Container, CommonModule],
    },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-8">
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

export const TestRenderIndentedHTMLContent: StoryObj = {
  ...testRenderIndentedHTMLContent,
  render: (arguments_) => ({
    props: arguments_,
    moduleMetadata: {
      imports: [Container],
    },
    template: `
      <gi-container [inset]="inset" [gutters]="gutters" [dataTestId]="dataTestId">
        <p>Indented content</p>
      </gi-container>
    `,
  }),
};

export const TestSafelyRenderHTMLContent: StoryObj = {
  ...testSafelyRenderHTMLContent,
  render: (arguments_) => ({
    props: arguments_,
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

export const TestHandleEmptyContentGracefully: StoryObj = {
  ...testHandleEmptyContentGracefully,
  render: (arguments_) => ({
    props: arguments_,
    moduleMetadata: {
      imports: [Container],
    },
    template: `<gi-container [inset]="inset" [gutters]="gutters" [dataTestId]="dataTestId"></gi-container>`,
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
