import { createRef } from 'react';
import { renderComponent, cleanup, fireEvent } from '../test-utilities.js';
import { InputPassword } from './input-password.js';

describe('InputPassword', () => {
  afterEach(cleanup);

  const renderInput = (props = {}) =>
    renderComponent(<InputPassword aria-label="Password Input" {...props} />);

  it('should render a password input with a visibility toggle button', () => {
    const screen = renderInput();
    const inputElement = screen.getByLabelText('Password Input');
    const toggleButton = screen.getByRole('button');

    expect(inputElement).toBeTruthy();
    expect(inputElement).toHaveAttribute('type', 'password');
    expect(toggleButton).toBeTruthy();
  });

  it('should toggle input type between password and text when clicking the visibility button', () => {
    const screen = renderInput();
    const inputElement = screen.getByLabelText('Password Input');
    const toggleButton = screen.getByRole('button');

    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('should support ref forwarding to the underlying input element', () => {
    const ref = createRef<HTMLInputElement>();
    const screen = renderComponent(
      <InputPassword aria-label="Password Input" ref={ref} />,
    );

    const inputElement = screen.getByLabelText('Password Input');
    expect(ref.current).toBe(inputElement);
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderInput();
    await screen.axe();
  });
});
