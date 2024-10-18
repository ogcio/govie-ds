import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../button/button.js';
import { Heading } from '../heading/heading.js';
import { Link } from '../link/link.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { CookieBanner } from './cookie-banner.js';

const meta = {
  title: 'Typography/CookieBanner',
  parameters: {
    docs: {
      description: {
        component:
          'Component for cookies to inform and ask the users for their consent',
      },
    },
  },
  component: CookieBanner,
} satisfies Meta<typeof CookieBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Heading as='h3'>Title</Heading>
        <Paragraph>
          We use some essential cookies to make this service work.<br/><br/>We’d also like to use analytics cookies so we can understand how you use the service and make improvements.
          </Paragraph>
      </>
    ),
    accept: {
      children: (
        <>
          <Heading as='h3'>Accepted Title</Heading>
          <Paragraph>
          You’ve accepted analytics cookies. You can change your cookie settings at any time.
          </Paragraph>
        </>
      ),
      triggerButton: <Button>Accept cookies</Button>,
    },
    reject: {
      children: (
        <>
          <Heading as='h3'>Rejected Title</Heading>
          <Paragraph>
          You’ve rejected analytics cookies. You can change your cookie settings at any time.
          </Paragraph>
        </>
      ),
      triggerButton: <Button>Reject cookies</Button>,
      
    },
    cookieLink: <Link href='#'>See Cookies</Link>,
    dismissButton: <Button>Hide this message</Button>
  },
};
