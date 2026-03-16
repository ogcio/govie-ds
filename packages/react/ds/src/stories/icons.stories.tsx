import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Visibility,
  VisibilityOff,
} from '../icons/index.js';

const meta = {
  title: 'Components/Icons',
  component: Close,
} satisfies Meta<typeof Close>;

export default meta;
type Story = StoryObj<typeof meta>;

type AtomProps = { size?: string | number; className?: string };

type IconEntry = { label: string; Component: ComponentType<AtomProps> };

const mainIconColumns: IconEntry[][] = [
  [
    // { label: 'Placeholder icon' },
    // { label: 'Check circle' },
    // { label: 'Cancel' },
    // { label: 'Block' },
    // { label: 'Remove circle outline' },
    // { label: 'Add circle outline' },
    // { label: 'Error outline' },
    // { label: 'Info' },
    // { label: 'Warning' },
    // { label: 'Check' },
    { label: 'Close', Component: Close },
    // { label: 'Indeterminate' },
    // { label: 'Menu' },
    // { label: 'Apps' },
    // { label: 'Space dashboard' },
    // { label: 'Filter list' },
    // { label: 'Search' },
    // { label: 'Refresh' },
    // { label: 'Email' },
  ],
  [
    // { label: 'Open in new' },
    // { label: 'Settings' },
    // { label: 'Delete' },
    { label: 'Visibility', Component: Visibility },
    { label: 'Visibility off', Component: VisibilityOff },
    // { label: 'Login' },
    // { label: 'Logout' },
    // { label: 'File download' },
    // { label: 'File upload' },
    // { label: 'Edit' },
    // { label: 'Mic' },
    // { label: 'Send' },
    // { label: 'Attach file' },
    // { label: 'More horiz' },
    // { label: 'Location on' },
    // { label: 'Call' },
  ],
  [
    // { label: 'Accessibility new' },
    // { label: 'Event' },
    // { label: 'Chat bubble outline' },
    // { label: 'Child care' },
    // { label: 'Work outline' },
    // { label: 'Health and safety' },
    // { label: 'Person' },
    // { label: 'Person check' },
    // { label: 'Directions car' },
    // { label: 'Home' },
    // { label: 'Credit card' },
    // { label: 'Content copy' },
    // { label: 'Thumb down' },
    // { label: 'Thumb up' },
  ],
];

const arrowIconColumns: IconEntry[][] = [
  [
    // { label: 'Arrow forward' },
    // { label: 'Arrow back' },
    // { label: 'Arrow upward' },
    // { label: 'Arrow downward' },
    // { label: 'Arrow outward' },
  ],
  [
    // { label: 'Keyboard arrow left' },
    // { label: 'Keyboard arrow right' },
    { label: 'Keyboard arrow down', Component: KeyboardArrowDown },
    { label: 'Keyboard arrow up', Component: KeyboardArrowUp },
  ],
  [
    // { label: 'Swap vert' },
    // { label: 'First page' },
    // { label: 'Last page' },
  ],
];

const socialIconColumn: IconEntry[] = [
  // { label: 'Instagram' },
  // { label: 'X' },
  // { label: 'Facebook' },
  // { label: 'Youtube' },
  // { label: 'LinkedIn' },
  // { label: 'Threads' },
  // { label: 'Bluesky' },
  // { label: 'Tiktok' },
];

function IconRow({ label, Component }: IconEntry) {
  return (
    <div className="gi-flex gi-items-center gi-gap-3">
      <span className="gi-flex gi-items-center gi-justify-center gi-w-6 gi-h-6 gi-shrink-0">
        <Component size={24} className="gi-block gi-shrink-0" />
      </span>
      <span className="gi-text-sm gi-text-gray-900">{label}</span>
    </div>
  );
}

function IconColumn({ entries }: { entries: IconEntry[] }) {
  return (
    <div className="gi-flex gi-flex-col gi-gap-3 gi-min-w-48">
      {entries.map((entry) => (
        <IconRow
          key={entry.label}
          label={entry.label}
          Component={entry.Component}
        />
      ))}
    </div>
  );
}

function IconGallerySection({ columns }: { columns: IconEntry[][] }) {
  return (
    <div className="gi-flex gi-gap-12">
      {columns.map((column, index) => (
        <IconColumn key={index} entries={column} />
      ))}
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <div className="gi-bg-gray-50 gi-p-8 gi-flex gi-flex-col gi-gap-16">
      <IconGallerySection columns={mainIconColumns} />
      <IconGallerySection columns={arrowIconColumns} />
      <div className="gi-flex gi-flex-col gi-gap-3">
        {socialIconColumn.map((entry) => (
          <IconRow
            key={entry.label}
            label={entry.label}
            Component={entry.Component}
          />
        ))}
      </div>
    </div>
  ),
};
