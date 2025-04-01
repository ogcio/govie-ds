import { renderComponent, cleanup } from '../test-utilities.js';
import { LabelProps, LabelSize, Label } from './label.js';

describe('govieLabel', () => {
  afterEach(cleanup);
  const renderLabel = (props: LabelProps) =>
    renderComponent(<Label {...props} />);

  it('should render a label with the correct content', () => {
    const screen = renderLabel({
      text: 'This is a label',
      size: LabelSize.Medium,
      htmlFor: 'input-id',
    });
    const labelElement = screen.getByText('This is a label');
    expect(labelElement).toBeTruthy();
    expect(labelElement.tagName).toBe('LABEL');
    expect(labelElement.getAttribute('for')).toBe('input-id');
  });

  it('should have the correct size class for "lg"', () => {
    const screen = renderLabel({
      text: 'Large label',
      size: LabelSize.Large,
      htmlFor: 'input-id',
    });
    const labelElement = screen.getByText('Large label');

    expect(labelElement.classList.contains('gi-text-lg')).toBe(true);
  });

  it('should have the correct size class for "md"', () => {
    const screen = renderLabel({
      text: 'Medium label',
      size: LabelSize.Medium,
      htmlFor: 'input-id',
    });
    const labelElement = screen.getByText('Medium label');

    expect(labelElement.classList.contains('gi-text-md')).toBe(true);
  });

  it('should have the correct size class for "sm"', () => {
    const screen = renderLabel({
      text: 'Small label',
      size: LabelSize.Small,
      htmlFor: 'input-id',
    });
    const labelElement = screen.getByText('Small label');

    expect(labelElement.classList.contains('gi-text-sm')).toBe(true);
  });

  it('should associate the label with the correct input field using "for"', () => {
    const screen = renderLabel({
      text: 'Label for input',
      size: LabelSize.Medium,
      htmlFor: 'test-input',
    });
    const labelElement = screen.getByText('Label for input');

    expect(labelElement.getAttribute('for')).toBe('test-input');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderLabel({
      text: 'Accessible label',
      size: LabelSize.Medium,
      htmlFor: 'input-id',
    });

    await screen.axe();
  });
});
