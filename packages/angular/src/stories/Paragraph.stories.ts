import type { StoryObj } from '@storybook/angular';
import Paragraph from '../atoms/Paragraph';
import {
  paragraphMeta,
  Default as defaultStory,
  AllParagraphSizes as allSizes,
  AllWhitespaces as allWhitespaces,
  AllAlignments as allAlignments,
} from '../atoms/storybook/Paragraph.meta';

const meta = {
  ...paragraphMeta,
  argTypes: {
    ...paragraphMeta.argTypes,
  },
  title: 'Typography/Paragraph',
};

export default meta;

export const Default: StoryObj = {
  ...defaultStory,
  args: {
    ...defaultStory.args,
  },
  render: (args) => ({
    props: { ...args, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    moduleMetadata: {
      imports: [Paragraph],
    },
    template: `
      <gi-paragraph [id]="id" [dataTestId]="dataTestId" [size]="size" [align]="align" [whitespace]="whitespace">{{content}}</gi-paragraph>
    `,
  }),
};

export const AllParagraphSizes: StoryObj = {
  ...allSizes,
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [Paragraph],
    },
    template: `
    <gi-paragraph [dataTestId]="'paragraph-sm'" size="sm">Paragraph sm</gi-paragraph>
    <gi-paragraph [dataTestId]="'paragraph-md'" size="md">Paragraph md</gi-paragraph>
    <gi-paragraph [dataTestId]="'paragraph-lg'" size="lg">Paragraph lg</gi-paragraph>
    <gi-paragraph [dataTestId]="'paragraph-xl'" size="xl">Paragraph xl</gi-paragraph>
    `,
  }),
};

export const AllWhitespaces: StoryObj = {
  ...allWhitespaces,
  args: { content: paragraphMeta.loremIpsum },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [Paragraph],
    },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-6">
        <div class="gi-flex gi-flex-col gi-gap-2">
          <span class="gi-font-bold gi-font-primary">normal</span>
          <gi-paragraph whitespace="normal" [dataTestId]="'paragraph-ws-normal'">{{content}}</gi-paragraph>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2">
          <span class="gi-font-bold gi-font-primary">pre</span>
          <gi-paragraph whitespace="pre" [dataTestId]="'paragraph-ws-pre'">{{content}}</gi-paragraph>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2">
          <span class="gi-font-bold gi-font-primary">pre-wrap</span>
          <gi-paragraph whitespace="pre-wrap" [dataTestId]="'paragraph-ws-pre-wrap'">{{content}}</gi-paragraph>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2">
          <span class="gi-font-bold gi-font-primary">break-spaces</span>
          <gi-paragraph whitespace="break-spaces" [dataTestId]="'paragraph-ws-break-spaces'">{{content}}</gi-paragraph>
        </div>
      </div>
    `,
  }),
};

export const AllAlignments: StoryObj = {
  ...allAlignments,
  args: { content: paragraphMeta.loremIpsum },
  render: (args) => ({
    props: args,
    moduleMetadata: {
      imports: [Paragraph],
    },
    template: `
      <div class="gi-flex gi-flex-col gi-gap-6">
        <div class="gi-flex gi-flex-col gi-gap-2">
          <span class="gi-font-bold gi-font-primary">start</span>
          <gi-paragraph align="start" [dataTestId]="'paragraph-align-start'">{{content}}</gi-paragraph>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2">
          <span class="gi-font-bold gi-font-primary">center</span>
          <gi-paragraph align="center" [dataTestId]="'paragraph-align-center'">{{content}}</gi-paragraph>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2">
          <span class="gi-font-bold gi-font-primary">end</span>
          <gi-paragraph align="end" [dataTestId]="'paragraph-align-end'">{{content}}</gi-paragraph>
        </div>
        <div class="gi-flex gi-flex-col gi-gap-2">
          <span class="gi-font-bold gi-font-primary">justify</span>
          <gi-paragraph align="justify" [dataTestId]="'paragraph-align-justify'">{{content}}</gi-paragraph>
        </div>
      </div>
    `,
  }),
};
