import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../button/button';
import { Heading } from '../heading/heading';
import { Link } from '../link/link';
import { Paragraph } from '../paragraph/paragraph';
import { Accordion } from './accordion';
import { AccordionItem } from './accordion-item';

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
type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => (
    <Accordion>
      <AccordionItem label="Label1">
        <Heading size='xs' as="h2">This is the content Heading</Heading>
        <Paragraph>This is a content paragraph paragraph </Paragraph>
      </AccordionItem>
      <AccordionItem label="Label2">
        <Heading size='xs' as="h2">This is the content Heading</Heading>
        <Link href="#">This is a link</Link>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
          minus eveniet ex officiis accusantium sint eius deleniti cumque? Iste
          voluptatum omnis harum quaerat eius praesentium a at perferendis
          quisquam hic.
        </Paragraph>
      </AccordionItem>
      <AccordionItem label="Label3">
        <Heading size='xs' as="h2">This is the content Heading</Heading>
        <Button>This is a button</Button>
      </AccordionItem>
      <AccordionItem disabled label="Disabled Accordion">
        <Heading size='xs' as="h2">This is the content Heading</Heading>
        <Button>This is a button</Button>
      </AccordionItem>
    </Accordion>
  ),
};
