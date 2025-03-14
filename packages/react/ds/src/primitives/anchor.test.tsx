import { render, cleanup } from '../test-utils.js';
import Anchor, { AnchorProps } from './anchor.js';

describe('anchor', () => {
  afterEach(cleanup);
  const renderAnchor = (props: AnchorProps) => render(<Anchor {...props} />);

  it('should render link text', () => {
    const screen = renderAnchor({
      href: 'https://example.com',
      children: 'Example Link',
    });
    expect(screen.getByText('Example Link')).toBeTruthy();
  });

  it('should have correct href', () => {
    const screen = renderAnchor({
      href: 'https://example.com',
      children: 'Example Link',
    });
    const linkElement = screen.getByRole('link');

    expect(linkElement.getAttribute('href')).toBe('https://example.com');
  });

  it('should open in a new tab if external', () => {
    const screen = renderAnchor({
      href: 'https://example.com',
      children: 'Example Link',
      external: true,
    });
    const linkElement = screen.getByRole('link');

    expect(linkElement.getAttribute('target')).toBe('_blank');
    expect(linkElement.getAttribute('rel')).toBe('noreferrer noopener');
  });

  it('should not open in a new tab if not external', () => {
    const screen = renderAnchor({
      href: 'https://example.com',
      children: 'Example Link',
      external: false,
    });
    const linkElement = screen.getByRole('link');

    expect(linkElement.getAttribute('target')).not.toBe('_blank');
  });

  it('should pass axe tests', async () => {
    const screen = renderAnchor({
      href: 'https://example.com',
      children: 'Example Link',
    });

    await screen.axe();
  });
});
