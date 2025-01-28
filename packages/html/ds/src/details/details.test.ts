import { render } from '../common/render';
import html from './details.html?raw';
import { DetailsProps } from './details.schema';

const standardProps: DetailsProps = {
  label: 'Help with Details',
  startsOpen: false,
  children: 'Here is the body content of the details element.',
};

describe('Details Macro', () => {
  const renderDetails = render<DetailsProps>({
    componentName: 'details',
    macroName: 'govieDetails',
    html,
  });

  it('should render the details element with the correct label', () => {
    const screen = renderDetails(standardProps);

    const detailsElement = screen.getByTestId('govie-details');
    const summaryElement = screen.getByTestId('govie-details-summary');

    expect(detailsElement).toBeTruthy();
    expect(summaryElement.textContent?.trim()).toBe(standardProps.label);
  });

  it('should render with startsOpen set to true', () => {
    const screen = renderDetails({
      ...standardProps,
      startsOpen: true,
    });

    const detailsElement = screen.getByTestId('govie-details');
    expect(detailsElement.hasAttribute('open')).toBe(true);
  });

  it('should toggle open state on summary click', async () => {
    const screen = renderDetails(standardProps);

    const detailsElement = screen.getByTestId('govie-details');
    const summaryElement = screen.getByTestId('govie-details-summary');

    expect(detailsElement.hasAttribute('open')).toBe(false);
    summaryElement.click();

    expect(detailsElement.hasAttribute('open')).toBe(true);
    summaryElement.click();

    expect(detailsElement.hasAttribute('open')).toBe(false);
  });

  it('should render the children content', () => {
    const screen = renderDetails(standardProps);

    const contentElement = screen.getByText(
      'Here is the body content of the details element.',
    );

    expect(contentElement).toBeTruthy();
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderDetails(standardProps);

    await screen.axe();
  });
});
