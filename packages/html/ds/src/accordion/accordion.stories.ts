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
    content: `
      <div class="gi-px-3 gi-py-3 gi-gap-3 gi-flex gi-flex-col">
        <h2 class="gi-heading-xs">Citizens Information Service Overview</h2>
        <p class="gi-paragraph-md gi-text-start gi-whitespace-normal">
          The Citizens Information Service provides information on public services and entitlements.
          It helps citizens access services like social welfare, health services, and more.
        </p>
      </div>
    `,
  },
  {
    label: 'How can I apply for social welfare benefits?',
    content: `
      <div class="gi-px-3 gi-py-3 gi-gap-3 gi-flex gi-flex-col">
        <h2 class="gi-heading-xs">Applying for Social Welfare</h2>
        
        <p class="gi-paragraph-md gi-text-start gi-whitespace-normal">
          To apply for social welfare benefits, you need to fill out an application form, provide necessary documentation,
          and submit it online or at your local office.
        </p>
      </div>
    `,
  },
  {
    label: 'How do I get a public service card?',
    content: `
      <div class="gi-px-3 gi-py-3 gi-gap-3 gi-flex gi-flex-col">
        <h2 class="gi-heading-xs">Public Service Card Process</h2>
        <p class="gi-paragraph-md gi-text-start gi-whitespace-normal">
          To obtain a public service card, you need to visit a local service center with identification documents and proof of address.
        </p>
      </div>
    `,
  },
  {
    disabled: true,
    label: 'Can I get financial assistance during a crisis?',
    content: `
      <div class="gi-px-3 gi-py-3 gi-gap-3 gi-flex gi-flex-col">
        <h2 class="gi-heading-xs">Financial Assistance During Crises</h2>
        <button data-testid="govieButton-default-primary-medium-notDisabled" data-element="button-container" data-module="gieds-button" class="gi-btn gi-btn-primary gi-btn-regular">
          Learn More About Financial Assistance
        </button>
      </div>
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
        content: `<h2 class="gi-heading-xs">This is the content heading</h2><p class="gi-paragraph-md gi-text-start gi-whitespace-normal ">This is a content paragraph paragraph</p>`,
      },
      {
        label: 'Label 2',
        content: `<h2 class="gi-heading-xs">This is the content heading</h2>
        <p class="gi-paragraph-md gi-text-start gi-whitespace-normal ">  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
          minus eveniet ex officiis accusantium sint eius deleniti cumque? Iste
          voluptatum omnis harum quaerat eius praesentium a at perferendis
          quisquam hic.</p>`,
      },
      {
        label: 'Label 3',
        content: `<h2 class="gi-heading-xs">This is the content heading</h2><button data-testid="govieButton-default-primary-medium-notDisabled" data-element="button-container" data-module="gieds-button" class="gi-btn gi-btn-primary gi-btn-regular">Button</button>`,
      },
      {
        aria: {
          'aria-disabled': 'true',
        },
        disabled: true,
        label: 'Label 4',
        content: `<h2 class="gi-heading-xs">This is the content heading</h2><button data-testid="govieButton-default-primary-medium-notDisabled" data-element="button-container" data-module="gieds-button" class="gi-btn gi-btn-primary gi-btn-regular">Button</button>`,
      },
    ],
  },
};
