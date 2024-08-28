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

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://example.com',
    );
  });

  it('should open in a new tab if external', () => {
    const screen = renderLink({
      href: 'https://example.com',
      label: 'Example Link',
      external: true,
    });

    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link')).toHaveAttribute(
      'rel',
      'noreferrer noopener',
    );
  });

  it('should not open in a new tab if not external', () => {
    const screen = renderLink({
      href: 'https://example.com',
      label: 'Example Link',
      external: false,
    });

    expect(screen.getByRole('link')).not.toHaveAttribute('target', '_blank');
  });

  it('should have visited style', () => {
    const screen = renderLink({
      href: 'https://example.com',
      label: 'Example Link',
      noVisited: false,
    });

    expect(screen.getByRole('link')).toHaveClass('visited:gi-text-purple-700');
  });

  it('should not have visited style if noVisited is true', () => {
    const screen = renderLink({
      href: 'https://example.com',
      label: 'Example Link',
      noVisited: true,
    });

    expect(screen.getByRole('link')).not.toHaveClass(
      'visited:gi-text-purple-700',
    );
  });

  it('should pass axe tests', async () => {
    const screen = renderLink({
      href: 'https://example.com',
      label: 'Example Link',
    });

    await screen.axe();
  });
});
