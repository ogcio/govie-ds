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
    return rendered.trim();
  };
}

const meta = {
  title: 'layout/Header',
};

export default meta;

const Template = renderMacro({ macro, name: 'govieHeader' });

export const Default = Template.bind({});
Default.args = {
  title: 'Service Name',
};

export const Title = Template.bind({});
Title.args = {
  title: 'Title',
};
