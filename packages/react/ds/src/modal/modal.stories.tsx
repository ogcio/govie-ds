import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within, waitFor, screen, userEvent } from 'storybook/test';
import { Button } from '../button/button.js';
import { Paragraph } from '../paragraph/paragraph.js';
import {
  ModalTitle,
  ModalBody,
  ModalFooter,
  Modal,
  ModalWrapper,
} from './modal.js';

const meta = {
  title: 'Application/Modal',
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
          'A modal component that displays content on a button trigger or on page load',
      },
    },
  },
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Utility: evaluate viewMode at render time
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
  render: (arguments_) => {
    const startsOpen = shouldStartOpen();
    return (
      <Modal {...arguments_} startsOpen={startsOpen}>
        <ModalTitle key="title">Modal Title</ModalTitle>
        <ModalBody key="body">
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            esse magnam quis sit soluta cupiditate at deserunt exercitationem
            voluptas doloribus asperiores.
          </Paragraph>
        </ModalBody>
        <ModalFooter key="footer">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Submit</Button>
        </ModalFooter>
      </Modal>
    );
  },
  args: {
    triggerButton: <Button>Open modal</Button>,
    children: <></>,
  },
  play: async ({ step }) => {
    await step(
      'should render the modal on load if startsOpen is true',
      async () => {
        const modalElement = await screen.findByTestId('modal');
        const modalContainerElement =
          await screen.findByTestId('modal-container');
        expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
        expect(Boolean(modalContainerElement)).toBe(true);
      },
    );
  },
};

export const StateControlledModal: Story = {
  tags: ['skip-playwright'],
  args: {
    triggerButton: <></>,
    children: <></>,
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
      <>
        <Button onClick={handleOpen}>Open Modal</Button>
        <ModalWrapper
          dataTestId="test-id"
          isOpen={isOpen}
          onClose={handleClose}
        >
          <ModalTitle key="title">Modal Title</ModalTitle>
          <ModalBody key="body">
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              esse magnam quis sit soluta cupiditate at deserunt exercitationem
              voluptas doloribus asperiores.
            </Paragraph>
          </ModalBody>
          <ModalFooter key="footer">
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary">Save</Button>
          </ModalFooter>
        </ModalWrapper>
      </>
    );
  },
};

export const WithoutFooter: Story = {
  render: (arguments_) => (
    <Modal
      {...arguments_}
      startsOpen={shouldStartOpen()}
      className="gi-w-[600px]"
    >
      <ModalTitle key="title">Modal Title</ModalTitle>
      <ModalBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </ModalBody>
    </Modal>
  ),
  args: { triggerButton: <Button>Open modal</Button>, children: <></> },
};

export const WithLongContent: Story = {
  render: (arguments_) => (
    <Modal
      {...arguments_}
      startsOpen={shouldStartOpen()}
      className="gi-w-[600px]"
    >
      <ModalTitle key="title">Modal Title</ModalTitle>
      <ModalBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Incidunt esse magnam quis sit soluta cupiditate at
          deserunt exercitationem voluptas doloribus asperiores. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Incidunt esse magnam quis
          sit soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Incidunt esse magnam quis sit soluta cupiditate at deserunt
          exercitationem voluptas doloribus asperiores. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Incidunt esse magnam quis sit
          soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Incidunt esse magnam quis sit soluta cupiditate at deserunt
          exercitationem voluptas doloribus asperiores. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Incidunt esse magnam quis sit
          soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Incidunt esse magnam quis sit soluta cupiditate at deserunt
          exercitationem voluptas doloribus asperiores. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Incidunt esse magnam quis sit
          soluta cupiditate at deserunt exercitationem voluptas doloribus
          asperiores. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Incidunt esse magnam quis sit soluta cupiditate at deserunt
          exercitationem voluptas doloribus asperiores.
        </Paragraph>
      </ModalBody>
      <ModalFooter key="footer">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ModalFooter>
    </Modal>
  ),
  args: { triggerButton: <Button>Open modal</Button>, children: <></> },
};

export const WithAllFooterButtonVariants: Story = {
  render: (arguments_) => (
    <Modal {...arguments_} startsOpen={shouldStartOpen()}>
      <ModalTitle key="title">Modal Title</ModalTitle>
      <ModalBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </ModalBody>
      <ModalFooter key="footer">
        <Button variant="flat">Flat</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="primary">Primary</Button>
      </ModalFooter>
    </Modal>
  ),
  args: { triggerButton: <Button>Open modal</Button>, children: <></> },
};

export const ModalNotCloseOnClick: Story = {
  render: (arguments_) => (
    <Modal {...arguments_} startsOpen={shouldStartOpen()} closeOnClick={false}>
      <ModalTitle key="title">Modal Title</ModalTitle>
      <ModalBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </ModalBody>
    </Modal>
  ),
  args: { triggerButton: <Button>Open modal</Button>, children: <></> },
};

export const ModalNotCloseOnOverlayClick: Story = {
  render: (arguments_) => (
    <Modal
      {...arguments_}
      startsOpen={shouldStartOpen()}
      closeOnOverlayClick={false}
    >
      <ModalTitle key="title">Modal Title</ModalTitle>
      <ModalBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </ModalBody>
      <ModalFooter key="footer">
        <Button variant="primary" appearance="dark">
          Primary
        </Button>
      </ModalFooter>
    </Modal>
  ),
  args: { triggerButton: <Button>Open modal</Button>, children: <></> },
};

export const WithCenterLarge: Story = {
  render: (arguments_) => (
    <Modal {...arguments_} startsOpen={shouldStartOpen()} size="lg">
      <ModalTitle key="title">Modal Title</ModalTitle>
      <ModalBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </ModalBody>
      <ModalFooter key="footer">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ModalFooter>
    </Modal>
  ),
  args: { triggerButton: <Button>Open modal</Button>, children: <></> },
};

export const WithCenterMedium: Story = {
  render: (arguments_) => (
    <Modal {...arguments_} startsOpen={shouldStartOpen()} size="md">
      <ModalTitle key="title">Modal Title</ModalTitle>
      <ModalBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </ModalBody>
      <ModalFooter key="footer">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ModalFooter>
    </Modal>
  ),
  args: { triggerButton: <Button>Open modal</Button>, children: <></> },
};

export const WithCenterSmall: Story = {
  render: (arguments_) => (
    <Modal {...arguments_} startsOpen={shouldStartOpen()} size="sm">
      <ModalTitle key="title">Modal Title</ModalTitle>
      <ModalBody key="body">
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt esse
          magnam quis sit soluta cupiditate at deserunt exercitationem voluptas
          doloribus asperiores.
        </Paragraph>
      </ModalBody>
      <ModalFooter key="footer">
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Submit</Button>
      </ModalFooter>
    </Modal>
  ),
  args: { triggerButton: <Button>Open modal</Button>, children: <></> },
};

export const TestOpenOnTriggerAndCloseOnIcon: Story = {
  tags: ['skip-playwright'],
  args: {
    startsOpen: false,
    triggerButton: <Button>Open modal</Button>,
    children: [
      <ModalTitle key="title">Modal Title</ModalTitle>,
      <ModalBody key="body">
        <Paragraph>Body</Paragraph>
      </ModalBody>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should open the modal on button trigger', async () => {
      const triggerButtonElement = canvas.getByTestId(
        'modal-trigger-button-container',
      );
      triggerButtonElement.click();
      await waitFor(() => {
        const modalElement = document.querySelector('[data-testid="modal"]');
        expect(Boolean(modalElement)).toBe(true);
        if (modalElement) {
          expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
        }
      });
    });

    await step('should close the modal on icon click', async () => {
      const modalElement = await screen.findByTestId('modal');
      const triggerButtonElement = screen.getByTestId(
        'modal-trigger-button-container',
      );
      const closeButton = await screen.findByRole('button', {
        name: 'Close modal',
      });
      await userEvent.click(closeButton);
      expect(modalElement.classList.contains('gi-modal-open')).toBe(false);

      triggerButtonElement.click();

      await waitFor(() => {
        expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
      });

      const modalContainerElement = screen.getByTestId('modal-container');
      const iconElement = modalContainerElement.querySelector(
        '.gi-modal-icon',
      ) as HTMLElement;
      expect(iconElement).toBeVisible();
      iconElement.click();
    });
  },
};

export const TestCloseOnOverlayClick: Story = {
  tags: ['skip-playwright'],
  args: {
    startsOpen: false,
    triggerButton: <Button>Open modal</Button>,
    children: [
      <ModalTitle key="title">Modal Title</ModalTitle>,
      <ModalBody key="body">
        <Paragraph>Body</Paragraph>
      </ModalBody>,
    ],
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should close the modal on overlay click', async () => {
      const triggerButtonElement = canvas.getByTestId(
        'modal-trigger-button-container',
      );
      triggerButtonElement.click();

      let modalElement = await screen.findByTestId('modal');

      await waitFor(() => {
        expect(modalElement.classList.contains('gi-modal-open')).toBe(true);
      });

      await userEvent.click(modalElement);

      modalElement = await screen.findByTestId('modal');

      await waitFor(() => {
        expect(modalElement.classList.contains('gi-modal-open')).toBe(false);
      });
    });
  },
};

export const TestFooterButtonsOrder: Story = {
  tags: ['skip-playwright'],
  render: (arguments_) => (
    <Modal
      {...arguments_}
      dataTestId="modal-footer"
      startsOpen={shouldStartOpen()}
    >
      <ModalTitle key="title">Modal Title</ModalTitle>
      <ModalBody key="body">
        <Paragraph>Body</Paragraph>
      </ModalBody>
      <ModalFooter key="footer">
        <Button variant="flat">Help</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save</Button>
      </ModalFooter>
    </Modal>
  ),
  args: {
    triggerButton: <Button>Open modal</Button>,
    children: <></>,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should render modal footer buttons in correct order',
      async () => {
        const triggerButtonElement = canvas.getByTestId(
          'modal-trigger-button-container',
        );
        triggerButtonElement.click();

        await waitFor(() => {
          const footerContainerElement = screen.getByTestId('modal-footer');
          const footerButtonsNodeList =
            footerContainerElement.querySelectorAll('button');
          expect(footerButtonsNodeList).toHaveLength(4);
          const footerButtons = [...footerButtonsNodeList];
          expect(footerButtons[0].textContent).toBe('close');
          expect(footerButtons[1].textContent).toBe('Help');
          expect(footerButtons[2].textContent).toBe('Cancel');
          expect(footerButtons[3].textContent).toBe('Save');
        });
      },
    );
  },
};
