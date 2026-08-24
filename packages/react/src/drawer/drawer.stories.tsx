import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentType } from 'react';
import { useState } from 'react';
import { within, expect, waitFor, screen, userEvent } from 'storybook/test';
import Button from '@/atoms/Button';
import Paragraph from '@/atoms/Paragraph';
import { DrawerMenuExample } from './drawer.content.js';
import { Drawer, DrawerBody, DrawerFooter, type DrawerProps } from './drawer.js';
import Stack from '@/atoms/Stack.js';
import Heading from '@/Heading.js';
import Divider from '@/Divider.js';

type DrawerStoryProps = Extract<DrawerProps, { open: boolean }>;

const meta = {
  title: 'Application/Drawer',
  decorators: (Story) => (
    <div className="gi-h-[600px]">
      <Story />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The Drawer component is a sliding panel for additional content, supporting both left and right positions.',
      },
    },
  },
  component: Drawer as ComponentType<DrawerStoryProps>,
  argTypes: {
    position: {
      control: 'radio',
      options: ['left', 'right', 'bottom'],
      description: 'Where the drawer slides in from.',
      table: {
        type: { summary: "'left' | 'right' | 'bottom'" },
        defaultValue: { summary: 'right' },
      },
    },
    open: {
      required: true,
      description:
        'Controls the open/closed state of the drawer. Use with `onClose` and local state instead of `startsOpen` and `triggerButton`.',
      table: {
        type: { summary: 'boolean' },
      },
      control: false,
      type: { name: 'boolean', required: true },
    },
    onClose: {
      required: true,
      control: false,
      description:
        'Callback fired when the drawer is closed. Used together with the controlled `open` prop to manage drawer state externally.',
      table: {
        type: { summary: '() => void' },
      },
      type: { name: 'function', required: true },
    },
    triggerButton: {
      control: false,
      description:
        '**Deprecated** - use `open` and `onClose` instead. Trigger element used to open the drawer. It is cloned to inject an onClick.',
      table: { type: { summary: 'ReactElement' } },
    },
    closeButtonLabel: {
      control: 'text',
      description: 'Accessible label for the close button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Close' },
      },
    },
    children: {
      control: false,
      description:
        'An ordered set of `DrawerBody` and/or `DrawerFooter` components that compose the drawer content.\n' +
        '- `DrawerBody`: main scrollable content area.\n' +
        '- `DrawerFooter`: action area (buttons/links); supports `stacked` layout.\n',
      table: {
        type: {
          summary: 'DrawerBody | DrawerFooter',
        },
      },
    },
  },
} satisfies Meta<DrawerStoryProps>;

export default meta;
type Story = StoryObj<DrawerStoryProps>;

const shouldStartOpen = () => {
  try {
    const parameters = new URLSearchParams(globalThis.location.search);
    const viewMode = parameters.get('viewMode');
    const path = parameters.get('path') || '';

    return viewMode === 'story' || (!viewMode && !path.includes('--docs'));
  } catch {
    return true;
  }
};

export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    closeButtonLabel: 'Close',
  },
  render: function Render(props) {
    const [isOpen, setIsOpen] = useState(shouldStartOpen());

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
        <Drawer
          {...props}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <DrawerBody key="body" className="gi-border-t-xs gi-border-color-border-system-neutral-subtle">
            <DrawerMenuExample />
          </DrawerBody>
          <DrawerFooter key="footer">
            <Button variant="secondary" appearance="dark" className="gi-justify-center xs:gi-justify-start">
              Cancel
            </Button>
            <Button className="gi-justify-center xs:gi-justify-start">Primary</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
  play: async ({ step }) => {
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    await step('should render the drawer on load if startsOpen is true', async () => {
      const modalElement = await screen.findByTestId('modal');
      const modalContainerElement = await screen.findByTestId('modal-container');
      expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
      expect(modalContainerElement).toBeTruthy();
    });
  },
};

export const DrawerRight: Story = {
  render: function Render(props) {
    const [isOpen, setIsOpen] = useState(shouldStartOpen());

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
        <Drawer
          {...props}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <DrawerBody key="body">
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse magnam quis sit soluta cupiditate
              at deserunt exercitationem voluptas doloribus asperiores.
            </Paragraph>
          </DrawerBody>
          <DrawerFooter key="footer">
            <div className="gi-flex gi-flex-col-reverse gi-gap-4 xs:gi-gap-6 xs:gi-justify-end xs:gi-flex-row">
              <Button variant="secondary" appearance="dark" className="gi-justify-center xs:gi-justify-start">
                Cancel
              </Button>
              <Button className="gi-justify-center xs:gi-justify-start">Primary</Button>
            </div>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const DrawerLeft: Story = {
  args: {
    position: 'left',
  },
  render: function Render(props) {
    const [isOpen, setIsOpen] = useState(shouldStartOpen());

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
        <Drawer
          {...props}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <DrawerBody key="body">
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse magnam quis sit soluta cupiditate
              at deserunt exercitationem voluptas doloribus asperiores.
            </Paragraph>
          </DrawerBody>
          <DrawerFooter key="footer">
            <div className="gi-flex gi-flex-col-reverse gi-gap-4 xs:gi-gap-6 xs:gi-justify-end xs:gi-flex-row">
              <Button variant="secondary" appearance="dark" className="gi-justify-center xs:gi-justify-start">
                Cancel
              </Button>
              <Button className="gi-justify-center xs:gi-justify-start">Primary</Button>
            </div>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const DrawerBottom: Story = {
  args: {
    position: 'bottom',
  },
  render: function Render(props) {
    const [isOpen, setIsOpen] = useState(shouldStartOpen());

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
        <Drawer
          {...props}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <DrawerBody key="body">
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse magnam quis sit soluta cupiditate
              at deserunt exercitationem voluptas doloribus asperiores.
            </Paragraph>
          </DrawerBody>
          <DrawerFooter key="footer">
            <div className="gi-flex gi-flex-col-reverse gi-gap-4 xs:gi-gap-6 xs:gi-justify-end xs:gi-flex-row">
              <Button variant="secondary" appearance="dark" className="gi-justify-center xs:gi-justify-start">
                Cancel
              </Button>
              <Button className="gi-justify-center xs:gi-justify-start">Primary</Button>
            </div>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const DrawerMenuTablet: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  globals: { viewport: { value: 'tablet' } },
  args: {
    closeButtonLabel: 'Close',
  },
  render: function Render(props) {
    const [isOpen, setIsOpen] = useState(shouldStartOpen());

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
        <Drawer
          {...props}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <DrawerBody key="body" className="gi-border-t-xs gi-border-color-border-system-neutral-subtle">
            <DrawerMenuExample />
          </DrawerBody>
          <DrawerFooter key="footer">
            <Button variant="secondary" appearance="dark" className="gi-justify-center xs:gi-justify-start">
              Cancel
            </Button>
            <Button className="gi-justify-center xs:gi-justify-start">Primary</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const DrawerMenuMobile: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  globals: { viewport: { value: 'mobile1' } },
  args: {
    closeButtonLabel: 'Close',
  },
  render: function Render(props) {
    const [isOpen, setIsOpen] = useState(shouldStartOpen());

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
        <Drawer
          {...props}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <DrawerBody key="body" className="gi-border-t-xs gi-border-color-border-system-neutral-subtle">
            <DrawerMenuExample />
          </DrawerBody>
          <DrawerFooter key="footer">
            <Button variant="secondary" appearance="dark" className="gi-justify-center xs:gi-justify-start">
              Cancel
            </Button>
            <Button className="gi-justify-center xs:gi-justify-start">Primary</Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

export const DesktopButtonStacked: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    closeButtonLabel: 'Close',
  },
  render: function Render(props) {
    const [isOpen, setIsOpen] = useState(shouldStartOpen());

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
        <Drawer
          {...props}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <DrawerBody key="body" className="gi-border-t-xs gi-border-color-border-system-neutral-subtle">
            <DrawerMenuExample />
          </DrawerBody>
          <DrawerFooter stacked key="footer">
            <Button>Primary</Button>
            <Button variant="secondary" appearance="dark">
              Cancel
            </Button>
            <Button variant="secondary" appearance="dark">
              Cancel
            </Button>
            <Button variant="secondary" appearance="dark">
              Cancel
            </Button>
          </DrawerFooter>
        </Drawer>
      </>
    );
  },
};

const drawerOpen = (drawer: HTMLElement) => drawer.classList.contains('gi-modal-open');

export const TestOpenCloseInteractions: Story = {
  tags: ['skip-playwright', 'interaction'],

  render: function Render(props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Stack gap={2}>
        <Heading as="h4">Controlled</Heading>
        <Button dataTestId="controlled-trigger" onClick={() => setIsOpen(true)}>
          Open drawer
        </Button>
        <Drawer
          {...props}
          dataTestId="controlled-drawer"
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <DrawerBody key="body">
            <Paragraph>Here is the body content of the drawer.</Paragraph>
          </DrawerBody>
        </Drawer>
        <Divider />
        <Heading as="h4">Uncontrolled</Heading>
        <Drawer
          dataTestId="uncontrolled-drawer"
          triggerButton={<Button dataTestId="uncontrolled-trigger">Open Drawer</Button>}
        >
          <DrawerBody key="body">
            <Paragraph>Here is the body content of the drawer.</Paragraph>
          </DrawerBody>
        </Drawer>
      </Stack>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const controlledTrigger = canvas.getByTestId('controlled-trigger');
    const uncontrolledTrigger = canvas.getByTestId('uncontrolled-trigger');

    await step('Controlled should open the drawer on button trigger', async () => {
      await userEvent.click(controlledTrigger);
      const controlledDrawer = screen.getByTestId('controlled-drawer');
      await waitFor(() => {
        expect(drawerOpen(controlledDrawer)).toBe(true);
      });
    });

    await step('Controlled should close the drawer on icon click', async () => {
      const controlledDrawer = screen.getByTestId('controlled-drawer');
      const iconElement = controlledDrawer.querySelector('.gi-modal-icon');
      expect(iconElement).toBeTruthy();
      await userEvent.click(iconElement as Element);
      await waitFor(() => {
        expect(drawerOpen(controlledDrawer)).toBe(false);
      });
    });

    await step('Controlled should close the drawer on overlay click', async () => {
      await userEvent.click(controlledTrigger);
      const controlledDrawer = screen.getByTestId('controlled-drawer');
      await waitFor(() => {
        expect(drawerOpen(controlledDrawer)).toBe(true);
      });
      await userEvent.click(controlledDrawer);
      await waitFor(() => {
        expect(drawerOpen(controlledDrawer)).toBe(false);
      });
    });

    await step('Legacy uncontrolled method should still open/close the drawer', async () => {
      await userEvent.click(uncontrolledTrigger);
      const uncontrolledDrawer = screen.getByTestId('uncontrolled-drawer');
      await waitFor(() => {
        expect(drawerOpen(uncontrolledDrawer)).toBe(true);
      });

      const iconElement = uncontrolledDrawer.querySelector('.gi-modal-icon');
      expect(iconElement).toBeTruthy();
      await userEvent.click(iconElement as Element);
      await waitFor(() => {
        expect(drawerOpen(uncontrolledDrawer)).toBe(false);
      });
    });
  },
};
