import { render, cleanup } from '../test-utils.js';
import {
  SummaryList,
  SummaryListRow,
  SummaryListValue,
  SummaryListAction,
} from './summary-list.js';
import type { SummaryListProps } from './types.js';

describe('govieSummaryList', () => {
  afterEach(cleanup);

  const renderSummaryList = (props: SummaryListProps) =>
    render(<SummaryList {...props} />);

  it('should render SummaryList and its rows correctly', () => {
    const screen = renderSummaryList({
      children: [
        <SummaryListRow label="Name" key="1">
          <SummaryListValue>John Smith</SummaryListValue>
          <SummaryListAction href="/change-name">Change name</SummaryListAction>
        </SummaryListRow>,
        <SummaryListRow label="Date of Birth" key="2">
          <SummaryListValue>8 November 1982</SummaryListValue>
          <SummaryListAction href="/change-dob">
            Change date of birth
          </SummaryListAction>
        </SummaryListRow>,
      ],
    });

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
    expect(screen.getByText('Change name')).toBeInTheDocument();

    expect(screen.getByText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByText('8 November 1982')).toBeInTheDocument();
    expect(screen.getByText('Change date of birth')).toBeInTheDocument();
  });

  it('should render correctly a row without an action', () => {
    const screen = renderSummaryList({
      children: [
        <SummaryListRow label="Address" key="1">
          <SummaryListValue>
            {['72 Guild Street', 'London', 'SE23 6FH']}
          </SummaryListValue>
        </SummaryListRow>,
      ],
    });

    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('72 Guild Street')).toBeInTheDocument();
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('SE23 6FH')).toBeInTheDocument();
  });

  it('should render correctly with `withBorder` prop', () => {
    const screen = renderSummaryList({
      children: [
        <SummaryListRow label="Contact Details" withBorder key="1">
          <SummaryListValue>
            {['07700 900900', 'john.smith@example.com']}
          </SummaryListValue>
        </SummaryListRow>,
      ],
    });

    const row = screen.getByText('Contact Details').closest('dl');
    expect(row).toHaveAttribute('data-border', 'true');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderSummaryList({
      children: [
        <SummaryListRow label="Name" key="1">
          <SummaryListValue>John Smith</SummaryListValue>
          <SummaryListAction href="/change-name">Change name</SummaryListAction>
        </SummaryListRow>,
      ],
    });

    await screen.axe();
  });
});
