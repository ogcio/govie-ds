import type { StoryObj } from '@storybook/angular';
import Box from '../atoms/Box';
import Link from '../atoms/Link';
import {
  linkMeta,
  Default as linkDefault,
  ExternalLink as linkExternalLink,
  NoUnderline as linkNoUnderline,
  NoVisited as linkNoVisited,
  InheritColour as linkInheritColour,
  Sizes as linkSizes,
  InteractionStates as linkInteractionStates,
} from '../atoms/storybook/Link.meta';

const meta = {
  ...linkMeta,
  title: 'Components/Link',
};

export default meta;

const linkTemplate = `
  <gi-link
    [href]="href"
    [id]="id"
    [dataTestId]="dataTestId"
    [className]="className"
    [external]="external"
    [target]="target"
    [rel]="rel"
    [download]="download"
    [ariaCurrent]="ariaCurrent"
    [ariaLabel]="ariaLabel"
    [ariaLabelledBy]="ariaLabelledBy"
    [ariaDescribedBy]="ariaDescribedBy"
    [ariaHidden]="ariaHidden"
    [tabIndex]="tabIndex"
    [lang]="lang"
    (onClick)="onClick($event)"
    (onFocus)="onFocus($event)"
    (onBlur)="onBlur($event)"
    (onKeyDown)="onKeyDown($event)"
  >
    {{ children }}
  </gi-link>
`;

const renderLink = (props: Record<string, unknown>) => ({
  props,
  moduleMetadata: { imports: [Box, Link] },
  template: linkTemplate,
});

export const Default: StoryObj = {
  ...linkDefault,
  render: renderLink,
};

export const ExternalLink: StoryObj = {
  ...linkExternalLink,
  render: renderLink,
};

export const NoUnderline: StoryObj = {
  ...linkNoUnderline,
  render: renderLink,
};

export const NoVisited: StoryObj = {
  ...linkNoVisited,
  render: renderLink,
};

export const InheritColour: StoryObj = {
  ...linkInheritColour,
  render: renderLink,
};

export const Sizes: StoryObj = {
  ...linkSizes,
  render: () => ({
    moduleMetadata: { imports: [Box, Link] },
    template: `
      <gi-box className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <gi-link href="#" className="gi-text-sm">Small link</gi-link>
        <gi-link href="#" className="gi-text-md">Medium link</gi-link>
        <gi-link href="#" className="gi-text-lg">Large link</gi-link>
      </gi-box>
    `,
  }),
};

export const InteractionStates: StoryObj = {
  ...linkInteractionStates,
  render: () => ({
    moduleMetadata: { imports: [Box, Link] },
    template: `
      <gi-box className="gi-flex gi-flex-col gi-gap-4 gi-items-start">
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row">
          <gi-link href="#">default</gi-link>
          <gi-link href="#" className="pseudo-hover">hover</gi-link>
          <gi-link href="#" className="pseudo-focus">focus</gi-link>
        </gi-box>
        <gi-box className="gi-flex gi-flex-col gi-gap-2 sm:gi-flex-row gi-p-4 gi-bg-black">
          <gi-link href="#" className="gi-text-white hover:gi-text-white focus:gi-text-white visited:gi-text-white">light</gi-link>
          <gi-link href="#" className="gi-text-white hover:gi-text-white focus:gi-text-white visited:gi-text-white pseudo-hover">light hover</gi-link>
          <gi-link href="#" className="gi-text-white hover:gi-text-white focus:gi-text-white visited:gi-text-white pseudo-focus">light focus</gi-link>
        </gi-box>
      </gi-box>
    `,
  }),
};
