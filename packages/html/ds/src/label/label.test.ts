import { render } from '../common/render';
import html from './label.html?raw';
import { LabelProps, LabelSize } from './label.schema';

describe('govieLabel', () => {
  const renderLabel = render<LabelProps>({
    componentName: 'label',
    macroName: 'govieLabel',
    html,
  });

  it('should render a label with the correct content', () => {
    const screen = renderLabel({
      content: 'This is a label',
      size: LabelSize.Medium,
      for: 'input-id',
    });
    const labelElement = screen.getByText('This is a label');
    expect(labelElement).toBeTruthy();
    expect(labelElement.tagName).toBe('LABEL');
    expect(labelElement.getAttribute('for')).toBe('input-id');
  });

  it('should have the correct size class for "lg"', () => {
    const screen = renderLabel({
      content: 'Large label',
      size: LabelSize.Large,
      for: 'input-id',
    });
    const labelElement = screen.getByText('Large label');

    expect(labelElement.classList.contains('gi-text-lg')).toBe(true);
  });

  it('should have the correct size class for "md"', () => {
    const screen = renderLabel({
      content: 'Medium label',
      size: LabelSize.Medium,
      for: 'input-id',
    });
    const labelElement = screen.getByText('Medium label');

    expect(labelElement.classList.contains('gi-text-md')).toBe(true);
  });

  it('should have the correct size class for "sm"', () => {
    const screen = renderLabel({
      content: 'Small label',
      size: LabelSize.Small,
      for: 'input-id',
    });
    const labelElement = screen.getByText('Small label');

    expect(labelElement.classList.contains('gi-text-sm')).toBe(true);
  });

  it('should associate the label with the correct input field using "for"', () => {
    const screen = renderLabel({
      content: 'Label for input',
      size: LabelSize.Medium,
      for: 'test-input',
    });
    const labelElement = screen.getByText('Label for input');

    expect(labelElement.getAttribute('for')).toBe('test-input');
  });

  it('should safely render HTML content', () => {
    const screen = renderLabel({
      content: '<strong>Strong label</strong>',
      size: LabelSize.Medium,
      for: 'input-id',
    });

    const labelElement = screen.getByText('Strong label');
    expect(labelElement).toBeTruthy();
    expect(labelElement.innerHTML).toContain('Strong label');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderLabel({
      content: 'Accessible label',
      size: LabelSize.Medium,
      for: 'input-id',
    });

    await screen.axe();
  });
});
