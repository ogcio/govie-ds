import { ErrorText } from '../error-text/error-text.js';
import { HintText } from '../hint-text/hint-text.js';
import { Label } from '../label/label.js';
import { cleanup, render } from '../test-utils.js';
import { Select, SelectItem } from './select.js';

const standardSelect = (
  <>
    <Label text="Label-text" />
    <Select aria-label="Select">
      <SelectItem value="value-1">Default select</SelectItem>
      <SelectItem value="value-2">Option 2</SelectItem>
      <SelectItem value="value-3">Option 3</SelectItem>
    </Select>
  </>
);

const selectWithHint = (
  <>
    <Label text="Label-text" />
    <HintText text="Hint Text" />
    <Select aria-label="Select">
      <SelectItem value="value-1">Default Select</SelectItem>
      <SelectItem value="value-2">Option 2</SelectItem>
      <SelectItem value="value-3">Option 3</SelectItem>
    </Select>
  </>
);

const selectWithError = (
  <>
    <Label text="Label-text" />
    <ErrorText text="Error Text" />
    <Select aria-label="Select">
      <SelectItem value="value-1">Default Select</SelectItem>
      <SelectItem value="value-2">Option 2</SelectItem>
      <SelectItem value="value-3">Option 3</SelectItem>
    </Select>
  </>
);

describe('select', () => {
  afterEach(cleanup);

  it('should render the label', () => {
    const screen = render(standardSelect);
    const labelElement = screen.getByText('Label-text');
    expect(labelElement).toBeTruthy();
  });

  it('should render the default option', () => {
    const screen = render(standardSelect);
    const defaultSelectElement = screen.getByText('Default select');
    expect(defaultSelectElement).toBeTruthy();
  });

  it('should render the options', () => {
    const screen = render(standardSelect);
    const options = screen.baseElement.querySelectorAll('option');
    for (const option in options) {
      expect(option).toBeTruthy();
    }
  });

  it('should render the hint text', () => {
    const screen = render(selectWithHint);
    const hintElement = screen.getByText('Hint Text');
    expect(hintElement).toBeTruthy();
  });

  it('should render the error text', () => {
    const screen = render(selectWithError);

    const errorElement = screen.getByText('Error Text');
    expect(errorElement).toBeTruthy();
  });

  it('should pass axe tests', async () => {
    const screen = render(standardSelect);
    await screen.axe();
  });
});
