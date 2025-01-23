import { render } from '../common/render';
import html from './icon.html?raw';
import { IconId, IconSize } from './icon.schema';

describe('govieIcon', () => {
  const renderIcon = render({
    componentName: 'icon',
    macroName: 'govieIcon',
    html,
  });

  it('should render the ThumbDown icon', () => {
    const screen = renderIcon({
      icon: IconId.ThumbDown,
      size: IconSize.Medium,
    });
    const iconSpan = screen.getByTestId('govie-icon');
    expect(iconSpan.textContent?.trim()).toBe('thumb_down');
  });

  it('should render the ThumbDown disabled', () => {
    const screen = renderIcon({
      icon: IconId.ThumbDown,
      size: IconSize.Medium,
      disabled: true,
    });
    const iconSpan = screen.getByTestId('govie-icon');
    expect(iconSpan.textContent?.trim()).toBe('thumb_down');
    expect(iconSpan.classList.contains('gi-text-gray-700')).toBe(true);
  });

  it('should render the ThumbDown with ARIA', () => {
    const screen = renderIcon({
      icon: IconId.ThumbDown,
      size: IconSize.Medium,
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
      icon: IconId.ThumbDown,
      size: IconSize.Medium,
      filled: true,
    });
    const iconSpan = screen.getByTestId('govie-icon');
    expect(iconSpan.textContent?.trim()).toBe('thumb_down');
    expect(iconSpan.style.fontVariationSettings).contain("'FILL' 1");
  });

  it('should render the ThumbDown icon large', () => {
    const screen = renderIcon({
      icon: IconId.ThumbDown,
      size: IconSize.Large,
    });
    const iconSpan = screen.getByTestId('govie-icon');
    expect(iconSpan.textContent?.trim()).toBe('thumb_down');
    expect(iconSpan.classList.contains('gi-text-[32px]')).toBe(true);
  });

  it('should pass axe tests', async () => {
    const screen = renderIcon({
      icon: IconId.ThumbDown,
      size: IconSize.Large,
      ariaLabel: 'ARIA-LABEL',
    });
    await screen.axe();
  });
});
