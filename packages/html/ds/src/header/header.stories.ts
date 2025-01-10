import type { Meta, StoryObj } from '@storybook/react';
import { renderComponent } from '../storybook/storybook';
import html from './header.html?raw';
import { HeaderProps } from './header.schema';

// Name of the folder the macro resides
const path = import.meta.url.split('/header')[0];

const macro = { name: 'govieHeader', html, path };

const Header = renderComponent<HeaderProps>(macro);

const meta = {
  component: Header,
  title: 'layout/Header',
  parameters: {
    macro,
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

const slotExample1 = () => `
  <ul class="gi-list-bullet" data-testid="govieList">
    <li>
      <a
        href="#"
        class="gi-link gi-link-sm"
      >
        Citizens Information - Services and Rights
      </a>
    </li>
    <li>
      <a
        href="#"
        class="gi-link gi-link-sm"
      >
        Revenue - Taxes and Payments
      </a>
    </li>
    <li>
      <a
        href="#"
        class="gi-link gi-link-sm"
      >
        Department of Social Protection
      </a>
    </li>
  </ul>
`;

const slotExample2 = () => `
  <form class="gi-max-w-md gi-mx-auto">
    <h4 class="gi-heading-sm">Search the website</h4>
    <div class="gi-flex gi-items-end gi-mt-4">
      <div class="gi-text-input-container gi-flex-auto">
        <div class="gi-text-input-container-inner">
          <input
            placeholder="Enter search term"
            id="search"
            type="text"
            data-testid="textbox"
            class="gi-border-gray-950 gi-w-full gi-text-input"
            name="search_query"
            aria-label="Search the website"
          />
        </div>
      </div>
      <button
        data-testid="govieButton-undefined-undefined-undefined-"
        class="gi-btn gi-btn-primary gi-btn-regular gi-ml-1 gi-flex-none"
      >
        Search
        <span
          data-testid="govie-icon"
          aria-label="Search"
          role="img"
          class="material-symbols-outlined gi-block"
          style="font-size: 24px; font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;"
        >
          search
        </span>
      </button>
    </div>
  </form>
`;

const slotExample3 = () => `
  <select
    class="gi-select"
    id="slot-example-2"
    aria-label="slot-example-2"
  >
    <optgroup label="Languages">
      <option class="gi-select-option" value="gaeilge">Gaeilge</option>
      <option class="gi-select-option" value="english">English</option>
      <option class="gi-select-option" value="spanish">Spanish</option>
      <option class="gi-select-option" value="italian">Italian</option>
    </optgroup>
  </select>
`;

export const Default: Story = {
  args: {
    logo: {
      href: '/link',
    },
    tools: {
      menu: {
        icon: 'menu',
        label: 'Menu',
      },
      items: [
        {
          href: '/item1',
          label: 'Home',
          icon: 'home',
        },
        {
          href: '#',
          label: 'Faq',
          icon: 'info',
          keepOnMobile: true,
          slot: slotExample1(),
        },
        {
          href: '/search_page',
          label: 'Search',
          keepOnMobile: true,
          icon: 'search',
          slot: slotExample2(),
        },
        {
          href: '#',
          label: 'Languages',
          icon: 'mic',
          keepOnMobile: true,
          slot: slotExample3(),
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
  },
};

export const NoLinks: Story = {
  args: { fullWidth: false },
};

export const WithMainLinks: Story = {
  args: {
    fullWidth: false,
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
    fullWidth: false,
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
    fullWidth: false,
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
    fullWidth: false,
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
    fullWidth: false,
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
    fullWidth: false,
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
      defaultViewport: 'ipad',
    },
  },
  args: {
    fullWidth: false,
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
    fullWidth: false,
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
    fullWidth: false,
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
    fullWidth: false,
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
      menu: {
        label: 'Menu',
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

export const ShowMobileMenuForLanguages: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile2',
    },
  },
  args: {
    logo: {
      href: '/link',
    },
    languages: [
      {
        href: '#',
        label: 'Gaeilge',
      },
      {
        href: '#',
        label: 'English',
      },
    ],
  },
};
