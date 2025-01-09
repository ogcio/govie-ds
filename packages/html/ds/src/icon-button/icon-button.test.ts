import { ButtonSize, ButtonVariant } from '../button/button-schema';
import { render } from '../common/render';
import { testVariantsAxe } from '../helpers/test-helpers';
import { IconId } from '../icon/icon.schema';
import html from './icon-button.html?raw';
import { iconButtonProps } from './icon-button.schema';

describe('icon-button', () => {
  const renderIconButton = render<iconButtonProps>({
    componentName: 'icon-button',
    macroName: 'govieIconButton',
    html,
  });

  testVariantsAxe(
    [ButtonVariant.Flat, ButtonVariant.Primary, ButtonVariant.Secondary],
    (variant) =>
      renderIconButton({
        icon: {
          icon: 'thumb_up',
        },
        variant,
      }),
  );

  it('should render the icon', () => {
    const screen = renderIconButton({
      icon: {
        icon: IconId.ThumbUp,
      },
    });
    const iconElement = screen.getByTestId('govie-icon');
    expect(iconElement).toBeTruthy();
  });
  it('should render a small icon button', () => {
    const iconClass = 'gi-text-[16px]';
    const buttonClass = 'gi-icon-btn-small';

    const screen = renderIconButton({
      icon: {
        icon: IconId.ThumbUp,
      },
      size: ButtonSize.Small,
    });

    const iconElement = screen.getByTestId('govie-icon');
    const buttonElement = screen.getByTestId('govieIconButton', {
      exact: false,
    });

    expect(iconElement.classList.contains(iconClass)).toBeTruthy();
    expect(buttonElement.classList.contains(buttonClass)).toBeTruthy();
  });
  it('should render a large icon button', () => {
    const iconClass = 'gi-text-[24px]';
    const buttonClass = 'gi-icon-btn-large';

    const screen = renderIconButton({
      icon: {
        icon: IconId.ThumbUp,
      },
      size: ButtonSize.Large,
    });

    const iconElement = screen.getByTestId('govie-icon');
    const buttonElement = screen.getByTestId('govieIconButton', {
      exact: false,
    });

    expect(iconElement.classList.contains(iconClass)).toBeTruthy();
    expect(buttonElement.classList.contains(buttonClass)).toBeTruthy();
  });
  it('should render a regular icon button', () => {
    const iconClass = 'gi-text-[16px]';
    const buttonClass = 'gi-icon-btn-regular';

    const screen = renderIconButton({
      icon: {
        icon: IconId.ThumbUp,
      },
    });

    const iconElement = screen.getByTestId('govie-icon');
    const buttonElement = screen.getByTestId('govieIconButton', {
      exact: false,
    });

    expect(iconElement.classList.contains(iconClass)).toBeTruthy();
    expect(buttonElement.classList.contains(buttonClass)).toBeTruthy();
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderIconButton({
      icon: {
        icon: IconId.ThumbUp,
      },
    });

    await screen.axe();
  });
});
