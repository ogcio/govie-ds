import { render, cleanup } from '../test-utils.js';
import { Blockquote } from './blockquote.js';

describe('govieBlockquote', () => {
  afterEach(cleanup);
  it('should render a blockquote with the correct content', () => {
    const { getByText } = render(<Blockquote>This is a blockquote</Blockquote>);
    const pElement = getByText('This is a blockquote');
    expect(pElement).toBeTruthy();
    expect(pElement.tagName.toLowerCase()).toBe('blockquote');
  });

  it('should pass axe accessibility tests', async () => {
    const { axe } = render(<Blockquote>This is a blockquote</Blockquote>);
    await axe();
  });
});
