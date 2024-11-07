import type { Meta, StoryObj } from '@storybook/react';
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
  argTypes: {
    children: {
      control: 'text',
      description:
        'The content that will be inserted the the default cookie banner',
    },
    accept: {
      control: 'object',
      description:
        'The content that will be inserted in the accepted cookie banner and the trigger button used to navigate there',
      type: {
        name: 'object',
        value: {
          children: {
            name: 'string',
          },
          triggerButton: {
            name: 'string',
          },
        },
      },
    },
    reject: {
      control: 'object',
      description:
        'The content that will be inserted in the rejected cookie banner and the trigger button used to navigate there',
      type: {
        name: 'object',
        value: {
          children: {
            name: 'string',
          },
          triggerButton: {
            name: 'string',
          },
        },
      },
    },
    dismissButton: {
      control: 'text',
      description: 'The button used to hide the cookie banner',
    },
    cookieLink: {
      control: 'text',
      description: 'A link used to navigate the user to the cookies page',
    },
  },
  args: {
    children: (
      <>
        <Heading as="h3">Title</Heading>
        <Paragraph>
          We use some essential cookies to make this service work.
          <br />
          <br />
          We’d also like to use analytics cookies so we can understand how you
          use the service and make improvements.
        </Paragraph>
      </>
    ),
    accept: {
      children: (
        <>
          <Heading as="h3">Accepted Title</Heading>
          <Paragraph>
            You’ve accepted analytics cookies. You can change your cookie
            settings at any time.
          </Paragraph>
        </>
      ),
      triggerButton: <Button>Accept cookies</Button>,
    },
    reject: {
      children: (
        <>
          <Heading as="h3">Rejected Title</Heading>
          <Paragraph>
            You’ve rejected analytics cookies. You can change your cookie
            settings at any time.
          </Paragraph>
        </>
      ),
      triggerButton: <Button>Reject cookies</Button>,
    },
    cookieLink: <Link href="#">See Cookies</Link>,
    dismissButton: <Button>Hide this message</Button>,
  },
};
