import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { Link } from '../link/link.js';
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
        'background',
        'wrapText',
        'title',
        'subtitle',
        'description',
        'tagText',
        'headerLinkHref',
        'linkActionText',
      ],
    },
  },
  args: {
    type: 'horizontal',
    inset: 'none',
    background: 'white',
    wrapText: false,
    title:
      'Lorem ipsum dolor sit consectetur adipiscing elit. Sed molestie massa est. In nec dui ',
    subtitle:
      'usce vitae rutrum odio. Suspendisse efficitur, velit a convallis dictum, turpis justo hendrerit ex, a pellentesque ',
    description:
      'Lorem ipsum dolor sit amet consectetur. Lectus morbi purus ac. Sollicitudin.',
    tagText: 'New',
    headerLinkHref: '',
    linkActionText: 'Link text',
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
    wrapText: {
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
    linkActionText: {
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
    wrapText,
    title,
    subtitle,
    description,
    tagText,
    headerLinkHref,
    linkActionText,
    ...props
  }: any) => (
    <Card {...props} data-testid="card">
      <CardMedia
        media={{
          type: 'image',
          config: {
            src: 'https://placeholderjs.com/400x300',
            alt: title,
            aspectRatio: '4 / 3',
          },
        }}
        href={headerLinkHref}
      />
      <CardContainer>
        <CardHeader>
          <CardTitle id="card-title" wrapText={wrapText}>
            {headerLinkHref ? (
              <Link href={headerLinkHref}>{title}</Link>
            ) : (
              title
            )}
          </CardTitle>
          <CardSubtitle
            id="card-subtitle"
            data-testid="card-subtitle"
            wrapText={wrapText}
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
          <Link href="/action">{linkActionText}</Link>
        </CardAction>
      </CardContainer>
    </Card>
  ),
  play: async ({ canvasElement, step, args }) => {
    const canvas = within(canvasElement);
    const { linkActionText } = args as any;
    const card = await canvas.findByTestId('card');

    await step('renders card with title and content', async () => {
      await expect(card).toBeInTheDocument();

      const heading = await canvas.findByRole('heading', {
        level: 2,
      });
      await expect(heading).toBeInTheDocument();
      await expect(canvas.getByTestId('card-subtitle')).toBeInTheDocument();
    });

    await step('wires ARIA relationships', async () => {
      await expect(card).toHaveAttribute('aria-labelledby', 'card-title');
      await expect(card).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining('card-subtitle'),
      );
      await expect(card).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining('card-desc'),
      );
      await expect(
        await canvas.findByRole('heading', { level: 2 }),
      ).toHaveAttribute('id', 'card-title');
      await expect(await canvas.findByTestId('card-subtitle')).toHaveAttribute(
        'id',
        'card-subtitle',
      );
      await expect(await canvas.findByTestId('card-desc')).toBeInTheDocument();
    });

    await step('renders image media', async () => {
      const image = await canvas.findByRole('img');
      await expect(image).toBeInTheDocument();
    });

    await step('renders tag', async () => {
      await expect(await canvas.findByText('New')).toBeInTheDocument();
    });

    await step('actions work (link)', async () => {
      const link = await canvas.findByRole('link', { name: linkActionText });
      await expect(link).toHaveAttribute('href', '/action');
      await expect(link).toBeInTheDocument();
    });
  },
};
