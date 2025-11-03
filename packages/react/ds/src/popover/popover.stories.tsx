import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../button/button.js';
import { SelectMenu, SelectMenuOption } from '../select/select-menu.js';
import { Popover } from './popover.js';

const meta = {
  title: 'Application/Popover',
  component: Popover,
  parameters: {
    docs: {
      description: {
        component:
          'Popover is a floating panel that appears next to a reference element. It is positioned using Popper.js and supports external triggers.',
      },
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
    onOpenChange: () => null,
    open: false,
    triggerRef: null,
  },
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null!);
    const [open, setOpen] = useState(false);

    return (
      <div className="gi-h-20">
        <Button ref={triggerRef} onClick={() => setOpen(!open)}>
          Open Popover
        </Button>

        <Popover triggerRef={triggerRef} open={open} onOpenChange={setOpen}>
          <div className="gi-text-sm gi-text-gray-800 gi-p-6">
            This is a popover content
          </div>
        </Popover>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const popoverContent = canvas.queryByText('This is a popover content');
    await expect(popoverContent).not.toBeInTheDocument();

    const triggerButton = await canvas.findByRole('button', {
      name: /Open Popover/i,
    });
    await userEvent.click(triggerButton);

    const openPopoverContent = await canvas.findByText(
      'This is a popover content',
    );
    await expect(openPopoverContent).toBeVisible();
  },
};

export const WithSelectMenu: Story = {
  args: {
    children: null,
    onOpenChange: () => null,
    open: false,
    triggerRef: null,
  },
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null!);
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('JP');
    const options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: '4' },
    ];

    return (
      <div className="gi-h-56">
        <Button ref={triggerRef} onClick={() => setOpen(!open)}>
          Open Popover
        </Button>
        <Popover triggerRef={triggerRef} open={open} onOpenChange={setOpen}>
          <SelectMenu onChange={setSelectedValue} enableSearch>
            {options.map(({ value, label }, index) => (
              <SelectMenuOption
                key={`${label}-${value}`}
                value={value}
                selected={selectedValue === value}
                index={index}
              >
                {label}
              </SelectMenuOption>
            ))}
          </SelectMenu>
        </Popover>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const popoverContent = canvas.queryByText('This is a popover content');
    await expect(popoverContent).not.toBeInTheDocument();

    const triggerButton = await canvas.findByRole('button', {
      name: /Open Popover/i,
    });
    await userEvent.click(triggerButton);
  },
};

export const Test: Story = {
  args: {
    children: null,
    onOpenChange: () => null,
    open: false,
    triggerRef: null,
  },
  render: () => {
    const triggerRef = useRef<HTMLButtonElement>(null!);
    const [open, setOpen] = useState(false);

    return (
      <div className="gi-h-20">
        <Button ref={triggerRef} onClick={() => setOpen(!open)}>
          Open Popover
        </Button>

        <Popover triggerRef={triggerRef} open={open} onOpenChange={setOpen}>
          <div className="gi-text-sm gi-text-gray-800 gi-p-6">
            This is a popover content
          </div>
        </Popover>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const popoverContent = canvas.queryByText('This is a popover content');
    await expect(popoverContent).not.toBeInTheDocument();

    const triggerButton = await canvas.findByRole('button', {
      name: /Open Popover/i,
    });
    await userEvent.click(triggerButton);

    const openPopoverContent = await canvas.findByText(
      'This is a popover content',
    );
    await expect(openPopoverContent).toBeVisible();
    await userEvent.click(document.body);

    await expect(openPopoverContent).not.toBeInTheDocument();

    await userEvent.click(triggerButton);
    const reOpenPopoverContent = await canvas.findByText(
      'This is a popover content',
    );
    await expect(reOpenPopoverContent).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect(reOpenPopoverContent).not.toBeInTheDocument();
  },
};
