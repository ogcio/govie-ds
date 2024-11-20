import { render } from '../common/render';
import html from './stack.html?raw';
import { StackProps } from './stack.schema';

describe('govieStack', () => {
  const renderStack = render<StackProps>({
    componentName: 'stack',
    macroName: 'govieStack',
    html,
  });

  it('should pass axe tests', async () => {
    const screen = renderStack({
      children: ['item 1', 'item 2', 'item 3'],
    });
    await screen.axe();
  });
});
