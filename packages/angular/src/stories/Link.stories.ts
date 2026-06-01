import type { StoryObj } from '@storybook/angular';
import Link from '../atoms/Link';
import Box from '../atoms/Box';
import {
  linkMeta,
  Default as linkDefault,
  ExternalLink as linkExternal,
  PrimitiveAnchor as linkPrimitive,
  InlineLink as linkInline,
} from '../atoms/storybook/Link.meta';

const meta = {
  ...linkMeta,
  title: 'Navigation/Link',
};

export default meta;

export const Default: StoryObj = {
  ...linkDefault,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Link] },
    template: `
      <gi-link
        [href]="href"
        [external]="external"
        [id]="id"
        [dataTestId]="dataTestId"
        [ariaLabel]="ariaLabel"
        [variant]="variant"
        [underline]="underline"
        [appearance]="appearance"
      >
        {{ children }}
      </gi-link>
    `,
  }),
};

export const ExternalLink: StoryObj = {
  ...linkExternal,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Link] },
    template: `
      <gi-link
        [href]="href"
        [external]="external"
        [id]="id"
        [dataTestId]="dataTestId"
      >
        {{ children }}
      </gi-link>
    `,
  }),
};

export const PrimitiveAnchor: StoryObj = {
  ...linkPrimitive,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Link] },
    template: `
      <gi-link
        [href]="href"
        [variant]="variant"
        [id]="id"
        [dataTestId]="dataTestId"
      >
        {{ children }}
      </gi-link>
    `,
  }),
};

export const InlineLink: StoryObj = {
  ...linkInline,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Link] },
    template: `
      <gi-link
        [href]="href"
        [variant]="variant"
        [id]="id"
        [dataTestId]="dataTestId"
      >
        {{ children }}
      </gi-link>
    `,
  }),
};

export const Underlines: StoryObj = {
  render: () => ({
    moduleMetadata: { imports: [Link, Box] },
    template: `
      <gi-box [className]="'gi-flex gi-flex-col gi-gap-4 gi-items-start'">
        <gi-link href="#" underline="always">Always underlined</gi-link>
        <gi-link href="#" underline="hover">Underline on hover only</gi-link>
        <gi-link href="#" underline="none">No underline</gi-link>
      </gi-box>
    `,
  }),
};

export const Appearances: StoryObj = {
  render: () => ({
    moduleMetadata: { imports: [Link, Box] },
    template: `
      <gi-box [className]="'gi-flex gi-flex-col gi-gap-4 gi-items-start'">
        <gi-box [className]="'gi-p-4'">
          <gi-link href="#">Default (inline variant)</gi-link>
        </gi-box>
        <gi-box [className]="'gi-p-4 gi-bg-black'">
          <gi-link href="#" appearance="light">Light appearance</gi-link>
        </gi-box>
        <gi-box [className]="'gi-p-4 gi-text-gray-700'">
          <gi-link href="#" appearance="inherit">Inherits parent colour</gi-link>
        </gi-box>
      </gi-box>
    `,
  }),
};

export const InteractionStates: StoryObj = {
  render: () => ({
    moduleMetadata: { imports: [Link, Box] },
    template: `
      <gi-box [className]="'gi-flex gi-flex-col gi-gap-4 gi-items-start'">
        <gi-box [className]="'gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row'">
          <gi-link href="#">default</gi-link>
          <gi-link href="#" className="pseudo-hover">hover</gi-link>
          <gi-link href="#" className="pseudo-focus">focus</gi-link>
        </gi-box>
        <gi-box [className]="'gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row gi-p-4 gi-bg-black'">
          <gi-link href="#" appearance="light">light</gi-link>
          <gi-link href="#" appearance="light" className="pseudo-hover">light hover</gi-link>
          <gi-link href="#" appearance="light" className="pseudo-focus">light focus</gi-link>
        </gi-box>
      </gi-box>
    `,
  }),
};
