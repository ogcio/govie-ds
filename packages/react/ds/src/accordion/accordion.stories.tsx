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
      control: 'radio', // Control type set to radio, allowing for default or small options
      options: ['default', 'small'],
      description:
        'Defines the padding and style for the Accordion (default or small)',
    },
  },
  render: (props: AccordionProps) => (
    <Accordion {...props}>
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
