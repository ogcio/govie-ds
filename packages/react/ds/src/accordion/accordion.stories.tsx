import type { Meta } from '@storybook/react';
import { Button } from '../button/button.js';
import { Heading } from '../heading/heading.js';
import { Link } from '../link/link.js';
import { Paragraph } from '../paragraph/paragraph.js';
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
        <div className="gi-px-3 gi-py-3 gi-gap-3 gi-flex gi-flex-col">
          <Heading size="xs" as="h2">
            Citizens Information Service Overview
          </Heading>
          <Paragraph>
            The Citizens Information Service provides information on public
            services and entitlements. It helps citizens access services like
            social welfare, health services, and more.
          </Paragraph>
        </div>
      </AccordionItem>
      <AccordionItem label="How can I apply for social welfare benefits?">
        <div className="gi-px-3 gi-py-3 gi-gap-3 gi-flex gi-flex-col">
          <Heading size="xs" as="h2">
            Applying for Social Welfare
          </Heading>
          <Paragraph>
            To apply for social welfare benefits, you need to fill out an
            application form, provide necessary documentation, and submit it
            online or at your local office.
          </Paragraph>
        </div>
      </AccordionItem>
      <AccordionItem label="How do I get a public service card?">
        <div className="gi-px-3 gi-py-3 gi-gap-3 gi-flex gi-flex-col">
          <Heading size="xs" as="h2">
            Public Service Card Process
          </Heading>
          <Paragraph>
            To obtain a public service card, you need to visit a local service
            center with identification documents and proof of address.
          </Paragraph>
        </div>
      </AccordionItem>
      <AccordionItem
        disabled
        label="Can I get financial assistance during a crisis?"
      >
        <div className="gi-px-3 gi-py-3 gi-gap-3 gi-flex gi-flex-col">
          <Heading size="xs" as="h2">
            Financial Assistance During Crises
          </Heading>
          <Button>Learn More About Financial Assistance</Button>
        </div>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithIconStart = {
  render: () => (
    <Accordion iconStart={true}>
      <AccordionItem label="Label1">
        <Heading size="xs" as="h2">
          This is the content Heading
        </Heading>
        <Paragraph>This is a content paragraph paragraph</Paragraph>
      </AccordionItem>
      <AccordionItem label="Label2">
        <Heading size="xs" as="h2">
          This is the content Heading
        </Heading>
        <Link href="#">This is a link</Link>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
          minus eveniet ex officiis accusantium sint eius deleniti cumque? Iste
          voluptatum omnis harum quaerat eius praesentium a at perferendis
          quisquam hic.
        </Paragraph>
      </AccordionItem>
      <AccordionItem label="Label3">
        <Heading size="xs" as="h2">
          This is the content Heading
        </Heading>
        <Button>This is a button</Button>
      </AccordionItem>
      <AccordionItem disabled label="Disabled Accordion">
        <Heading size="xs" as="h2">
          This is the content Heading
        </Heading>
        <Button>This is a button</Button>
      </AccordionItem>
    </Accordion>
  ),
};
