import omit from 'lodash/omit';
import { componentWrapperDecorator, type Meta, type StoryObj } from '@storybook/angular-vite';
import { GiBox } from '@/Box';
import { GiLinkButton, GiLinkButtonDirective } from '@/LinkButton';
import { GiStackDirective } from '@/Stack';
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
