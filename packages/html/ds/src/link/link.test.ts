import { render } from '../common/render';
import html from './link.html?raw';
import { LinkProps } from './link.schema';

describe('link', () => {
  const renderLink = render<LinkProps>({
    componentName: 'link',
    macroName: 'govieLink',
    html,
  });

  it('should render link text', () => {
    const screen = renderLink({
      href: 'https://example.com',
      label: 'Example Link',
    });
    expect(screen.getByText('Example Link')).toBeTruthy();
  });

  it('should have correct href', () => {
    const screen = renderLink({
      href: 'https://example.com',
      label: 'Example Link',
    });
    const linkElement = screen.getByRole('link');

    expect(linkElement.getAttribute('href')).toBe('https://example.com');
  });

  it('should open in a new tab if external', () => {
    const screen = renderLink({
      href: 'https://example.com',
      label: 'Example Link',
      external: true,
    });
    const linkElement = screen.getByRole('link');

    expect(linkElement.getAttribute('target')).toBe('_blank');
    expect(linkElement.getAttribute('rel')).toBe('noreferrer noopener');
  });

  it('should not open in a new tab if not external', () => {
    const screen = renderLink({
      href: 'https://example.com',
      label: 'Example Link',
      external: false,
    });
    const linkElement = screen.getByRole('link');

    expect(linkElement.getAttribute('target')).not.toBe('_blank');
  });

  it('should have visited style', () => {
    const screen = renderLink({
      href: 'https://example.com',
      label: 'Example Link',
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
      label: 'Example Link',
      noVisited: true,
    });

    const linkElement = screen.getByRole('link');

    expect(linkElement.classList.contains('visited:gi-text-blue-700')).toBe(
      true,
    );
  });

  it('should have correct aria attributes', () => {
    const screen = renderLink({
      href: 'https://example.com',
      label: 'Example Link',
      aria: { 'aria-disabled': 'true' },
    });

    const linkElement = screen.getByRole('link');
    expect(linkElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('should pass axe tests', async () => {
    const screen = renderLink({
      href: 'https://example.com',
      label: 'Example Link',
    });

    await screen.axe();
  });
});
