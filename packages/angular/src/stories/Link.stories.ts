import { RouterLink, RouterLinkActive } from '@angular/router';
import omit from 'lodash/omit';
import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { GiLink, GiLinkDirective } from '@/Link';
import { withRouter } from '@/stories/router';
import { GiBox } from '@/Box';
import { GiParagraph, GiParagraphDirective } from '@/Paragraph';
import { GiStack, GiStackDirective } from '@/Stack';
import { GiH1 } from '@/heading/H1';
import { GiH2 } from '@/heading/H2';
import HomeIcon from '@/atoms/icons/Home';
import {
  linkMeta,
  InlineLink as linkInline,
  PlainFocusState as linkPlainFocus,
  PlainLink as linkPlain,
} from '@/atoms/storybook/Link.meta';

const meta: Meta<GiLink> = {
  ...linkMeta,
  title: 'Navigation/Link',
  component: GiLink,
  argTypes: {
    ...omit(linkMeta.argTypes, ['className', 'styles']),
    class: {
      control: false,
      description: 'Additional CSS classes applied to the link element.',
      table: { type: { summary: 'string' } },
    },
    style: {
      control: false,
      description: 'Inline styles applied to the link element.',
      table: { type: { summary: 'string' } },
    },
  },
  // Stop the click from navigating to avoid unexpected navigation in Storybook
  decorators: [componentWrapperDecorator((story) => `<div (click)="$event.preventDefault()">${story}</div>`)],
};

export default meta;

type Story = StoryObj<GiLink>;

export const InlineLink: Story = {
  ...linkInline,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [GiLink] },
    template: `
      <gi-link
        [href]="href"
        [id]="id"
        [dataTestId]="dataTestId"
        [variant]="variant"
        [underline]="underline"
        [appearance]="appearance"
        [visited]="visited"
        [external]="external"
      >
        {{ children }}
      </gi-link>
    `,
  }),
};

export const InTypography: Story = {
  tags: ['skip-playwright'],
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
  render: (_props) => ({
    moduleMetadata: { imports: [GiLink, GiBox, GiStack, GiParagraph, GiH1, GiH2] },
    template: `
      <gi-stack direction="column" [gap]="8" class="gi-max-w-prose">

        <gi-stack direction="column" [gap]="4">
          <gi-h1>Heading with an <gi-link href="#" variant="inline">inline link</gi-link></gi-h1>
          <gi-paragraph>
            Government services are available on <gi-link href="#" variant="inline">gov.ie</gi-link>.
            You can also check <gi-link href="#" variant="inline">your application status</gi-link>
            or contact the <gi-link href="#" variant="inline">support team</gi-link> for help.
          </gi-paragraph>
        </gi-stack>

        <gi-stack direction="column" [gap]="4">
          <gi-h2>Underlines</gi-h2>
          <gi-paragraph>Always underlined: <gi-link href="#" variant="inline" underline="always">apply online</gi-link></gi-paragraph>
          <gi-paragraph>Hover only: <gi-link href="#" variant="inline" underline="hover">check status</gi-link></gi-paragraph>
          <gi-paragraph>No underline: <gi-link href="#" variant="inline" underline="none">learn more</gi-link></gi-paragraph>
        </gi-stack>

        <gi-stack direction="column" [gap]="4">
          <gi-h2>Visited</gi-h2>
          <gi-paragraph>Default visited colour: <gi-link href="#" variant="inline">visited link</gi-link></gi-paragraph>
          <gi-paragraph>No visited colour: <gi-link href="#" variant="inline" visited="none">always same colour</gi-link></gi-paragraph>
        </gi-stack>

        <gi-stack direction="column" [gap]="4">
          <gi-h2>Appearances</gi-h2>
          <gi-box class="gi-bg-black gi-p-4 gi-rounded gi-w-fit">
            <gi-paragraph class="gi-text-white">Light on dark: <gi-link href="#" variant="inline" appearance="light">gov.ie services</gi-link></gi-paragraph>
          </gi-box>
          <gi-paragraph class="gi-text-gray-700 gi-pl-4">Inherit parent colour: <gi-link href="#" variant="inline" appearance="inherit">inherited link</gi-link></gi-paragraph>
        </gi-stack>

        <gi-stack direction="column" [gap]="4">
          <gi-h2>Interaction states</gi-h2>
          <gi-paragraph class="gi-flex gi-gap-4 gi-pl-4">
            <gi-link href="#" variant="inline">default</gi-link>
            <gi-link href="#" variant="inline" class="pseudo-hover">hover</gi-link>
            <gi-link href="#" variant="inline" class="pseudo-focus">focus</gi-link>
          </gi-paragraph>
          <gi-box class="gi-bg-black gi-p-4 gi-rounded gi-w-fit">
            <gi-paragraph class="gi-text-white gi-flex gi-gap-4">
              <gi-link href="#" variant="inline" appearance="light">light</gi-link>
              <gi-link href="#" variant="inline" appearance="light" class="pseudo-hover">hover</gi-link>
              <gi-link href="#" variant="inline" appearance="light" class="pseudo-focus">focus</gi-link>
            </gi-paragraph>
          </gi-box>
        </gi-stack>

      </gi-stack>
    `,
  }),
};

export const PlainLink: Story = {
  ...linkPlain,
  render: (_props) => ({
    moduleMetadata: { imports: [GiLink, GiBox, GiStack, HomeIcon] },
    template: `
      <gi-stack direction="column" [gap]="6" align="start">
        <gi-stack direction="column" [gap]="4" align="start">
          <gi-link href="#" ariaLabel="Home" class="gi-inline-flex gi-w-fit">
            <gi-home-icon />
          </gi-link>
          <gi-link href="#" class="gi-italic">Styled Link</gi-link>
        </gi-stack>
        <gi-box class="gi-bg-black gi-p-4 gi-rounded">
          <gi-link href="#" appearance="light" visited="none">Light appearance</gi-link>
        </gi-box>
      </gi-stack>
    `,
  }),
};

export const PlainFocusState: Story = {
  ...linkPlainFocus,
  tags: ['skip-playwright'],
  render: (_props) => ({
    moduleMetadata: { imports: [GiLink, GiBox, GiStack, HomeIcon] },
    template: `
      <gi-stack direction="column" [gap]="6" align="start">
        <gi-link href="#" ariaLabel="Home" dataTestId="link-icon-default" class="gi-inline-flex gi-w-fit pseudo-focus">
          <gi-home-icon />
        </gi-link>
        <gi-box class="gi-bg-black gi-p-4 gi-rounded">
          <gi-link href="#" appearance="light" ariaLabel="Home light" dataTestId="link-icon-light" class="gi-inline-flex gi-w-fit pseudo-focus">
            <gi-home-icon />
          </gi-link>
        </gi-box>
      </gi-stack>
    `,
  }),
};

export const Directive: StoryObj<GiLinkDirective> = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Adds the `gi-link` styling to a plain `a`, with the same variants, underline, appearance and visited handling.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: { imports: [GiStackDirective, GiParagraphDirective, GiLinkDirective, HomeIcon] },
    template: `
      <div giStack direction="column" [gap]="6" align="start">
        <div giStack direction="column" [gap]="4" align="start">
          <a giLink href="#" aria-label="Home" class="gi-inline-flex gi-w-fit">
            <gi-home-icon />
          </a>
          <a giLink href="#" class="gi-italic">Styled Link</a>
          <p giParagraph>Government services are available on <a giLink href="#" variant="inline">gov.ie</a>.</p>
        </div>
        <div giStack class="gi-bg-black gi-p-4">
          <a giLink href="#" appearance="light" visited="none">Light appearance</a>
        </div>
      </div>
    `,
  }),
};

export const WithRouter: StoryObj<GiLinkDirective> = {
  tags: ['skip-playwright'],
  decorators: [withRouter(['', 'about', 'contact'])],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`giLink` supports the native Angular router: use it together with `routerLink` and `routerLinkActive` on the same `<a>`, and the router marks the active link with `aria-current`.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: { imports: [GiStackDirective, RouterLink, RouterLinkActive, GiLinkDirective] },
    template: `
      <div giStack direction="row" [gap]="6" align="center">
        <a giLink routerLink="/" routerLinkActive [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">Home</a>
        <a giLink routerLink="/about" routerLinkActive ariaCurrentWhenActive="page">About</a>
        <a giLink variant="inline" class="gi-italic" routerLink="/contact" routerLinkActive ariaCurrentWhenActive="page">Contact</a>
      </div>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const about = canvas.getByRole('link', { name: 'About' });

    await step('the consumer anchor carries the router href', async () => {
      expect(about.getAttribute('href')).toBe('#/about');
    });

    await step('clicking navigates through the router and marks the active link', async () => {
      await userEvent.click(about);
      await waitFor(() => expect(about.getAttribute('aria-current')).toBe('page'));
      expect(canvas.getByRole('link', { name: 'Home' }).getAttribute('aria-current')).toBeNull();
    });

    await step('directive classes merge with the consumer class', async () => {
      const contact = canvas.getByRole('link', { name: 'Contact' });
      expect(contact.classList).toContain('gi-italic');
      expect(contact.classList).toContain('gi-underline');
    });
  },
};
