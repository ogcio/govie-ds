import { Meta, StoryObj } from '@storybook/react';
import { t } from 'i18next';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../button/button.js';
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
      include: ['inset', 'type', 'children'],
    },
  },
  args: {
    type: 'horizontal',
    inset: 'none',
    dataTestid: 'card',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Controls the layout of the card.',
      table: {
        category: 'Layout',
        type: { summary: 'horizontal | vertical' },
      },
    },
    inset: {
      control: 'select',
      options: ['none', 'body', 'full'],
      description: 'Defines where the content is inset.',
      table: {
        category: 'Layout',
        type: { summary: 'none | body | full' },
      },
    },

    children: {
      table: {
        type: {
          summary:
            'CardMedia | CardContainer (CardHeader, CardDescription, CardAction)',
        },
      },
      description:
        'Composable structure using CardMedia and CardContainer. Only specific children allowed.',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (props) => (
    <Card {...props}>
      <CardMedia
        media={{
          type: 'image',
          config: {
            src: 'https://placeholderjs.com/400x300',
            alt: 'Card Title',
            aspectRatio: '4 / 3',
          },
        }}
        href="#"
      />
      <CardContainer inset="none">
        <CardHeader>
          <CardTitle>
            <Link href="#">Card Title</Link>
          </CardTitle>
          <CardSubtitle>Subheading</CardSubtitle>
          <CardTag text="New" type="info" />
        </CardHeader>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardDescription>
        <CardAction>
          <Button variant="secondary">Button</Button>
        </CardAction>
      </CardContainer>
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const card = await canvas.findByTestId('card');

    await step('should render a card with title and content', async () => {
      const cardElement = await canvas.findByTestId('card');
      await expect(cardElement).toBeInTheDocument();
      await expect(await canvas.findByText('Card Title')).toBeInTheDocument();
      await expect(
        await canvas.findByText(/Lorem ipsum dolor sit amet/i),
      ).toBeInTheDocument();
    });

    await step(
      'should render an image when media type is "image"',
      async () => {
        const imageElement = await canvas.findByRole('img');
        await expect(imageElement).toHaveAttribute(
          'src',
          'https://placeholderjs.com/400x300',
        );
        await expect(imageElement).toHaveAttribute('alt', 'Card Title');
      },
    );

    await step('should render a tag if "tag" prop is provided', async () => {
      const tagElement = await canvas.findByText('New');
      await expect(tagElement).toBeInTheDocument();
    });

    await step(
      'should render actions if actions prop is provided',
      async () => {
        const buttonElement = await canvas.findByRole('button', {
          name: 'Button',
        });
        await userEvent.click(buttonElement);
        await expect(buttonElement).toBeEnabled();
      },
    );

    await step(
      'should render a subtitle if "subTitle" prop is provided',
      async () => {
        await expect(await canvas.findByText('Subheading')).toBeInTheDocument();
      },
    );

    await expect(card).toBeInTheDocument();
    const button = await canvas.findByRole('button', { name: 'Button' });
    await userEvent.click(button);
    await expect(button).toBeEnabled();
  },
};

export const VerticalWithoutImage: Story = {
  render: () => (
    <Card>
      <CardContainer>
        <CardHeader>
          <CardTitle>
            <Link href="#">Vertical Card Without Image</Link>
          </CardTitle>
        </CardHeader>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardDescription>
        <CardAction>
          <Link
            size="md"
            aria-label={t('card.actionLink', {
              children: 'Learn more',
              defaultValue: `Action link: Learn more`,
            })}
          >
            Learn more
          </Link>
        </CardAction>
      </CardContainer>
    </Card>
  ),
};

export const VerticalWithLink: Story = {
  render: () => (
    <Card>
      <CardMedia
        media={{
          type: 'image',
          config: {
            src: 'https://placeholderjs.com/400x300',
            alt: 'Vertical Card',
          },
        }}
        href="#"
      />
      <CardContainer>
        <CardHeader>
          <CardTitle>
            <Link href="#">Vertical Card</Link>
          </CardTitle>
          <CardSubtitle>Subtitle</CardSubtitle>
          <CardTag text="Featured" type="info" />
        </CardHeader>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardDescription>
        <CardAction>
          <Link size="md" href="#">
            View More
          </Link>
        </CardAction>
      </CardContainer>
    </Card>
  ),
};

export const VerticalWithButton: Story = {
  render: () => (
    <Card>
      <CardMedia
        media={{
          type: 'image',
          config: {
            src: 'https://placeholderjs.com/400x300',
            alt: 'Vertical Card',
          },
        }}
        href="#"
      />
      <CardContainer>
        <CardHeader>
          <CardTitle>
            <Link href="#">Vertical Card</Link>
          </CardTitle>
        </CardHeader>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardDescription>
        <CardAction>
          <Button variant="secondary">Button</Button>
        </CardAction>
      </CardContainer>
    </Card>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <Card type="horizontal">
      <CardMedia
        media={{
          type: 'image',
          config: {
            src: 'https://placeholderjs.com/600x360',
            alt: 'Horizontal Card',
          },
        }}
        href="#"
      />
      <CardContainer>
        <CardHeader>
          <CardTitle>
            <Link href="#">Horizontal Card</Link>
          </CardTitle>
        </CardHeader>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardDescription>
        <CardAction>
          <Link size="md" href="#">
            Link
          </Link>
        </CardAction>
      </CardContainer>
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render a horizontal card layout', async () => {
      const titleElement = await canvas.findByText('Horizontal Card');
      const horizontalContainer = titleElement.closest(
        '.gi-card-horizontal',
      ) as HTMLElement | null;
      await expect(horizontalContainer).not.toBeNull();
    });

    await step(
      'should render a link if "href" prop is provided for title',
      async () => {
        const titleLinkElement = canvas.getAllByRole('link', {
          name: 'Horizontal Card',
        });
        await expect(titleLinkElement[1]).toHaveAttribute('href', '#');
      },
    );
  },
};

export const HorizontalWithoutImage: Story = {
  render: () => (
    <Card type="horizontal">
      <CardContainer>
        <CardHeader>
          <CardTitle>Horizontal Card Without Image</CardTitle>
          <CardSubtitle>Subtitle Here</CardSubtitle>
        </CardHeader>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardDescription>
        <CardAction>
          <Link size="md" href="#">
            Learn More
          </Link>
        </CardAction>
      </CardContainer>
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should render a subtitle if "subTitle" prop is provided',
      async () => {
        await expect(
          await canvas.findByText('Subtitle Here'),
        ).toBeInTheDocument();
      },
    );
  },
};

export const HorizontalWithIcon: Story = {
  render: () => (
    <Card type="horizontal">
      <CardMedia
        media={{
          type: 'icon',
          config: {
            icon: 'download',
            size: 'xl',
            className: 'gi-text-gray-500',
          },
        }}
      />
      <CardContainer>
        <CardHeader>
          <CardTitle>Card With Icon</CardTitle>
        </CardHeader>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardDescription>
        <CardAction>
          <Button variant="secondary">Download</Button>
        </CardAction>
      </CardContainer>
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    step('should render an icon when media type is "icon"', async () => {
      const iconElement = await canvas.findByTestId('govie-icon');
      await expect(iconElement).toBeInTheDocument();
      await expect(iconElement.textContent?.trim()).toBe('download');
      await expect(iconElement.classList.contains('gi-text-gray-500')).toBe(
        true,
      );
    });
  },
};

export const VerticalLayout: Story = {
  tags: ['skip-playwright'],
  render: (props) => (
    <Card {...props} type="vertical" dataTestid="card">
      <CardContainer inset="none">
        <CardHeader>
          <CardTitle>Vertical Layout</CardTitle>
        </CardHeader>
        <CardDescription>
          Ensures vertical layout class is applied
        </CardDescription>
      </CardContainer>
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('should render a vertical card layout', async () => {
      const titleElement = await canvas.findByText('Vertical Layout');
      const verticalContainer = titleElement.closest(
        '.gi-card-vertical',
      ) as HTMLElement | null;
      await expect(verticalContainer).not.toBeNull();
    });
  },
};

export const WithIframeEmbed: Story = {
  tags: ['skip-playwright'],
  render: () => (
    <Card type="horizontal">
      <CardMedia
        media={{
          type: 'iframe',
          config: {
            src: 'https://www.youtube.com/embed/K4TOrB7at0Y',
            title: 'Sample YouTube Video',
            allowFullScreen: true,
            allow:
              'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
          },
        }}
        href="#"
      />
      <CardContainer inset="none">
        <CardHeader>
          <CardTitle>
            <Link href="#">Featured Video</Link>
          </CardTitle>
          <CardTag text="Video" type="info" />
        </CardHeader>
        <CardDescription>
          This card demonstrates embedding a YouTube video using an iframe.
        </CardDescription>
        <CardAction>
          <Button variant="secondary">Watch Later</Button>
        </CardAction>
      </CardContainer>
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should render an iframe when media type is "iframe"',
      async () => {
        const iframeElement = await canvas.findByTitle('Sample YouTube Video');

        expect(iframeElement).toBeTruthy();
        expect(iframeElement.getAttribute('title')).toBe(
          'Sample YouTube Video',
        );
        expect(iframeElement.getAttribute('allowFullScreen')).not.toBeNull();
      },
    );
  },
};

export const MediaImageWithAspectRatio: Story = {
  render: () => (
    <Card type="horizontal">
      <CardMedia
        media={{
          type: 'image',
          config: {
            src: 'https://placeholderjs.com/600x400',
            alt: '16 / 9 aspect ratio image',
            aspectRatio: '16 / 9',
          },
        }}
        href="#"
      />
      <CardContainer inset="none">
        <CardHeader>
          <CardTitle>
            <Link href="#">Card Title</Link>
          </CardTitle>
          <CardSubtitle>Subheading</CardSubtitle>
          <CardTag text="Featured" type="info" />
        </CardHeader>
        <CardDescription>Card with 16 / 9 aspect ratio media</CardDescription>
        <CardAction>
          <Button variant="secondary">Button</Button>
        </CardAction>
      </CardContainer>
    </Card>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      'should render an image with aspect ratio when provided',
      async () => {
        const imageElement = await canvas.findByRole('img', {
          name: /aspect ratio image/i,
        });
        await expect(imageElement).toHaveStyle('aspect-ratio: 16 / 9');
      },
    );
  },
};

export const WithCustomTitleLink: Story = {
  render: () => (
    <Card type="horizontal">
      <CardMedia
        media={{
          type: 'image',
          config: {
            src: 'https://placeholderjs.com/400x300',
            alt: 'Card Title',
            aspectRatio: '4 / 3',
          },
        }}
      />
      <CardContainer inset="none">
        <CardHeader>
          <CardTitle>
            <Link asChild>
              <a href="#">Custom Title Link</a>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardDescription>
        <CardAction>
          <Button variant="secondary">Button</Button>
        </CardAction>
      </CardContainer>
    </Card>
  ),
};

export const WithoutTitleLink: Story = {
  render: () => (
    <Card type="horizontal">
      <CardMedia
        media={{
          type: 'image',
          config: {
            src: 'https://placeholderjs.com/400x300',
            alt: 'Card Title',
            aspectRatio: '4 / 3',
          },
        }}
      />
      <CardContainer inset="none">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardSubtitle>Subheading</CardSubtitle>
          <CardTag text="New" type="info" />
        </CardHeader>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardDescription>
        <CardAction>
          <Button variant="secondary">Button</Button>
        </CardAction>
      </CardContainer>
    </Card>
  ),
};
