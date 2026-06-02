import type { StoryObj } from '@storybook/angular';
import Link from '../atoms/Link';
import Box from '../atoms/Box';
import Paragraph from '../atoms/Paragraph';
import { H1, H2 } from '../atoms/heading';
import { linkMeta, Default as linkDefault, ExternalLink as linkExternal } from '../atoms/storybook/Link.meta';

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
        [visited]="visited"
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

export const Visited: StoryObj = {
  render: () => ({
    moduleMetadata: { imports: [Link, Box] },
    template: `
      <gi-box [className]="'gi-flex gi-flex-col gi-gap-4 gi-items-start'">
        <gi-link href="#" visited="default">Default visited colour</gi-link>
        <gi-link href="#" visited="none">No visited colour</gi-link>
      </gi-box>
    `,
  }),
};

export const Appearances: StoryObj = {
  render: () => ({
    moduleMetadata: { imports: [Link, Box] },
    template: `
      <gi-box [className]="'gi-flex gi-flex-col gi-gap-4 gi-items-start'">
        <gi-link href="#">Default appearance</gi-link>
        <gi-box [className]="'gi-bg-black gi-p-4 gi-rounded'">
          <gi-link href="#" appearance="light">Light appearance</gi-link>
        </gi-box>
        <gi-box [className]="'gi-text-gray-700'">
          <gi-link href="#" appearance="inherit">Inherit parent colour</gi-link>
        </gi-box>
      </gi-box>
    `,
  }),
};

export const InTypography: StoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'Link underline and scale next to heading and body typography.',
      },
    },
    pseudo: {
      hover: '.pseudo-hover',
      focus: '.pseudo-focus',
    },
  },
  render: () => ({
    moduleMetadata: { imports: [Link, Box, Paragraph, H1, H2] },
    template: `
      <gi-box [className]="'gi-flex gi-flex-col gi-gap-8 gi-max-w-prose'">

        <gi-box [className]="'gi-flex gi-flex-col gi-gap-4'">
          <gi-h1>Heading with an <gi-link href="#" variant="inline">inline link</gi-link></gi-h1>
          <gi-paragraph>
            Government services are available on <gi-link href="#" variant="inline">gov.ie</gi-link>.
            You can also check <gi-link href="#" variant="inline">your application status</gi-link>
            or contact the <gi-link href="#" variant="inline">support team</gi-link> for help.
          </gi-paragraph>
        </gi-box>

        <gi-box [className]="'gi-flex gi-flex-col gi-gap-4'">
          <gi-h2>Underlines</gi-h2>
          <gi-paragraph>Always underlined: <gi-link href="#" variant="inline" underline="always">apply online</gi-link></gi-paragraph>
          <gi-paragraph>Hover only: <gi-link href="#" variant="inline" underline="hover">check status</gi-link></gi-paragraph>
          <gi-paragraph>No underline: <gi-link href="#" variant="inline" underline="none">learn more</gi-link></gi-paragraph>
        </gi-box>

        <gi-box [className]="'gi-flex gi-flex-col gi-gap-4'">
          <gi-h2>Visited</gi-h2>
          <gi-paragraph>Default visited colour: <gi-link href="#" variant="inline">visited link</gi-link></gi-paragraph>
          <gi-paragraph>No visited colour: <gi-link href="#" variant="inline" visited="none">always same colour</gi-link></gi-paragraph>
        </gi-box>

        <gi-box [className]="'gi-flex gi-flex-col gi-gap-4'">
          <gi-h2>Appearances</gi-h2>
          <gi-box [className]="'gi-bg-black gi-p-4 gi-rounded'">
            <gi-paragraph className="gi-text-white">Light on dark: <gi-link href="#" variant="inline" appearance="light">gov.ie services</gi-link></gi-paragraph>
          </gi-box>
          <gi-paragraph className="gi-text-gray-700 gi-pl-4">Inherit parent colour: <gi-link href="#" variant="inline" appearance="inherit">inherited link</gi-link></gi-paragraph>
        </gi-box>

        <gi-box [className]="'gi-flex gi-flex-col gi-gap-4'">
          <gi-h2>Interaction states</gi-h2>
          <gi-paragraph className="gi-flex gi-gap-4 gi-pl-4">
            <gi-link href="#" variant="inline">default</gi-link>
            <gi-link href="#" variant="inline" className="pseudo-hover">hover</gi-link>
            <gi-link href="#" variant="inline" className="pseudo-focus">focus</gi-link>
          </gi-paragraph>
          <gi-box [className]="'gi-bg-black gi-p-4 gi-rounded'">
            <gi-paragraph className="gi-text-white gi-flex gi-gap-4">
              <gi-link href="#" variant="inline" appearance="light">light</gi-link>
              <gi-link href="#" variant="inline" appearance="light" className="pseudo-hover">hover</gi-link>
              <gi-link href="#" variant="inline" appearance="light" className="pseudo-focus">focus</gi-link>
            </gi-paragraph>
          </gi-box>
        </gi-box>

      </gi-box>
    `,
  }),
};
