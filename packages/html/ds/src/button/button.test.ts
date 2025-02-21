import { render } from '../common/render';
import { testVariantsAxe } from '../helpers/test-helpers';
import buttonHtml from '../icon/icon.html?raw';
import { IconId, IconProps } from '../icon/icon.schema';
import {
  ButtonSize,
  ButtonVariant,
  ButtonProps,
  ButtonAppearance,
} from './button-schema';
import html from './button.html?raw';

const standardProps = {
  content: 'Button Label',
  variant: ButtonVariant.Primary,
  dataTestid: 'govie-button',
};

describe('button', () => {
  const renderButton = render<ButtonProps>({
    componentName: 'button',
    macroName: 'govieButton',
    html,
  });

  testVariantsAxe(
    [ButtonVariant.Flat, ButtonVariant.Primary, ButtonVariant.Secondary],
    (variant: (typeof ButtonVariant)[keyof typeof ButtonVariant]) =>
      renderButton({ ...standardProps, variant }),
  );

  const renderIcon = render<IconProps>({
    componentName: 'icon',
    macroName: 'govieIcon',
    html: buttonHtml,
  });

  it('should render the label', () => {
    const screen = renderButton(standardProps);
    const buttonElement = screen.getByText(standardProps.content);
    expect(buttonElement).toBeTruthy();
  });

  it('should render a primary button', () => {
    const screen = renderButton(standardProps);
    const buttonElement = screen.getByTestId('govie-button');
    expect(buttonElement).toBeTruthy();
  });

  it('should render a secondary button', () => {
    const propsSecondaryButton = {
      ...standardProps,
      variant: ButtonVariant.Secondary,
    };
    const screen = renderButton(propsSecondaryButton);
    const buttonElement = screen.getByTestId('govie-button');
    expect(buttonElement).toBeTruthy();
  });

  it('should render a flat button', () => {
    const propsFlatButton = {
      ...standardProps,
      variant: ButtonVariant.Flat,
    };
    const screen = renderButton(propsFlatButton);
    const buttonElement = screen.getByTestId('govie-button');
    expect(buttonElement).toBeTruthy();
  });

  it('should render a button with default appearance', () => {
    const propsDefaultAppearance = {
      ...standardProps,
      appearance: ButtonAppearance.Default,
    };
    const screen = renderButton(propsDefaultAppearance);
    const buttonElement = screen.getByTestId('govie-button');
    expect(buttonElement).toBeTruthy();
  });

  it('should render a button with light appearance', () => {
    const propsLightAppearance = {
      ...standardProps,
      appearance: ButtonAppearance.Light,
    };
    const screen = renderButton(propsLightAppearance);
    const buttonElement = screen.getByTestId('govie-button');
    expect(buttonElement).toBeTruthy();
  });

  it('should render a button with dark appearance', () => {
    const propsDarkAppearance = {
      ...standardProps,
      appearance: ButtonAppearance.Dark,
    };
    const screen = renderButton(propsDarkAppearance);
    const buttonElement = screen.getByTestId('govie-button');
    expect(buttonElement).toBeTruthy();
  });

  it('should render a small button', () => {
    const propsSmallButton = {
      ...standardProps,
      size: ButtonSize.Small,
    };
    const screen = renderButton(propsSmallButton);
    const buttonElement = screen.getByTestId('govie-button');
    expect(buttonElement).toBeTruthy();
  });

  it('should render a large button', () => {
    const propsLargeButton = {
      ...standardProps,
      size: ButtonSize.Large,
    };
    const screen = renderButton(propsLargeButton);
    const buttonElement = screen.getByTestId('govie-button');
    expect(buttonElement).toBeTruthy();
  });

  it('should render a disabled button', () => {
    const propsDisabledButton = {
      ...standardProps,
      disabled: true,
    };
    const screen = renderButton(propsDisabledButton);
    const buttonElement = screen.getByTestId('govie-button');
    expect(buttonElement).toBeTruthy();
  });

  it('should render a button with icon', () => {
    const iconScreen = renderIcon({
      icon: IconId.ThumbDown,
    });
    const propsIconButton = {
      content: iconScreen.container.innerHTML + 'button',
    };

    const buttonScreen = renderButton(propsIconButton);
    const buttonElement = buttonScreen.getByTestId('govie-icon');
    expect(buttonElement).toBeTruthy();
  });

  it('should render aria attributes correctly', () => {
    const propsWithAria = {
      ...standardProps,
      aria: {
        'aria-disabled': 'true',
        'aria-expanded': 'false',
        'aria-controls': 'menu1',
      },
    };

    const screen = renderButton(propsWithAria);

    // Check if ARIA attributes are rendered correctly
    const buttonElement = screen.getByText(standardProps.content);

    expect(buttonElement).toHaveAttribute('aria-disabled', 'true');
    expect(buttonElement).toHaveAttribute('aria-expanded', 'false');
    expect(buttonElement).toHaveAttribute('aria-controls', 'menu1');
  });

  it('should pass axe tests', async () => {
    const screen = renderButton(standardProps);
    await screen.axe();
  });
});
