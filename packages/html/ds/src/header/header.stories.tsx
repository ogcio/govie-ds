import type { Meta, StoryObj } from '@storybook/react';
import nunjucks from 'nunjucks';
import macro from './macro.html?raw';

const nunjucksEnvironment = nunjucks.configure({
  autoescape: true,
  noCache: true,
  trimBlocks: true,
  lstripBlocks: true,
});

function renderMacro<T = unknown>({
  macro,
  name,
}: {
  macro: string;
  name: string;
}) {
  return function (props: T) {
    const propsString = JSON.stringify(props);

    const template = `
    ${macro}
    {{ ${name}(${propsString}) }}
  `;

    const rendered = nunjucksEnvironment.renderString(template, {});
    return <div dangerouslySetInnerHTML={{ __html: rendered.trim() }} />;
  };
}

type HeaderProps = {
  title: string;
};

const Header = renderMacro<HeaderProps>({ macro, name: 'govieHeader' });

const meta = {
  component: Header,
  title: 'layout/Header',
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Service Name',
  },
};

export const Title: Story = {
  args: {
    title: 'Title',
  },
};
