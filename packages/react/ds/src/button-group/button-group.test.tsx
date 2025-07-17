import { userEvent } from '@testing-library/user-event';
import { renderComponent, cleanup } from '../test-utilities.js';
import { ButtonGroup, ButtonGroupItem } from './button-group.js';

describe('buttonGroup', () => {
  afterEach(cleanup);

  it('should render the button group', () => {
    const screen = renderComponent(
      <ButtonGroup name="test" size="medium" defaultValue="1">
        <ButtonGroupItem value="1">Button 1</ButtonGroupItem>
        <ButtonGroupItem value="2">Button 2</ButtonGroupItem>
      </ButtonGroup>,
    );
    const buttonOneElement = screen.getByText('Button 1');
    const buttonTwoElement = screen.getByText('Button 2');

    expect(buttonOneElement).toBeDefined();
    expect(buttonOneElement).toHaveClass('gi-btn-primary-dark');
    expect(buttonOneElement).toHaveAttribute('aria-checked', 'true');

    expect(buttonTwoElement).toBeDefined();
    expect(buttonTwoElement).not.toHaveClass('gi-btn-primary-dark');
    expect(buttonTwoElement).toHaveAttribute('aria-checked', 'false');
  });

  it('should not submit the form on press a button group items', async () => {
    const onSubmitSpy = vi.fn();
    const user = userEvent.setup();
    const screen = renderComponent(
      <form onSubmit={onSubmitSpy}>
        <ButtonGroup name="test" size="medium" defaultValue="1">
          <ButtonGroupItem value="1">Button 1</ButtonGroupItem>
          <ButtonGroupItem value="2">Button 2</ButtonGroupItem>
        </ButtonGroup>
        ,
      </form>,
    );
    const buttonOneElement = screen.getByText('Button 1');
    const buttonTwoElement = screen.getByText('Button 2');

    await user.click(buttonOneElement);
    await user.click(buttonTwoElement);

    expect(onSubmitSpy).toBeCalledTimes(0);
  });
});
