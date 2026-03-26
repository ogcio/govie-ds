import { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor, within } from 'storybook/test';
import { Button } from '../button/button.js';
import { Link } from '../link/link.js';
import { generateSvgPlaceholderDataUrl } from '../utils/placeholder.js';
import {
  CardAction,
  CardContainer,
  CardDescription,
  CardHeader,
  CardMedia,
  CardSubtitle,
  CardTag,
  CardTitle,
} from './card-next.js';
import { Card } from './card.js';

const meta: Meta = {
  title: 'Components/Card',
  parameters: {
    controls: {
      include: [
        'type',
        'inset',
        'insetSpace',
        'background',
        'truncate',
        'title',
        'subtitle',
        'description',
        'tagText',
        'headerLinkHref',
        'linkActionHref',
      ],
    },
  },
  args: {
    type: 'horizontal',
    inset: 'none',
    insetSpace: 16,
    background: 'white',
    truncate: false,
    title: 'Card Title',
    subtitle: 'This is the subtitle',
    description:
      'Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac. Sollicitudin.',
    tagText: 'New',
    headerLinkHref: '#',
    linkActionHref: '',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Controls the layout of the card.',
      table: { category: 'Layout', type: { summary: 'horizontal | vertical' } },
    },
    inset: {
      control: 'select',
      options: ['none', 'body', 'full'],
      description: 'Defines where the content is inset.',
      table: { category: 'Layout', type: { summary: 'none | body | full' } },
    },
    insetSpace: {
      control: { type: 'number', min: 0, step: 1 },
      description:
        'Spacing scale in px units. Default: 16px. Used when inset is "body" or "full".',
      table: {
        category: 'Layout',
        type: { summary: 'number (×4px units)' },
      },
    },
    background: {
      control: { type: 'select' },
      options: ['white', 'grey'],
      description: 'Background color of the card.',
      table: {
        category: 'Layout',
        type: { summary: 'white | grey' },
        defaultValue: { summary: 'white' },
      },
    },
    truncate: {
      control: 'boolean',
      description: 'Clamp CardTitle and CardSubtitle to 2 lines.',
      table: { category: 'Typography', type: { summary: 'boolean' } },
    },
    title: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
      description: 'Card title text.',
    },
    subtitle: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
      description: 'Card subtitle text.',
    },
    description: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
      description: 'Card description text.',
    },
    tagText: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
      description: 'Tag/badge text.',
    },
    linkActionHref: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string' } },
      description: 'Link action text.',
    },
    headerLinkHref: {
      control: 'text',
      table: { category: 'Content', type: { summary: 'string (URL)' } },
      description: 'Title link href.',
    },
    children: {
      control: false,
      table: {
        type: {
          summary:
            'CardMedia | CardContainer (CardHeader, CardDescription, CardAction)',
        },
      },
      description:
        'Composable structure using CardMedia and CardContainer. Only specific children allowed.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: ({
    truncate,
    title,
    subtitle,
    description,
    tagText,
    headerLinkHref,
    linkActionHref,
    ...props
  }: any) => (
    <Card {...props} data-testid="card">
      <CardMedia
        media={{
          type: 'image',
          config: {
            src: generateSvgPlaceholderDataUrl(400, 300),
            alt: title,
            aspectRatio: '4 / 3',
          },
        }}
        href={headerLinkHref}
      />
      <CardContainer>
        <CardHeader>
          <CardTitle id="card-title" truncate={truncate}>
            {headerLinkHref ? (
              <Link href={headerLinkHref}>{title}</Link>
            ) : (
              title
            )}
          </CardTitle>
          <CardSubtitle
            id="card-subtitle"
            data-testid="card-subtitle"
            truncate={truncate}
          >
            {subtitle}
          </CardSubtitle>
          <CardTag text={tagText} type="info" />
        </CardHeader>
        <CardDescription
          id="card-desc"
          data-testid="card-desc"
          className="gi-w-full"
        >
          {description}
        </CardDescription>
        <CardAction>
          {linkActionHref ? (
            <Link href="/action">Action 1</Link>
          ) : (
            <Button variant="secondary">Action 1</Button>
          )}
        </CardAction>
      </CardContainer>
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const card = await canvas.findByTestId('card');

    await step('renders card with title and content', async () => {
      await expect(card).toBeInTheDocument();

      const heading = await canvas.findByRole('heading', {
        level: 2,
      });
      await expect(heading).toBeInTheDocument();
      await expect(canvas.getByTestId('card-subtitle')).toBeInTheDocument();
    });

    await step('wires ARIA relationships (after hydration)', async () => {
      await waitFor(() => expect(card).toHaveAttribute('aria-labelledby'));
      await waitFor(() => expect(card).toHaveAttribute('aria-describedby'));

      const labelledby = card.getAttribute('aria-labelledby')!;
      const describedbyRaw = card.getAttribute('aria-describedby')!;
      const describedby = describedbyRaw.split(/\s+/).filter(Boolean);

      const heading = await canvas.findByRole('heading', { level: 2 });
      await expect(heading).toHaveAttribute('id', labelledby);

      for (const id of describedby) {
        const element = canvasElement.querySelector(
          `#${id}`,
        ) as HTMLElement | null;
        await expect(element).not.toBeNull();
      }
    });

    await step('renders image media', async () => {
      const image = await canvas.findByRole('img');
      await expect(image).toBeInTheDocument();
    });

    await step('renders tag', async () => {
      await expect(await canvas.findByText('New')).toBeInTheDocument();
    });

    await step('actions work (link)', async () => {
      const button = await canvas.findByRole('button');
      await expect(button).toBeInTheDocument();
    });
  },
};
