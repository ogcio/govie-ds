import { render, cleanup } from '../test-utils.js';
import { IconButtonType, IconButton } from './icon-button.js';

describe('icon-button', () => {
  afterEach(cleanup);
  const renderIconButton = (props: IconButtonType) =>
    render(<IconButton {...props} />);

  it('should render the icon', () => {
    const screen = renderIconButton({
      icon: {
        icon: 'thumb_up',
      },
    });
    const iconElement = screen.getByTestId('govie-icon');
    expect(iconElement).toBeTruthy();
  });
  it('should render a small icon button', () => {
    const buttonClass = 'gi-icon-btn-small';

    const screen = renderIconButton({
      icon: {
        icon: 'thumb_up',
      },
      size: 'small',
    });

    const iconElement = screen.getByTestId('govie-icon');
    const buttonElement = screen.getByTestId('govieIconButton', {
      exact: false,
    });

    expect(iconElement).toHaveStyle('font-size: 16px');
    expect(buttonElement.classList.contains(buttonClass)).toBeTruthy();
  });
  it('should render a large icon button', () => {
    const buttonClass = 'gi-icon-btn-large';

    const screen = renderIconButton({
      icon: {
        icon: 'thumb_up',
      },
      size: 'large',
    });

    const iconElement = screen.getByTestId('govie-icon');
    const buttonElement = screen.getByTestId('govieIconButton', {
      exact: false,
    });

    expect(iconElement).toHaveStyle('font-size: 24px');
    expect(buttonElement.classList.contains(buttonClass)).toBeTruthy();
  });
  it('should render a regular icon button', () => {
    const buttonClass = 'gi-icon-btn-regular';

    const screen = renderIconButton({
      icon: {
        icon: 'thumb_up',
      },
    });

    const iconElement = screen.getByTestId('govie-icon');
    const buttonElement = screen.getByTestId('govieIconButton', {
      exact: false,
    });

    expect(iconElement).toHaveStyle('font-size: 16px');
    expect(buttonElement.classList.contains(buttonClass)).toBeTruthy();
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderIconButton({
      icon: {
        icon: 'thumb_up',
      },
    });

    await screen.axe();
  });
});
