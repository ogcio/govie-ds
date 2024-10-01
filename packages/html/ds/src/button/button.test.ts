import { render } from '../common/render';
import { IconId } from '../icon/icon.schema';
import {
  ButtonSize,
  ButtonVariant,
  IconPosition,
  ButtonProps,
} from './button-schema';
import html from './button.html?raw';

const standardProps = {
  label: 'Button Label',
  variant: ButtonVariant.Primary,
};

describe('button', () => {
  const renderButton = render<ButtonProps>({
    componentName: 'button',
    macroName: 'govieButton',
    html,
  });

  it('should render the label', () => {
    const screen = renderButton(standardProps);
    const buttonElement = screen.getByText(standardProps.label);
    expect(buttonElement).toBeTruthy();
  });

  it('should render a primary button', () => {
    const screen = renderButton(standardProps);
    const buttonElement = screen.getByTestId('primary', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a secondary button', () => {
    const propsSecondaryButton = {
      ...standardProps,
      variant: ButtonVariant.Secondary,
    };
    const screen = renderButton(propsSecondaryButton);
    const buttonElement = screen.getByTestId('secondary', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a tertiary button', () => {
    const propsTertiaryButton = {
      ...standardProps,
      variant: ButtonVariant.Tertiary,
    };
    const screen = renderButton(propsTertiaryButton);
    const buttonElement = screen.getByTestId('tertiary', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a flat button', () => {
    const propsFlatButton = {
      ...standardProps,
      variant: ButtonVariant.Flat,
    };
    const screen = renderButton(propsFlatButton);
    const buttonElement = screen.getByTestId('flat', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render an outlined button', () => {
    const propsOutlinedButton = {
      ...standardProps,
      variant: ButtonVariant.Outlined,
    };
    const screen = renderButton(propsOutlinedButton);
    const buttonElement = screen.getByTestId('outlined', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a small button', () => {
    const propsSmallButton = {
      ...standardProps,
      size: ButtonSize.Small,
    };
    const screen = renderButton(propsSmallButton);
    const buttonElement = screen.getByTestId('small', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a large button', () => {
    const propsLargeButton = {
      ...standardProps,
      size: ButtonSize.Large,
    };
    const screen = renderButton(propsLargeButton);
    const buttonElement = screen.getByTestId('large', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a disabled button', () => {
    const propsDisabledButton = {
      ...standardProps,
      disabled: true,
    };
    const screen = renderButton(propsDisabledButton);
    const buttonElement = screen.getByTestId('disabled', { exact: false });
    expect(buttonElement).toBeTruthy();
  });

  it('should render a button with icon', () => {
    const propsIconButton = {
      ...standardProps,
      icon: {
        props: {
          icon: IconId.ThumbUp,
        },
      },
    };
    const screen = renderButton(propsIconButton);
    const buttonElement = screen.getByTestId('govie-icon');
    expect(buttonElement).toBeTruthy();
  });

  it('should render a button with icon on right position', () => {
    const propsIconButtonRight = {
      ...standardProps,
      icon: {
        props: {
          icon: IconId.ThumbUp,
        },
        position: IconPosition.Right,
      },
    };
    const screen = renderButton(propsIconButtonRight);
    const iconElement = screen.getByTestId('govie-icon');
    const buttonElementClasses = screen.getByTestId('govieButton', {
      exact: false,
    }).className;
    expect(iconElement).toBeTruthy();
    expect(buttonElementClasses.includes('gi-flex-row-reverse')).toBeTruthy();
  });
});
