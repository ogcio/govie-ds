import { RouterLink, RouterLinkActive } from '@angular/router';
import omit from 'lodash/omit';
import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { GiBox } from '@/Box';
import { GiLinkButton, GiLinkButtonDirective } from '@/LinkButton';
import { GiStackDirective } from '@/Stack';
import { withRouter } from '@/stories/router';
import { linkButtonMeta, Default as defaultStory } from '@/atoms/storybook/LinkButton.meta';

const meta: Meta<GiLinkButton> = {
  ...linkButtonMeta,
  component: GiLinkButton,
  argTypes: {
    ...omit(linkButtonMeta.argTypes, ['className', 'styles']),
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
  title: 'Navigation/LinkButton',
  // Stop the click from navigating to avoid unexpected navigation in Storybook
  decorators: [componentWrapperDecorator((story) => `<div (click)="$event.preventDefault()">${story}</div>`)],
};

export default meta;

type Story = StoryObj<GiLinkButton>;

export const Default: Story = {
  ...defaultStory,
  render: (props) => ({
    props,
    moduleMetadata: {
      imports: [GiLinkButton, GiBox],
    },
    template: `
      <gi-box [class]="appearance === 'light' ? 'gi-p-4 gi-bg-black gi-w-fit' : 'gi-p-4 gi-w-fit'">
        <gi-link-button [id]="id" [dataTestId]="dataTestId" [href]="href" [variant]="variant" [appearance]="appearance" [size]="size" [external]="external">{{ children }}</gi-link-button>
      </gi-box>
    `,
  }),
};

export const Directive: StoryObj<GiLinkButtonDirective> = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Adds the `gi-link-button` styling to a plain `a`, with the same variants, appearances and sizes.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: { imports: [GiStackDirective, GiLinkButtonDirective] },
    template: `
      <div giStack direction="column" [gap]="4" align="start">
        <div giStack direction="row" [gap]="4">
          <a giButton href="#">Primary</a>
          <a giButton variant="secondary" href="#">Secondary</a>
          <a giButton variant="flat" href="#">Flat</a>
        </div>
        <div giStack direction="row" [gap]="4" align="center">
          <a giButton size="sm" href="#">Small</a>
          <a giButton size="md" href="#">Medium</a>
          <a giButton size="lg" href="#">Large</a>
        </div>
        <div giStack class="gi-bg-black gi-p-4">
          <a giButton appearance="light" href="#">Light appearance</a>
        </div>
      </div>
    `,
  }),
};

export const WithRouter: StoryObj<GiLinkButtonDirective> = {
  tags: ['skip-playwright'],
  decorators: [withRouter(['', 'apply', 'status'])],
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          '`giButton` supports the native Angular router: use it together with `routerLink` and `routerLinkActive` on the same `<a>`, and the router marks the active link with `aria-current`.',
      },
    },
  },
  render: (_props) => ({
    moduleMetadata: { imports: [GiStackDirective, RouterLink, RouterLinkActive, GiLinkButtonDirective] },
    template: `
      <div giStack direction="row" [gap]="4">
        <a giButton routerLink="/apply" routerLinkActive ariaCurrentWhenActive="page">Apply</a>
        <a giButton variant="secondary" routerLink="/status" routerLinkActive ariaCurrentWhenActive="page">Check status</a>
      </div>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const apply = canvas.getByRole('link', { name: 'Apply' });

    await step('the consumer anchor carries the router href', async () => {
      expect(apply.getAttribute('href')).toBe('#/apply');
    });

    await step('clicking navigates through the router and marks the active link', async () => {
      await userEvent.click(apply);
      await waitFor(() => expect(apply.getAttribute('aria-current')).toBe('page'));
      expect(canvas.getByRole('link', { name: 'Check status' }).getAttribute('aria-current')).toBeNull();
    });
  },
};
