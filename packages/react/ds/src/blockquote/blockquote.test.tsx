import { renderComponent, cleanup } from '../test-utilities.js';
import { Blockquote } from './blockquote.js';

describe('govieBlockquote', () => {
  afterEach(cleanup);
  it('should render a blockquote with the correct content', () => {
    const { getByText } = renderComponent(
      <Blockquote>This is a blockquote</Blockquote>,
    );
    const pElement = getByText('This is a blockquote');
    expect(pElement).toBeTruthy();
    expect(pElement.tagName.toLowerCase()).toBe('blockquote');
  });

  it('should render a blockquote with the cite attribute when provided', () => {
    const citeUrl = 'https://example.com/source';
    const { container } = renderComponent(
      <Blockquote cite={citeUrl}>This is a blockquote</Blockquote>,
    );
    const blockquoteElement = container.querySelector('blockquote');
    expect(blockquoteElement).toBeTruthy();
    expect(blockquoteElement?.getAttribute('cite')).toBe(citeUrl);
  });

  it('should pass axe accessibility tests', async () => {
    const { axe } = renderComponent(
      <Blockquote>This is a blockquote</Blockquote>,
    );
    await axe();
  });
});
