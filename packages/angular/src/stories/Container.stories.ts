import type { StoryObj } from '@storybook/angular';
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

const meta = {
  ...containerMeta,
  title: 'Layout/Container',
};

export default meta;

const renderWithProjectedText = (arguments_: Record<string, unknown>) => ({
  props: {
    ...arguments_,
    content:
      typeof arguments_['children'] === 'string' ? arguments_['children'] : '',
  },
  moduleMetadata: {
    imports: [Container],
  },
  template: `
    <gi-container
      [insetTop]="insetTop"
      [insetBottom]="insetBottom"
      [id]="id"
      [className]="className"
      [fullWidth]="fullWidth"
    >
      {{ content }}
    </gi-container>
  `,
});

export const Default: StoryObj = {
  ...defaultStory,
  render: (arguments_) =>
    renderWithProjectedText(arguments_ as Record<string, unknown>),
};

export const WithNoneInset: StoryObj = {
  ...withNoneInset,
  render: (arguments_) =>
    renderWithProjectedText(arguments_ as Record<string, unknown>),
};

export const WithMediumInset: StoryObj = {
  ...withMediumInset,
  render: (arguments_) =>
    renderWithProjectedText(arguments_ as Record<string, unknown>),
};

export const WithLargeInset: StoryObj = {
  ...withLargeInset,
  render: (arguments_) =>
    renderWithProjectedText(arguments_ as Record<string, unknown>),
};

export const WithExtraLargeInset: StoryObj = {
  ...withExtraLargeInset,
  render: (arguments_) =>
    renderWithProjectedText(arguments_ as Record<string, unknown>),
};

export const TestRenderIndentedHTMLContent: StoryObj = {
  ...testRenderIndentedHTMLContent,
  render: (arguments_) => ({
    props: arguments_,
    moduleMetadata: {
      imports: [Container],
    },
    template: `
      <gi-container [insetTop]="insetTop" [insetBottom]="insetBottom">
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
      <gi-container [insetTop]="insetTop" [insetBottom]="insetBottom">
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
    template: `<gi-container [insetTop]="insetTop" [insetBottom]="insetBottom"></gi-container>`,
  }),
};
