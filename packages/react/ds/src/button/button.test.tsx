import { Icon } from '../icon/icon.js';
import { render, cleanup, testVariantsAxe } from '../test-utils.js';
import { Button } from './button.js';
import { ButtonProps, ButtonVariant, ButtonVariants } from './types.js';

const standardProps: ButtonProps = {
  children: 'Button Label',
  variant: 'primary',
};

describe('button', () => {
  afterEach(cleanup);
  const renderButton = ({ children, ...props }: ButtonProps) =>
    render(<Button {...props}>{children}</Button>);

  testVariantsAxe(ButtonVariants, (variant: ButtonVariant) =>
    renderButton({ ...standardProps, variant }),
  );

  it('should render the label', () => {
    const screen = renderButton(standardProps);
    const buttonElement = screen.getByText(standardProps.children as string);
    const primaryButtonElement = screen.getByTestId('primary', {
      exact: false,
    });
    expect(buttonElement).toBeTruthy();
    expect(primaryButtonElement).toBeTruthy();
  });

  it('should render a secondary button', () => {
    const propsSecondaryButton: ButtonProps = {
      ...standardProps,
      variant: 'secondary',
    };
    const screen = renderButton(propsSecondaryButton);
    const buttonElement = screen.getByTestId('secondary', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a flat button', () => {
    const propsFlatButton: ButtonProps = {
      ...standardProps,
      variant: 'flat',
    };
    const screen = renderButton(propsFlatButton);
    const buttonElement = screen.getByTestId('flat', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a button with default appearance', () => {
    const propsDefaultAppearance: ButtonProps = {
      ...standardProps,
      appearance: 'default',
    };
    const screen = renderButton(propsDefaultAppearance);
    const buttonElement = screen.getByTestId('default', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a button with light appearance', () => {
    const propsLightAppearance: ButtonProps = {
      ...standardProps,
      appearance: 'light',
    };
    const screen = renderButton(propsLightAppearance);
    const buttonElement = screen.getByTestId('light', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a button with dark appearance', () => {
    const propsDarkAppearance: ButtonProps = {
      ...standardProps,
      appearance: 'dark',
    };
    const screen = renderButton(propsDarkAppearance);
    const buttonElement = screen.getByTestId('dark', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a small button', () => {
    const propsSmallButton: ButtonProps = {
      ...standardProps,
      size: 'small',
    };
    const screen = renderButton(propsSmallButton);
    const buttonElement = screen.getByTestId('small', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a large button', () => {
    const propsLargeButton: ButtonProps = {
      ...standardProps,
      size: 'large',
    };
    const screen = renderButton(propsLargeButton);
    const buttonElement = screen.getByTestId('large', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a disabled button', () => {
    const propsDisabledButton: ButtonProps = {
      ...standardProps,
      disabled: true,
    };
    const screen = renderButton(propsDisabledButton);
    const buttonElement = screen.getByTestId('disabled', { exact: false });

    expect(buttonElement).toBeTruthy();
    expect(buttonElement).toBeDisabled();
  });

  it('should render a button with icon', () => {
    const { getByTestId } = renderButton({
      ...standardProps,
      children: <Icon icon="thumb_up" />,
    });

    const buttonElement = getByTestId('govie-icon');
    expect(buttonElement).toBeTruthy();
  });

  it('should pass axe tests', async () => {
    const screen = renderButton(standardProps);
    await screen.axe();
  });
});
