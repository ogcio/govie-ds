import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header.js';

const meta = {
  title: 'layout/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    // searchUrl: {
    //   description: 'The url for the search page',
    // },
    navLinks: {
      description: 'A list of navigation links',
    },
    languages: {
      description: 'A list of secondary navigation links',
    },
  },
  args: {
    logo: {
      href: '/link',
    },
    tools: {
      search: {
        action: '/search_page',
        icon: 'thumb_up'
        // label: 'Enter search term'
      }
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

// export const NoLinks: Story = {
//   args: {
//     searchUrl: '/seach_page',
//     logoLink: '/path',
//   },
// };

// export const WithMainLinks: Story = {
//   args: {
//     searchUrl: '/seach_page',
//     logoLink: '/path',
//     navLinks: [
//       {
//         href: '#',
//         label: 'News',
//       },
//       {
//         href: '#',
//         label: 'Departments',
//       },
//       {
//         href: '#',
//         label: 'Services',
//       },
//     ],
//   },
// };

// export const WithNoSearch: Story = {
//   args: {
//     logoLink: '/path',
//     navLinks: [
//       {
//         href: '#',
//         label: 'News',
//       },
//       {
//         href: '#',
//         label: 'Departments',
//       },
//       {
//         href: '#',
//         label: 'Services',
//       },
//     ],
//   },
// };

// export const WithSecondaryLinks: Story = {
//   args: {
//     searchUrl: '/seach_page',
//     logoLink: '/path',
//     languages: [
//       {
//         href: '#',
//         label: 'English',
//       },
//       {
//         href: '#',
//         label: 'Gaeilge',
//       },
//     ],
//   },
// };

// export const withMainAndSecondaryLinks: Story = {
//   args: {
//     searchUrl: '/seach_page',
//     logoLink: '/path',
//     navLinks: [
//       {
//         href: '#',
//         label: 'News',
//       },
//       {
//         href: '#',
//         label: 'Departments',
//       },
//       {
//         href: '#',
//         label: 'Services',
//       },
//     ],
//     languages: [
//       {
//         href: '#',
//         label: 'English',
//       },
//       {
//         href: '#',
//         label: 'Gaeilge',
//       },
//     ],
//   },
// };

// export const tabletView: Story = {
//   parameters: {
//     layout: 'fullscreen',
//     viewport: {
//       defaultViewport: 'pixel',
//     },
//   },
//   args: {
//     searchUrl: '/seach_page',
//     logoLink: '/path',
//     navLinks: [
//       {
//         href: '#',
//         label: 'News',
//       },
//       {
//         href: '#',
//         label: 'Departments',
//       },
//       {
//         href: '#',
//         label: 'Services',
//       },
//     ],
//     languages: [
//       {
//         href: '#',
//         label: 'English',
//       },
//       {
//         href: '#',
//         label: 'Gaeilge',
//       },
//     ],
//   },
// };

// export const mobileView: Story = {
//   parameters: {
//     layout: 'fullscreen',
//     viewport: {
//       defaultViewport: 'mobile2',
//     },
//   },
//   args: {
//     searchUrl: '/seach_page',
//     logoLink: '/path',
//     navLinks: [
//       {
//         href: '#',
//         label: 'News',
//       },
//       {
//         href: '#',
//         label: 'Departments',
//       },
//       {
//         href: '#',
//         label: 'Services',
//       },
//     ],
//     languages: [
//       {
//         href: '#',
//         label: 'English',
//       },
//       {
//         href: '#',
//         label: 'Gaeilge',
//       },
//     ],
//   },
// };
