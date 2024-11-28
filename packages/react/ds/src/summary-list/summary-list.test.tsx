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
    const { getByText } = renderSummaryList({
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

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('John Smith')).toBeInTheDocument();
    expect(getByText('Change name')).toBeInTheDocument();

    expect(getByText('Date of Birth')).toBeInTheDocument();
    expect(getByText('8 November 1982')).toBeInTheDocument();
    expect(getByText('Change date of birth')).toBeInTheDocument();
  });

  it('should render correctly a row without an action', () => {
    const { getByText } = renderSummaryList({
      children: [
        <SummaryListRow label="Address" key="1">
          <SummaryListValue>
            72 Guild Street
            <br />
            London
            <br />
            SE23 6FH
          </SummaryListValue>
        </SummaryListRow>,
      ],
    });

    expect(getByText('Address')).toBeInTheDocument();
    expect(getByText('72 Guild Street', { exact: false })).toBeInTheDocument();
    expect(getByText('London', { exact: false })).toBeInTheDocument();
    expect(getByText('SE23 6FH', { exact: false })).toBeInTheDocument();
  });

  it('should render correctly with `withBorder` prop', () => {
    const { getByText } = renderSummaryList({
      children: [
        <SummaryListRow label="Contact Details" withBorder key="1">
          <SummaryListValue>
            07700 900900
            <br />
            john.smith@example.com
          </SummaryListValue>
        </SummaryListRow>,
      ],
    });

    const row = getByText('Contact Details').closest('dl');
    expect(row).toHaveAttribute('data-border', 'true');
  });

  it('should pass axe accessibility tests', async () => {
    const { axe } = renderSummaryList({
      children: [
        <SummaryListRow label="Name" key="1">
          <SummaryListValue>John Smith</SummaryListValue>
          <SummaryListAction href="/change-name">Change name</SummaryListAction>
        </SummaryListRow>,
      ],
    });

    await axe();
  });
});
