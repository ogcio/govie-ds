import { Meta, StoryObj } from '@storybook/react';
import { t } from 'i18next';
import { Button } from '../button/button.js';
import { Link } from '../link/link.js';
import {
  CardMedia,
  CardContainer,
  CardBody,
  CardHeader,
  CardFooter,
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
            'CardMedia | CardContainer (CardHeader, CardBody, CardFooter)',
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
  render: ({ ...props }) => (
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
        <CardHeader subTitle="Subheading" tag={{ text: 'New', type: 'info' }}>
          <Link href="#">Card Title</Link>
        </CardHeader>
        <CardBody>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardBody>
        <CardFooter>
          <Button
            variant="secondary"
            aria-label={t('card.actionButton', {
              children: 'Button',
              defaultValue: `Action button: Button`,
            })}
          >
            Button
          </Button>
        </CardFooter>
      </CardContainer>
    </Card>
  ),
};

export const VerticalWithoutImage: Story = {
  render: () => (
    <Card>
      <CardContainer>
        <CardHeader>
          <Link href="#">Vertical Card Without Image</Link>
        </CardHeader>
        <CardBody>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardBody>
        <CardFooter>
          <Link
            size="md"
            aria-label={t('card.actionLink', {
              children: 'Learn more',
              defaultValue: `Action link: Learn more`,
            })}
          >
            Learn more
          </Link>
        </CardFooter>
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
        <CardHeader tag={{ text: 'Featured', type: 'info' }}>
          <Link href="#">Vertical Card</Link>
        </CardHeader>
        <CardBody>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardBody>
        <CardFooter>
          <Link size="md" href="#">
            View More
          </Link>
        </CardFooter>
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
          <Link href="#">Vertical Card</Link>
        </CardHeader>
        <CardBody>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardBody>
        <CardFooter>
          <Button variant="secondary">Button</Button>
        </CardFooter>
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
          <Link href="#">Horizontal Card</Link>
        </CardHeader>
        <CardBody>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardBody>
        <CardFooter>
          <Link size="md" href="#">
            Link
          </Link>
        </CardFooter>
      </CardContainer>
    </Card>
  ),
};

export const HorizontalWithoutImage: Story = {
  render: () => (
    <Card type="horizontal">
      <CardContainer>
        <CardHeader subTitle="Subtitle Here">
          Horizontal Card Without Image
        </CardHeader>
        <CardBody>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardBody>
        <CardFooter>
          <Link size="md" href="#">
            Learn More
          </Link>
        </CardFooter>
      </CardContainer>
    </Card>
  ),
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
        <CardHeader>Card With Icon</CardHeader>
        <CardBody>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardBody>
        <CardFooter>
          <Button variant="secondary">Download</Button>
        </CardFooter>
      </CardContainer>
    </Card>
  ),
};

export const WithIframeEmbed: Story = {
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
        <CardHeader tag={{ text: 'Video', type: 'info' }}>
          <Link href="#">Featured Video</Link>
        </CardHeader>
        <CardBody>
          This card demonstrates embedding a YouTube video using an iframe.
        </CardBody>
        <CardFooter>
          <Button variant="secondary">Watch Later</Button>
        </CardFooter>
      </CardContainer>
    </Card>
  ),
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
        <CardHeader
          subTitle="Subheading"
          tag={{ text: 'Featured', type: 'info' }}
        >
          <Link href="#">Card Title</Link>
        </CardHeader>
        <CardBody>Card with 16 / 9 aspect ratio media</CardBody>
        <CardFooter>
          <Button variant="secondary">Button</Button>
        </CardFooter>
      </CardContainer>
    </Card>
  ),
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
          <Link asChild>
            <a href="#">Custom Title Link</a>
          </Link>
        </CardHeader>
        <CardBody>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardBody>
        <CardFooter>
          <Button variant="secondary">Button</Button>
        </CardFooter>
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
        <CardHeader subTitle="Subheading" tag={{ text: 'New', type: 'info' }}>
          Card Title
        </CardHeader>
        <CardBody>
          Lorem ipsum dolor sit amet consectetur. Lectus aliquam morbi purus ac.
          Sollicitudin.
        </CardBody>
        <CardFooter>
          <Button variant="secondary">Button</Button>
        </CardFooter>
      </CardContainer>
    </Card>
  ),
};
