import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import { AccordionProps } from './accordion-schema';
import html from './accordion.html?raw';

const macro = { name: 'govieAccordion', html };

const Accordion = renderComponent<AccordionProps>(macro);

const meta = {
  component: Accordion,
  title: 'Layout/Accordion',
  parameters: {
    macro,
    docs: {
      description: {
        component: 'Accordion component',
      },
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  {
    label: 'What is the Citizens Information Service?',
    content:
      'The Citizens Information Service provides information on public services and entitlements.',
  },
  {
    label: 'How can I apply for social welfare benefits?',
    content:
      'To apply for social welfare benefits, you need to fill out an application form, provide necessary documentation,     and submit it online or at your local office.',
  },
  {
    label: 'How do I get a public service card?',
    content:
      'To obtain a public service card, you need to visit a local service center with identification documents and proof of address.',
  },
  {
    disabled: true,
    label: 'Can I get financial assistance during a crisis?',
    content: `
        <button data-testid="govieButton-default-primary-medium-notDisabled" data-element="button-container" data-module="gieds-button" class="gi-btn gi-btn-primary gi-btn-regular">
          Learn More About Financial Assistance
        </button>
    `,
  },
];

export const Default: Story = {
  argTypes: {
    items: {
      description:
        'The content that will be inserted into the accordion (AccordionItem components)',
      table: {
        type: { summary: 'React.ReactElement<typeof AccordionItem>[]' },
      },
    },
    iconStart: {
      control: 'boolean',
      description:
        'Indicates whether icons should appear on the left (true) or the right (false) of the accordion label.',
    },
    dataTestid: {
      control: 'text',
      description: 'Custom test id for the Accordion component.',
    },
    variant: {
      control: 'radio',
      options: ['default', 'small'],
      description:
        'Defines the padding and style for the Accordion (default or small)',
    },
  },
  args: {
    items,
  },
};

export const SmallVariant: Story = {
  args: {
    variant: 'small',
    aria: {
      'aria-label': 'Accordion',
    },
    items,
  },
};

export const WithIconStart: Story = {
  args: {
    iconStart: true,
    aria: {
      'aria-label': 'Accordion',
    },
    items: [
      {
        label: 'Label 1',
        content: `This is a content paragraph paragraph`,
      },
      {
        label: 'Label 2',
        content:
          'Minus eveniet ex officiis accusantium sint eius deleniti cumque? Iste voluptatum omnis harum quaerat eius praesentium a at perferendis quisquam hic.',
      },
      {
        label: 'Label 3',
        content:
          'Minus eveniet ex officiis accusantium sint eius deleniti cumque? Iste voluptatum omnis harum quaerat eius praesentium a at perferendis quisquam hic.',
      },
      {
        aria: {
          'aria-disabled': 'true',
        },
        disabled: true,
        label: 'Label 4',
        content: `<button data-testid="govieButton-default-primary-medium-notDisabled" data-element="button-container" data-module="gieds-button" class="gi-btn gi-btn-primary gi-btn-regular">Button</button>`,
      },
    ],
  },
};
