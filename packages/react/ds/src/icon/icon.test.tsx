import { renderComponent, cleanup } from '../test-utilities.js';
import { IconProps, Icon } from './icon.js';

describe('govieIcon', () => {
  afterEach(cleanup);
  const renderIcon = (props: IconProps) => renderComponent(<Icon {...props} />);

  it('should render the ThumbDown icon', () => {
    const screen = renderIcon({
      icon: 'thumb_down',
      size: 'md',
    });
    const iconSpan = screen.getByTestId('govie-icon');
    expect(iconSpan.textContent?.trim()).toBe('thumb_down');
  });

  it('should render the ThumbDown disabled', () => {
    const screen = renderIcon({
      icon: 'thumb_down',
      size: 'md',
      disabled: true,
    });
    const iconSpan = screen.getByTestId('govie-icon');
    expect(iconSpan.textContent?.trim()).toBe('thumb_down');
    expect(iconSpan.classList.contains('gi-text-gray-700')).toBe(true);
  });

  it('should render the ThumbDown with ARIA', () => {
    const screen = renderIcon({
      icon: 'thumb_down',
      size: 'md',
      ariaHidden: true,
      ariaLabel: 'ARIA-LABEL',
    });
    const iconSpan = screen.getByTestId('govie-icon');
    expect(iconSpan.textContent?.trim()).toBe('thumb_down');
    expect(iconSpan.hasAttribute('aria-hidden')).toBe(true);
    expect(iconSpan.hasAttribute('aria-label')).toBe(true);
    expect(iconSpan.getAttribute('aria-label')).toBe('ARIA-LABEL');
  });

  it('should render the ThumbDown filled', () => {
    const screen = renderIcon({
      icon: 'thumb_down',
      size: 'md',
      filled: true,
    });
    const iconSpan = screen.getByTestId('govie-icon');
    expect(iconSpan.textContent?.trim()).toBe('thumb_down');
    expect(iconSpan.style.fontVariationSettings).contain("'FILL' 1");
  });

  it('should render the ThumbDown icon large', () => {
    const screen = renderIcon({
      icon: 'thumb_down',
      size: 'lg',
    });
    const iconSpan = screen.getByTestId('govie-icon');
    expect(iconSpan.textContent?.trim()).toBe('thumb_down');
    expect(iconSpan).toHaveStyle('font-size: 32px');
  });

  it('should pass axe tests', async () => {
    const screen = renderIcon({
      icon: 'thumb_down',
      size: 'lg',
      ariaLabel: 'ARIA-LABEL',
    });
    await screen.axe();
  });
});
