import { ButtonVariants } from '../button/types.js';
import {
  renderComponent,
  cleanup,
  testVariantsAxe,
} from '../test-utilities.test.js';
import { IconButtonProps, IconButton } from './icon-button.js';

describe('icon-button', () => {
  afterEach(cleanup);
  const renderIconButton = (props: IconButtonProps) =>
    renderComponent(<IconButton {...props} />);

  testVariantsAxe(ButtonVariants, (variant) =>
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
      dataTestid: 'govieIconButton',
    });

    const iconElement = screen.getByTestId('govie-icon');
    const buttonElement = screen.getByTestId('govieIconButton');

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
      dataTestid: 'govieIconButton',
    });

    const iconElement = screen.getByTestId('govie-icon');
    const buttonElement = screen.getByTestId('govieIconButton');

    expect(iconElement).toHaveStyle('font-size: 24px');
    expect(buttonElement.classList.contains(buttonClass)).toBeTruthy();
  });
  it('should render a regular icon button', () => {
    const buttonClass = 'gi-icon-btn-regular';

    const screen = renderIconButton({
      icon: {
        icon: 'thumb_up',
      },
      dataTestid: 'govieIconButton',
    });

    const iconElement = screen.getByTestId('govie-icon');
    const buttonElement = screen.getByTestId('govieIconButton');

    expect(iconElement).toHaveStyle('font-size: 24px');
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
