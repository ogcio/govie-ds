import { act } from 'react';
import { render, cleanup, waitFor } from '../test-utils.js';
import { Details } from './details.js';

describe('Details', () => {
  afterEach(cleanup);

  const renderDetails = (props: any) =>
    render(
      <Details {...props}>
        Here is the body content of the details element.
      </Details>,
    );

  it('should render the details element with the correct label', () => {
    const screen = renderDetails({
      label: 'Help with Details',
      startsOpen: false,
    });

    const detailsElement = screen.getByTestId('govie-details');
    const summaryElement = screen.getByTestId('govie-details-summary');

    expect(detailsElement).toBeTruthy();
    expect(summaryElement.textContent).toBe('Help with Details');
  });

  it('should render with startsOpen set to true', () => {
    const screen = renderDetails({
      label: 'Help with Details',
      startsOpen: true,
    });

    const detailsElement = screen.getByTestId('govie-details');
    expect(detailsElement.hasAttribute('open')).toBe(true);
  });

  it('should toggle open state on summary click', async () => {
    const screen = renderDetails({
      label: 'Help with Details',
      startsOpen: false,
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
      startsOpen: true,
    });

    const contentElement = screen.getByText(
      'Here is the body content of the details element.',
    );

    expect(contentElement).toBeTruthy();
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderDetails({
      label: 'Help with Details',
      startsOpen: false,
    });
    await screen.axe();
  });
});
