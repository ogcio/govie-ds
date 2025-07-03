import { act } from 'react';
import { renderComponent, cleanup, waitFor } from '../test-utilities.js';
import { Details, DetailsProps } from './details.js';

describe('Details', () => {
  afterEach(cleanup);

  const renderDetails = (props: DetailsProps) =>
    renderComponent(
      <Details {...props}>
        Here is the body content of the details element.
      </Details>,
    );

  it('should render the details element with the correct label', () => {
    const screen = renderDetails({
      label: 'Help with Details',
      open: false,
    });

    const detailsElement = screen.getByTestId('govie-details');
    const summaryElement = screen.getByTestId('govie-details-summary');

    expect(detailsElement).toBeTruthy();
    expect(summaryElement.textContent).toContain('Help with Details');
  });

  it('should render with open set to true', () => {
    const screen = renderDetails({
      label: 'Help with Details',
      open: true,
    });

    const detailsElement = screen.getByTestId('govie-details');
    expect(detailsElement.hasAttribute('open')).toBe(true);
  });

  it('should toggle open state on summary click', async () => {
    const screen = renderDetails({
      label: 'Help with Details',
      open: false,
    });

    const detailsElement = screen.getByTestId('govie-details');
    const summaryElement = screen.getByTestId('govie-details-summary');

    expect(detailsElement.hasAttribute('open')).toBe(false);

    await act(async () => {
      summaryElement.click();
    });

    await waitFor(() => {
      expect(detailsElement.hasAttribute('open')).toBe(true);
    });

    await act(async () => {
      summaryElement.click();
    });

    await waitFor(() => {
      expect(detailsElement.hasAttribute('open')).toBe(false);
    });
  });

  it('should render the children inside the details element', () => {
    const screen = renderDetails({
      label: 'Help with Details',
      open: true,
    });

    const contentElement = screen.getByText(
      'Here is the body content of the details element.',
    );

    expect(contentElement).toBeTruthy();
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderDetails({
      label: 'Help with Details',
      open: false,
    });
    await screen.axe();
  });
});
