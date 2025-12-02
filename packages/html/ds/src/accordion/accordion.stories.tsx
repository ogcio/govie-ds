import type { Meta, StoryObj } from '@storybook/react';
import parse from 'html-react-parser';
import { createIcon } from '../helpers/icons';
import { AccordionProps } from './types';

const meta: Meta<AccordionProps> = {
  title: 'Layout/Accordion',
};

export default meta;
type Story = StoryObj<AccordionProps>;

const createAccordion = (arguments_: AccordionProps) => {
  const accordion = document.createElement('div');
  accordion.dataset.module = 'gieds-accordion';
  accordion.role = 'region';
  accordion.className = 'gi-w-full';

  const variantClass =
    arguments_.variant == 'small'
      ? 'gi-py-2 gi-px-2 gi-text-sm gi-font-bold'
      : 'gi-px-2 gi-py-4 gi-text-md gi-font-bold';
  const textSizeClass =
    arguments_.variant == 'small' ? 'gi-text-sm' : 'gi-text-md';

  for (let index = 0; index < arguments_.items.length; index++) {
    const item = arguments_.items[index];
    const defaultExpandedClass = item.defaultExpanded
      ? 'gi-block'
      : 'gi-hidden';
    const iconId = item.defaultExpanded
      ? 'keyboard_arrow_up'
      : 'keyboard_arrow_down';
    const borderClass =
      index === arguments_.items.length - 1
        ? 'gi-border-t gi-border-b'
        : 'gi-border-t';

    const accordionItem = document.createElement('div');
    accordionItem.className = borderClass;

    const title = document.createElement('div');
    title.dataset.disabled = `${item.disabled || false}`;
    title.dataset['defaultExpanded'] = `${item.defaultExpanded || false}`;
    title.role = 'group';
    title.className = 'gi-accordion';
    title.tabIndex = 0;

    const header = document.createElement('div');
    header.id = `accordion-header-${index}`;
    header.className = `gi-accordion-header ${variantClass}`;

    const icon = createIcon({ icon: iconId });
    header.innerHTML = item.label + ' ' + icon.outerHTML;

    title.append(header);

    const content = document.createElement('div');
    content.className = `gi-px-2 gi-pb-4 gi-pt-2 gi-font-normal ${defaultExpandedClass} ${textSizeClass}`;
    content.id = `accordion-panel-${index}`;
    content.role = 'region';
    if (item.content) {
      content.innerHTML = item.content;
    }

    accordionItem.append(title);
    accordionItem.append(content);
    accordion.append(accordionItem);
  }

  return accordion;
};

const createElement = (arguments_: AccordionProps) => {
  const component = createAccordion(arguments_);
  return parse(component.outerHTML) as React.ReactElement;
};

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
  args: {
    items,
  },
  render: (arguments_) => createElement(arguments_),
  parameters: {
    createComponent: createAccordion,
  },
};

export const SmallVariant: Story = {
  args: {
    variant: 'small',
    items,
  },
  render: (arguments_) => createElement(arguments_),
  parameters: {
    createComponent: createAccordion,
  },
};

export const WithIconStart: Story = {
  args: {
    iconStart: true,
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
        disabled: true,
        label: 'Label 4',
        content: `<button data-testid="govieButton-default-primary-medium-notDisabled" data-element="button-container" data-module="gieds-button" class="gi-btn gi-btn-primary gi-btn-regular">Button</button>`,
      },
    ],
  },
  render: (arguments_) => createElement(arguments_),
  parameters: {
    createComponent: createAccordion,
  },
};
