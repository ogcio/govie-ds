import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import {
  childrenDefault,
  childrenAccepted,
  childrenRejected,
} from './cookie-banner.content';
import html from './cookie-banner.html?raw';
import { CookieBannerProps } from './cookie-banner.schema';

const macro = { name: 'govieCookieBanner', html };

const CookieBanner = renderComponent<CookieBannerProps>(macro);

const meta = {
  component: CookieBanner,
  title: 'application/CookieBanner',
  parameters: {
    macro,
    docs: {
      description: {
        component:
          'Component for cookies to inform and ask the users for their consent',
      },
    },
  },
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
    children: childrenDefault,
    accept: {
      children: childrenAccepted,
      triggerButton: {
        content: 'Accept cookies',
      },
    },
    reject: {
      children: childrenRejected,
      triggerButton: {
        content: 'Reject cookies',
      },
    },
    dismissButton: {
      content: 'Hide this message',
    },
    cookieLink: {
      href: '#',
      label: 'See Cookies',
    },
  },
};
