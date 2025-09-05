import type { Meta } from '@storybook/react';
import { Button } from '../button/button.js';
import { AccordionItem } from './accordion-item.js';
import { Accordion, AccordionProps } from './accordion.js';

const meta = {
  title: 'Layout/Accordion',
  parameters: {
    docs: {
      description: {
        component: 'Accordion component',
      },
    },
  },
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;

export const Default = {
  argTypes: {
    children: {
      control: 'array', // `children` is expected to be an array of React elements
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
  render: (props: AccordionProps) => (
    <Accordion {...props}>
      <AccordionItem label="What is the Citizens Information Service?">
        The Citizens Information Service provides information on public services
        and entitlements. It helps citizens access services like social welfare,
        health services, and more.
      </AccordionItem>
      <AccordionItem label="How can I apply for social welfare benefits?">
        To apply for social welfare benefits, you need to fill out an
        application form, provide necessary documentation, and submit it online
        or at your local office.
      </AccordionItem>
      <AccordionItem label="How do I get a public service card?">
        To obtain a public service card, you need to visit a local service
        center with identification documents and proof of address.
      </AccordionItem>
      <AccordionItem
        disabled
        label="Can I get financial assistance during a crisis?"
      >
        <Button>Learn More About Financial Assistance</Button>
      </AccordionItem>
    </Accordion>
  ),
};

export const SmallVariant = {
  args: {
    variant: 'small',
  },
  render: (props: AccordionProps) => (
    <Accordion {...props}>
      <AccordionItem label="What is the Citizens Information Service?">
        The Citizens Information Service provides information on public services
        and entitlements. It helps citizens access services like social welfare,
        health services, and more.
      </AccordionItem>
      <AccordionItem label="How can I apply for social welfare benefits?">
        To apply for social welfare benefits, you need to fill out an
        application form, provide necessary documentation, and submit it online
        or at your local office.
      </AccordionItem>
      <AccordionItem label="How do I get a public service card?">
        To obtain a public service card, you need to visit a local service
        center with identification documents and proof of address.
      </AccordionItem>
      <AccordionItem
        disabled
        label="Can I get financial assistance during a crisis?"
      >
        <Button>Learn More About Financial Assistance</Button>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithIconStart = {
  render: () => (
    <Accordion iconStart={true}>
      <AccordionItem label="Label 1">
        This is a content paragraph paragraph
      </AccordionItem>
      <AccordionItem label="Label 2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores minus
        eveniet ex officiis accusantium sint eius deleniti cumque? Iste
        voluptatum omnis harum quaerat eius praesentium a at perferendis
        quisquam hic.
      </AccordionItem>
      <AccordionItem label="Label 3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores minus
        eveniet ex officiis accusantium sint eius deleniti cumque? Iste
        voluptatum omnis harum quaerat eius praesentium a at perferendis
        quisquam hic.
      </AccordionItem>
      <AccordionItem disabled label="Label 4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores minus
        eveniet ex officiis accusantium sint eius deleniti cumque? Iste
        voluptatum omnis harum quaerat eius praesentium a at perferendis
        quisquam hic.
      </AccordionItem>
      <AccordionItem disabled label="Label 5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores minus
        eveniet ex officiis accusantium sint eius deleniti cumque? Iste
        voluptatum omnis harum quaerat eius praesentium a at perferendis
        quisquam hic.
      </AccordionItem>
    </Accordion>
  ),
};
