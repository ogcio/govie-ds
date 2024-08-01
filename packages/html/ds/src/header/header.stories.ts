// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
// import headerData from '../data/headerData.json';

import nunjucks from 'nunjucks';
import headerMacro from './header.html?raw';

const nunjucksEnvironment = nunjucks.configure({
  autoescape: true,
  noCache: true,
  trimBlocks: true,
  lstripBlocks: true,
});

function renderMacro(
  macro: string,
  macroName: string,
  props: Record<string, unknown>,
): string {
  const template = `
    ${macro}
    {{ ${macroName}(props) }}
  `;

  const rendered = nunjucksEnvironment.renderString(template, props);
  return rendered.trim();
}

export default {
  title: 'Components/Header',
};

// eslint-disable-next-line unicorn/prevent-abbreviations
const Template = (args: any) => {
  return renderMacro(headerMacro, 'header', args);
};

export const Default = Template.bind({});
Default.args = {};
