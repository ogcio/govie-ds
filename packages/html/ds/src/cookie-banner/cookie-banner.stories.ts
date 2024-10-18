import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import { childrenDefault, childrenAccepted, childrenRejected } from './cookie-banner.content';
import html from './cookie-banner.html?raw';
import { CookieBannerProps } from './cookie-banner.schema';

const path = import.meta.url.split('/cookie-banner')[0];

const macro = { name: 'govieCookieBanner', html, path };

const CookieBanner = renderComponent<CookieBannerProps>(macro);

const meta = {
    component: CookieBanner,
    title: 'Typography/CookieBanner',
    parameters: {
      macro,
      description: {
        component:
          'Component for cookies to inform and ask the users for their consent',
      },
    },
  } satisfies Meta<typeof CookieBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: childrenDefault,
        accept: {
            children: childrenAccepted,
            triggerButton: {
                content: 'Accept cookies'
            }
        },
        reject: {
            children: childrenRejected,
            triggerButton: {
                content: 'Reject cookies'
            }
        },
        dismissButton: {
            content: 'Hide this message'
        },
        cookieLink: {
            href: '#',
            label: 'See Cookies'
        }
    }
}