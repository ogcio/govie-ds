import type { Meta, StoryObj } from '@storybook/react';
import { waitFor } from 'storybook/test';
import { Button } from '../button/button.js';
import { sleep } from '../test-utilities.js';
import { AccordionItem } from './accordion-item.js';
import { Accordion, AccordionProps } from './accordion.js';

const meta = {
  title: 'Layout/Accordion',
  parameters: {
    docs: {
      description: {
        component: 'Accordion component',
      },
    },
  },
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;

const headerByText = (root: HTMLElement, text: string) => {
  const headers = [
    ...root.querySelectorAll<HTMLElement>('.gi-accordion-header'),
  ];
  return headers.find((h) => h.textContent?.includes(text)) ?? null;
};

const itemRootFromHeader = (h: HTMLElement | null) =>
  (h && h.closest<HTMLElement>('.gi-accordion')) || null;

const panelFromItemRoot = (root: HTMLElement | null) =>
  (root?.nextElementSibling as HTMLElement | null) ?? null;

const isVisible = (element: HTMLElement | null) =>
  !!element && globalThis.getComputedStyle(element).display !== 'none';

export const Default = {
  argTypes: {
    children: {
      control: 'array', // `children` is expected to be an array of React elements
      description:
        'The content that will be inserted into the accordion (AccordionItem components)',
      table: {
        type: { summary: 'React.ReactElement<typeof AccordionItem>[]' },
      },
    },
    iconStart: {
      control: 'boolean',
      description:
        'Indicates whether icons should appear on the left (true) or the right (false) of the accordion label.',
    },
    dataTestid: {
      control: 'text',
      description: 'Custom test id for the Accordion component.',
    },
    variant: {
      control: 'radio',
      options: ['default', 'small'],
      description:
        'Defines the padding and style for the Accordion (default or small)',
    },
  },
  render: (props: AccordionProps) => (
    <Accordion {...props}>
      <AccordionItem label="What is the Citizens Information Service?">
        The Citizens Information Service provides information on public services
        and entitlements. It helps citizens access services like social welfare,
        health services, and more.
      </AccordionItem>
      <AccordionItem label="How can I apply for social welfare benefits?">
        To apply for social welfare benefits, you need to fill out an
        application form, provide necessary documentation, and submit it online
        or at your local office.
      </AccordionItem>
      <AccordionItem label="How do I get a public service card?">
        To obtain a public service card, you need to visit a local service
        center with identification documents and proof of address.
      </AccordionItem>
      <AccordionItem
        disabled
        label="Can I get financial assistance during a crisis?"
      >
        <Button>Learn More About Financial Assistance</Button>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement, step }: any) => {
    await step('renders multiple items', async () => {
      const h1 = headerByText(
        canvasElement,
        'What is the Citizens Information Service?',
      );
      const h2 = headerByText(
        canvasElement,
        'How can I apply for social welfare benefits?',
      );
      if (!h1 || !h2) {
        throw new Error('Expected primary accordion headers not found');
      }
    });

    await step('iconStart is NOT applied by default', async () => {
      const firstHeader = headerByText(
        canvasElement,
        'What is the Citizens Information Service?',
      );
      const itemRoot = itemRootFromHeader(firstHeader);
      const iconStart = itemRoot?.dataset.iconStart;
      if (iconStart === 'true') {
        throw new Error('iconStart should not be true by default');
      }
    });

    await step('toggles an enabled item', async () => {
      const header = headerByText(
        canvasElement,
        'How can I apply for social welfare benefits?',
      );
      const root = itemRootFromHeader(header);
      const panel = panelFromItemRoot(root);
      if (!header || !root || !panel) {
        throw new Error('Missing parts for enabled item');
      }

      if (isVisible(panel)) {
        throw new Error('Panel should start hidden');
      }

      header.click();
      await waitFor(() => isVisible(panel));
      header.click();
      await waitFor(() => !isVisible(panel));
    });

    await step('disabled item does not toggle', async () => {
      const disabledHeader = headerByText(
        canvasElement,
        'Can I get financial assistance during a crisis?',
      );
      const root = itemRootFromHeader(disabledHeader);
      const panel = panelFromItemRoot(root);
      if (!disabledHeader || !root || !panel) {
        throw new Error('Missing parts for disabled item');
      }

      if (root.dataset.disabled !== 'true') {
        throw new Error('Expected data-disabled="true"');
      }

      const beforeVisible = isVisible(panel);
      disabledHeader.click();
      await sleep(100); // give time for any unintended state update
      const afterVisible = isVisible(panel);

      if (beforeVisible !== afterVisible) {
        throw new Error('Disabled item should not change visibility on click');
      }
    });
  },
};

export const SmallVariant = {
  args: {
    variant: 'small',
  },
  render: (props: AccordionProps) => (
    <Accordion {...props}>
      <AccordionItem label="What is the Citizens Information Service?">
        The Citizens Information Service provides information on public services
        and entitlements. It helps citizens access services like social welfare,
        health services, and more.
      </AccordionItem>
      <AccordionItem label="How can I apply for social welfare benefits?">
        To apply for social welfare benefits, you need to fill out an
        application form, provide necessary documentation, and submit it online
        or at your local office.
      </AccordionItem>
      <AccordionItem label="How do I get a public service card?">
        To obtain a public service card, you need to visit a local service
        center with identification documents and proof of address.
      </AccordionItem>
      <AccordionItem
        disabled
        label="Can I get financial assistance during a crisis?"
      >
        <Button>Learn More About Financial Assistance</Button>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithIconStart: StoryObj = {
  render: () => (
    <Accordion iconStart={true}>
      <AccordionItem label="Label 1">
        This is a content paragraph paragraph
      </AccordionItem>
      <AccordionItem label="Label 2">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores minus
        eveniet ex officiis accusantium sint eius deleniti cumque? Iste
        voluptatum omnis harum quaerat eius praesentium a at perferendis
        quisquam hic.
      </AccordionItem>
      <AccordionItem label="Label 3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores minus
        eveniet ex officiis accusantium sint eius deleniti cumque? Iste
        voluptatum omnis harum quaerat eius praesentium a at perferendis
        quisquam hic.
      </AccordionItem>
      <AccordionItem disabled label="Label 4">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores minus
        eveniet ex officiis accusantium sint eius deleniti cumque? Iste
        voluptatum omnis harum quaerat eius praesentium a at perferendis
        quisquam hic.
      </AccordionItem>
      <AccordionItem disabled label="Label 5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores minus
        eveniet ex officiis accusantium sint eius deleniti cumque? Iste
        voluptatum omnis harum quaerat eius praesentium a at perferendis
        quisquam hic.
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement, step }) => {
    await step('iconStart is applied', async () => {
      const firstHeader = headerByText(canvasElement, 'Label 1');
      const itemRoot = itemRootFromHeader(firstHeader);
      const iconStart = itemRoot?.dataset.iconStart;
      if (iconStart !== 'true') {
        throw new Error(
          'Expected data-icon-start="true" when iconStart is enabled',
        );
      }
    });
  },
};

export const TestRenderBasic: StoryObj = {
  tags: ['skip-playwright'],
  render: () => (
    <Accordion>
      <AccordionItem label="Label1">
        <h1>This is the content Heading 1</h1>
        <p>This is a content paragraph paragraph 1</p>
      </AccordionItem>
      <AccordionItem label="Label2">
        <h1>This is the content Heading 2</h1>
        <p>This is a content paragraph paragraph 2</p>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement, step }) => {
    await step('renders accordion with all items', async () => {
      const h1 = headerByText(canvasElement, 'Label1');
      const h2 = headerByText(canvasElement, 'Label2');
      if (!h1 || !h2) {
        throw new Error('Label1/Label2 not found');
      }
    });
  },
};

export const TestToggle: StoryObj = {
  tags: ['skip-playwright'],
  render: () => (
    <Accordion>
      <AccordionItem label="Label1">
        <p>This is the content for Label1</p>
      </AccordionItem>
      <AccordionItem label="Label2">
        <p>This is the content for Label2</p>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement, step }) => {
    await step('toggle Label1 visibility on click', async () => {
      const header = headerByText(canvasElement, 'Label1');
      const root = itemRootFromHeader(header);
      const panel = panelFromItemRoot(root);
      if (!header || !root || !panel) {
        throw new Error('Missing parts for Label1');
      }

      if (isVisible(panel)) {
        throw new Error('Expected Label1 panel not visible initially');
      }

      header.click();
      await waitFor(() => isVisible(panel));

      header.click();
      await waitFor(() => !isVisible(panel));
    });
  },
};

export const TestDisabled: StoryObj = {
  tags: ['skip-playwright'],
  render: () => (
    <Accordion>
      <AccordionItem label="Label1" disabled>
        <p>This is the content for Label1</p>
      </AccordionItem>
      <AccordionItem label="Label2">
        <p>This is the content for Label2</p>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement, step }) => {
    await step('disabled item does not toggle', async () => {
      const header = headerByText(canvasElement, 'Label1');
      const root = itemRootFromHeader(header);
      const panel = panelFromItemRoot(root);
      if (!header || !root || !panel) {
        throw new Error('Missing parts for disabled Label1');
      }

      if (root.dataset.disabled !== 'true') {
        throw new Error('Expected Label1 to be disabled');
      }

      const beforeVisible = isVisible(panel);
      header.click();
      await sleep(100);
      const afterVisible = isVisible(panel);

      if (beforeVisible !== afterVisible) {
        throw new Error('Disabled item should not toggle');
      }
    });
  },
};

export const TestDefaultExpanded: StoryObj = {
  tags: ['skip-playwright'],
  render: () => (
    <Accordion>
      <AccordionItem label="Label1" defaultExpanded>
        <p>This is the content for Label1</p>
      </AccordionItem>
      <AccordionItem label="Label2">
        <p>This is the content for Label2</p>
      </AccordionItem>
    </Accordion>
  ),
  play: async ({ canvasElement, step }) => {
    await step('item with defaultExpanded is visible', async () => {
      const header = headerByText(canvasElement, 'Label1');
      const root = itemRootFromHeader(header);
      const panel = panelFromItemRoot(root);
      if (!header || !root || !panel) {
        throw new Error('Missing parts for defaultExpanded Label1');
      }

      if (!isVisible(panel)) {
        throw new Error('Expected Label1 panel to be visible by default');
      }
    });
  },
};
