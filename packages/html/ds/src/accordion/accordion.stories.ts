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

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Label 1',
        content: `<h2 class="gi-heading-xs">This is the content heading</h2><p class="gi-paragraph-md gi-text-start gi-whitespace-normal ">This is a content paragraph paragraph</p>`,
      },
      {
        label: 'Label 2',
        content: `<h2 class="gi-heading-xs">This is the content heading</h2><a href="#" class="gi-link gi-link-md">Link</a><p class="gi-paragraph-md gi-text-start gi-whitespace-normal ">  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
          minus eveniet ex officiis accusantium sint eius deleniti cumque? Iste
          voluptatum omnis harum quaerat eius praesentium a at perferendis
          quisquam hic.</p>`,
      },
      {
        label: 'Label 3',
        content: `<h2 class="gi-heading-xs">This is the content heading</h2><button data-testid="govieButton-default-primary-medium-notDisabled" data-element="button-container" data-module="gieds-button" class="gi-btn gi-btn-primary gi-btn-regular">Button</button>`,
      },
      {
        disabled: true,
        label: 'Label 4',
        content: `<h2 class="gi-heading-xs">This is the content heading</h2><button data-testid="govieButton-default-primary-medium-notDisabled" data-element="button-container" data-module="gieds-button" class="gi-btn gi-btn-primary gi-btn-regular">Button</button>`,
      },
    ],
  },
};

export const WithIconStart: Story = {
  args: {
    iconStart: true,
    items: [
      {
        label: 'Label 1',
        content: `<h2 class="gi-heading-xs">This is the content heading</h2><p class="gi-paragraph-md gi-text-start gi-whitespace-normal ">This is a content paragraph paragraph</p>`,
      },
      {
        label: 'Label 2',
        content: `<h2 class="gi-heading-xs">This is the content heading</h2><a href="#" class="gi-link gi-link-md">Link</a><p class="gi-paragraph-md gi-text-start gi-whitespace-normal ">  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
          minus eveniet ex officiis accusantium sint eius deleniti cumque? Iste
          voluptatum omnis harum quaerat eius praesentium a at perferendis
          quisquam hic.</p>`,
      },
      {
        label: 'Label 3',
        content: `<h2 class="gi-heading-xs">This is the content heading</h2><button data-testid="govieButton-default-primary-medium-notDisabled" data-element="button-container" data-module="gieds-button" class="gi-btn gi-btn-primary gi-btn-regular">Button</button>`,
      },
      {
        disabled: true,
        label: 'Label 4',
        content: `<h2 class="gi-heading-xs">This is the content heading</h2><button data-testid="govieButton-default-primary-medium-notDisabled" data-element="button-container" data-module="gieds-button" class="gi-btn gi-btn-primary gi-btn-regular">Button</button>`,
      },
    ],
  },
};
