import { render } from '../common/render';
import html from './blockquote.html?raw';
import { BlockquoteProps } from './blockquote.schema';

describe('govieBlockquote', () => {
  const renderBlockquote = render<BlockquoteProps>({
    componentName: 'blockquote',
    macroName: 'govieBlockquote',
    html,
  });

  it('should render a blockquote with the correct content', () => {
    const screen = renderBlockquote({
      content: 'This is a blockquote',
    });
    const pElement = screen.getByText('This is a blockquote');
    expect(pElement).toBeTruthy();
    expect(pElement.tagName).toBe('blockquote');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderBlockquote({
      content: 'Accessible blockquote',
    });

    await screen.axe();
  });
});
