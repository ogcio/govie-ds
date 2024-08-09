import type { Meta, StoryObj } from '@storybook/react';
import nunjucks from 'nunjucks';
import macro from './macro.html?raw';

const nunjucksEnvironment = nunjucks.configure({
  autoescape: true,
  noCache: true,
  trimBlocks: true,
  lstripBlocks: true,
});

function renderMacro({ macro, name }: { macro: string; name: string }) {
  return function (props: Record<string, unknown>) {
    const propsString = JSON.stringify(props);

    const template = `
    ${macro}
    {{ ${name}(${propsString}) }}
  `;

    const rendered = nunjucksEnvironment.renderString(template, {});
    return <div dangerouslySetInnerHTML={{ __html: rendered.trim() }} />;
  };
}

const render = renderMacro({ macro, name: 'govieHeader' });

type Bar = {
  title?: string;
  foo: string;
};

// function Baz({ title, foo }: Bar) {
//   return null
// }

const meta: Meta<Bar> = {
  // component: Baz,
  render,
  title: 'layout/Header',
};

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
