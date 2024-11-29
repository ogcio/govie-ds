import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header.js';
import { Stack } from '../stack/stack.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { Button } from '../button/button.js';
import { Container } from '../container/container.js';
import { TextInput } from '../text-input/text-input.js';
import { Link } from '../link/link.js';
import { List, TypeEnum } from '../list/list.js';

const meta = {
  title: 'layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const SlotExample = () => (
  <Container>
    <div className="gi-text-sm">
      <Stack gap={2}>
        <List
          type={TypeEnum.Bullet}
          items={[
            <Link size="sm" href="#">
              Citizens Information - Services and Rights
            </Link>,
            <Link size="sm" href="#">
              Revenue - Taxes and Payments
            </Link>,
            <Link size="sm" href="#">
              Department of Social Protection
            </Link>,
          ]}
        ></List>
      </Stack>
    </div>
  </Container>
);

export const Default: Story = {
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the Header',
      table: {
        category: 'Header',
      },
    },
    logo: {
      control: 'object',
      description: 'The url and image for the logo',
      table: {
        category: 'Header',
      },
    },
    tools: {
      control: 'object',
      description: 'Actionable items such as Search, Menu and additional CTA',
      table: {
        category: 'Header',
        type: {
          summary: '{search?: {}; menu?: {}; items: {}[]}',
        },
      },
    },
    navLinks: {
      description: 'A list of navigation links',
      table: {
        category: 'Header',
      },
    },
    languages: {
      description: 'A list of secondary navigation links',
      table: {
        category: 'Header',
      },
    },
  },
  args: {
    logo: {
      href: '/link',
    },
    tools: {
      menu: {
        icon: 'menu',
        label: 'Menu',
      },
      search: {
        action: '/search_page',
        label: 'Search',
      },
      items: [
        {
          href: '/item1',
          label: 'Home',
          icon: 'home',
        },
        {
          href: '#',
          label: 'Links',
          icon: 'thumb_up',
          slot: <SlotExample />,
        },

        {
          href: '#',
          label: 'Profile',
          icon: 'info',
          slot: (
            <Container>
              <div className="gi-max-w-[250px]">
                <Stack direction="column" gap={3}>
                  <Paragraph>Name</Paragraph>
                  <TextInput className="gi-w-full" disabled value="Joe Doe" />
                  <Paragraph>Passport Number</Paragraph>
                  <TextInput
                    className="gi-w-full"
                    disabled
                    value="XX9999999999"
                  />
                  <Stack direction="column" itemsAlignment="end">
                    <Button>Edit</Button>
                  </Stack>
                </Stack>
              </div>
            </Container>
          ),
        },
      ],
    },
    navLinks: [
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
  },
};

export const NoLinks: Story = {
  args: {},
};

export const WithMainLinks: Story = {
  args: {
    logo: {
      href: '/path',
    },
    tools: {
      search: {
        label: 'Search',
        action: '/search_page',
      },
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
  },
};

export const WithNoSearch: Story = {
  args: {
    logo: {
      href: '/path',
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
  },
};

export const WithSecondaryLinks: Story = {
  args: {
    logo: {
      href: '/path',
    },
    tools: {
      search: {
        label: 'Search',
        action: 'search_page',
      },
    },
    languages: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
  },
};

export const withMainAndSecondaryLinks: Story = {
  args: {
    logo: {
      href: 'path',
    },
    tools: {
      search: {
        label: 'Search',
        action: '/search-page',
      },
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
  },
};

export const withTitle: Story = {
  args: {
    title: 'Life Events',
    logo: {
      href: 'path',
    },
    tools: {
      search: {
        action: '/search-page',
      },
    },
    navLinks: [
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
  },
};

export const NoLabelSearch: Story = {
  args: {
    logo: {
      href: 'path',
    },
    tools: {
      search: {
        action: '/search-page',
      },
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
  },
};

export const tabletView: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'pixel',
    },
  },
  args: {
    logo: {
      href: 'path',
    },
    tools: {
      search: {
        action: '/search-page',
      },
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
  },
};

export const mobileView: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    logo: {
      href: 'path',
    },
    tools: {
      search: {
        action: '/search-page',
      },
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
      {
        href: '#',
        label: 'English',
      },
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
  },
};

export const WithExtraButtons: Story = {
  args: {
    logo: {
      href: '/path',
    },
    tools: {
      items: [
        {
          href: '/home',
          icon: 'home',
        },
        {
          href: '/logout',
          icon: 'logout',
        },
      ],
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
  },
};

export const WithExtraButtonsAndLabels: Story = {
  args: {
    logo: {
      href: '/path',
    },
    tools: {
      search: {
        label: 'Search',
        action: 'search_page',
      },
      items: [
        {
          href: '/home',
          icon: 'home',
          label: 'Home',
        },
        {
          href: '/logout',
          icon: 'logout',
          label: 'Logout',
        },
      ],
    },
    navLinks: [
      {
        href: '#',
        label: 'News',
      },
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    logo: {
      href: '/link',
    },
    tools: {
      search: {
        action: '/search_page',
        label: 'Search',
      },
      items: [
        {
          href: '/item1',
          label: 'Home',
          icon: 'home',
        },
      ],
    },
    navLinks: [
      {
        href: '#',
        label: 'Departments',
      },
      {
        href: '#',
        label: 'Services',
      },
    ],
    languages: [
      {
        href: '#',
        label: 'Gaeilge',
      },
    ],
  },
};
