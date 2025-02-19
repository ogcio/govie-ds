import { render, cleanup } from '../test-utils.js';
import { LinkProps, Link } from './link.js';

describe('link', () => {
  afterEach(cleanup);
  const renderLink = (props: LinkProps) => render(<Link {...props} />);

  it('should render link text', () => {
    const screen = renderLink({
      href: 'https://example.com',
      children: 'Example Link',
    });
    expect(screen.getByText('Example Link')).toBeTruthy();
  });

  it('should have correct href', () => {
    const screen = renderLink({
      href: 'https://example.com',
      children: 'Example Link',
    });
    const linkElement = screen.getByRole('link');

    expect(linkElement.getAttribute('href')).toBe('https://example.com');
  });

  it('should open in a new tab if external', () => {
    const screen = renderLink({
      href: 'https://example.com',
      children: 'Example Link',
      external: true,
    });
    const linkElement = screen.getByRole('link');

    expect(linkElement.getAttribute('target')).toBe('_blank');
    expect(linkElement.getAttribute('rel')).toBe('noreferrer noopener');
  });

  it('should not open in a new tab if not external', () => {
    const screen = renderLink({
      href: 'https://example.com',
      children: 'Example Link',
      external: false,
    });
    const linkElement = screen.getByRole('link');

    expect(linkElement.getAttribute('target')).not.toBe('_blank');
  });

  it('should have visited style', () => {
    const screen = renderLink({
      href: 'https://example.com',
      children: 'Example Link',
      noVisited: false,
    });
    const linkElement = screen.getByRole('link');

    expect(linkElement.classList.contains('visited:gi-text-blue-700')).toBe(
      false,
    );
  });

  it('should not have visited style if noVisited is true', () => {
    const screen = renderLink({
      href: 'https://example.com',
      children: 'Example Link',
      noVisited: true,
    });

    const linkElement = screen.getByRole('link');

    expect(linkElement.classList.contains('gi-link-no-visited')).toBe(true);
  });

  it('should not gi-link if styled as button', () => {
    const screen = renderLink({
      href: 'https://example.com',
      children: 'Example Link',
      asButton: {
        variant: 'primary',
        size: 'medium',
        appearance: 'default',
      },
    });

    const linkElement = screen.getByRole('link');

    expect(linkElement.classList.contains('gi-link')).toBe(false);
  });

  it('should pass axe tests', async () => {
    const screen = renderLink({
      href: 'https://example.com',
      children: 'Example Link',
    });

    await screen.axe();
  });
});
