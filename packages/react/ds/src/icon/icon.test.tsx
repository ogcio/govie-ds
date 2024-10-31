import { render, cleanup } from '../test-utils.js';
import { IconPropTypes, Icon } from './icon.js';

describe('govieIcon', () => {
  afterEach(cleanup);
  const renderIcon = (props: IconPropTypes) => render(<Icon {...props} />);

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
      color: 'disabled',
    });
    const iconSpan = screen.getByTestId('govie-icon');
    expect(iconSpan.textContent?.trim()).toBe('thumb_down');
    expect(iconSpan.classList.contains('gi-text-gray-300')).toBe(true);
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
      variant: 'filled',
    });
    const iconSpan = screen.getByTestId('govie-icon');
    expect(iconSpan.textContent?.trim()).toBe('thumb_down');
    expect(iconSpan.classList.contains('material-icons-outlined')).toBe(true);
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
