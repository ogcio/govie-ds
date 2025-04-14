import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/button.js';
import { Heading } from '../heading/heading.js';
import { Link } from '../link/link.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { CookieBanner } from './cookie-banner.js';

const meta = {
  title: 'application/CookieBanner',
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
    cookieLink: {
      control: 'text',
      description: 'A link used to navigate the user to the cookies page',
    },
  },
  args: {
    showConsent: true,
    children: (
      <>
        <Heading as="h3" id="cookie-banner-title">
          Title
        </Heading>
        <Paragraph>
          We use some essential cookies to make this service work.
          <br />
          <br />
          We’d also like to use analytics cookies so we can understand how you
          use the service and make improvements.
        </Paragraph>
      </>
    ),
    accept: <Button>Accept cookies</Button>,
    reject: <Button>Reject cookies</Button>,
    cookieLink: <Link href="#">See Cookies</Link>,
  },
};
