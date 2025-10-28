import type { Meta, StoryObj } from '@storybook/react';
import { within, expect, waitFor, screen, userEvent } from 'storybook/test';
import { Button } from '../button/button.js';
import { Paragraph } from '../paragraph/paragraph.js';
import { DrawerMenuExample } from './drawer.content.js';
import { Drawer, DrawerBody, DrawerFooter } from './drawer.js';

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
  component: Drawer,
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    layout: 'fullscreen',
  },
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
    closeButtonSize: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'Size of the close button.',
      table: {
        type: { summary: "'small' | 'medium' | 'large'" },
        defaultValue: { summary: 'medium' },
      },
    },
    startsOpen: {
      control: 'boolean',
      description: 'If true, the drawer starts open.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    closeButtonLabel: {
      control: 'text',
      description: 'Accessible label for the close button.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Close' },
      },
    },
    triggerButton: {
      control: false,
      description:
        'Trigger element used to open the drawer. It is cloned to inject an onClick.',
      table: { type: { summary: 'ReactElement' } },
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
  args: {
    closeButtonSize: 'medium',
    dataTestId: 'drawer',
    startsOpen: true,
    triggerButton: <Button>Open drawer</Button>,
    closeButtonLabel: 'Close',
    children: [
      <DrawerBody
        key="body"
        className="gi-border-t-xs gi-border-color-border-system-neutral-subtle"
      >
        <DrawerMenuExample />
      </DrawerBody>,
      <DrawerFooter key="footer">
        <Button
          variant="secondary"
          appearance="dark"
          className="gi-justify-center xs:gi-justify-start"
        >
          Cancel
        </Button>
        <Button className="gi-justify-center xs:gi-justify-start">
          Primary
        </Button>
      </DrawerFooter>,
    ],
  },
  play: async ({ step }) => {
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    await step(
      'should render the drawer on load if startsOpen is true',
      async () => {
        const modalElement = await screen.findByTestId('modal');
        const modalContainerElement =
          await screen.findByTestId('modal-container');
        expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
        expect(modalContainerElement).toBeTruthy();
      },
    );
  },
};

export const DrawerRight: Story = {
  argTypes: {},
  args: {
    triggerButton: <Button>Open drawer</Button>,
    startsOpen: true,
    children: [
      <DrawerBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </DrawerBody>,
      <DrawerFooter key="footer">
        <div className="gi-flex gi-flex-col-reverse gi-gap-4 xs:gi-gap-6 xs:gi-justify-end xs:gi-flex-row">
          <Button
            variant="secondary"
            appearance="dark"
            className="gi-justify-center xs:gi-justify-start"
          >
            Cancel
          </Button>
          <Button className="gi-justify-center xs:gi-justify-start">
            Primary
          </Button>
        </div>
      </DrawerFooter>,
    ],
  },
} as unknown as Story;

export const DrawerLeft: Story = {
  args: {
    position: 'left',
    triggerButton: <Button>Open drawer</Button>,
    startsOpen: true,
    children: [
      <DrawerBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </DrawerBody>,
      <DrawerFooter key="footer">
        <div className="gi-flex gi-flex-col-reverse gi-gap-4 xs:gi-gap-6 xs:gi-justify-end xs:gi-flex-row">
          <Button
            variant="secondary"
            appearance="dark"
            className="gi-justify-center xs:gi-justify-start"
          >
            Cancel
          </Button>
          <Button className="gi-justify-center xs:gi-justify-start">
            Primary
          </Button>
        </div>
      </DrawerFooter>,
    ],
  },
};

export const DrawerBottom: Story = {
  args: {
    position: 'bottom',
    triggerButton: <Button>Open drawer</Button>,
    startsOpen: true,
    children: [
      <DrawerBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </DrawerBody>,
      <DrawerFooter key="footer">
        <div className="gi-flex gi-flex-col-reverse gi-gap-4 xs:gi-gap-6 xs:gi-justify-end xs:gi-flex-row">
          <Button
            variant="secondary"
            appearance="dark"
            className="gi-justify-center xs:gi-justify-start"
          >
            Cancel
          </Button>
          <Button className="gi-justify-center xs:gi-justify-start">
            Primary
          </Button>
        </div>
      </DrawerFooter>,
    ],
  },
};

export const DrawerMenuTablet: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  globals: { viewport: { value: 'tablet' } },
  args: {
    triggerButton: <Button>Open drawer</Button>,
    startsOpen: true,
    closeButtonLabel: 'Close',
    children: [
      <DrawerBody
        key="body"
        className="gi-border-t-xs gi-border-color-border-system-neutral-subtle"
      >
        <DrawerMenuExample />
      </DrawerBody>,
      <DrawerFooter key="footer">
        <Button
          variant="secondary"
          appearance="dark"
          className="gi-justify-center xs:gi-justify-start"
        >
          Cancel
        </Button>
        <Button className="gi-justify-center xs:gi-justify-start">
          Primary
        </Button>
      </DrawerFooter>,
    ],
  },
};

export const DrawerMenuMobile: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  globals: { viewport: { value: 'mobile1' } },
  args: {
    triggerButton: <Button>Open drawer</Button>,
    startsOpen: true,
    closeButtonLabel: 'Close',
    children: [
      <DrawerBody
        key="body"
        className="gi-border-t-xs gi-border-color-border-system-neutral-subtle"
      >
        <DrawerMenuExample />
      </DrawerBody>,
      <DrawerFooter key="footer">
        <Button
          variant="secondary"
          appearance="dark"
          className="gi-justify-center xs:gi-justify-start"
        >
          Cancel
        </Button>
        <Button className="gi-justify-center xs:gi-justify-start">
          Primary
        </Button>
      </DrawerFooter>,
    ],
  },
};

export const DesktopButtonStacked: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    startsOpen: true,
    closeButtonSize: 'large',
    triggerButton: <Button>Open drawer</Button>,
    closeButtonLabel: 'Close',
    children: [
      <DrawerBody
        key="body"
        className="gi-border-t-xs gi-border-color-border-system-neutral-subtle"
      >
        <DrawerMenuExample />
      </DrawerBody>,
      <DrawerFooter key="footer" stacked>
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
      </DrawerFooter>,
    ],
  },
};

export const TestOpenCloseInteractions: Story = {
  tags: ['skip-playwright'],
  args: {
    startsOpen: false,
    triggerButton: <Button>Open drawer</Button>,
    children: [
      <DrawerBody key="body">
        <Paragraph>Here is the body content of the drawer.</Paragraph>
      </DrawerBody>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should open the drawer on button trigger', async () => {
      const triggerButtonElement = await canvas.findByTestId(
        'drawer-trigger-button-container',
      );
      await userEvent.click(triggerButtonElement);
      await waitFor(() => {
        const modalElement = screen.getByTestId('modal');
        expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
      });
    });

    await step('should close the drawer on icon click', async () => {
      const modalContainerElement =
        await screen.findByTestId('modal-container');
      const iconElement = modalContainerElement.querySelector('.gi-modal-icon');
      expect(iconElement).toBeTruthy();
      await userEvent.click(iconElement as Element);
      await waitFor(() => {
        const modalElement = screen.getByTestId('modal');
        expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
      });
    });

    await step('should close the drawer on overlay click', async () => {
      const triggerButtonElement = await canvas.findByTestId(
        'drawer-trigger-button-container',
      );
      await userEvent.click(triggerButtonElement);
      await waitFor(() => {
        const modalElement = screen.getByTestId('modal');
        expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
      });
      const modalElement = await screen.findByTestId('modal');
      await userEvent.click(modalElement);
      await waitFor(() => {
        const element = screen.getByTestId('modal');
        expect(element.classList.contains('gi-modal-open')).toBe(false);
      });
    });
  },
};
