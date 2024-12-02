import { render } from '../common/render';
import html from './summary-list.html?raw';
import { SummaryListProps } from './summary-list.schema';

describe('govieSummaryList', () => {
  const renderSummaryList = render<SummaryListProps>({
    componentName: 'summary-list',
    macroName: 'govieSummaryList',
    html,
  });

  it('should render rows correctly', () => {
    const { getByText } = renderSummaryList({
      rows: [
        {
          label: 'Name',
          value: 'John Smith',
          action: { href: '/change-name', label: 'Change name' },
        },
        {
          label: 'Date of birth',
          value: '8 November 1982',
          action: { href: '/change-dob', label: 'Change date of birth' },
        },
        {
          label: 'Address',
          value: '72 Guild Street London <br/> SE23 6FH',
          action: { href: '/change-address', label: 'Change address' },
        },
      ],
    });

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('John Smith')).toBeInTheDocument();

    expect(getByText('Date of birth')).toBeInTheDocument();
    expect(getByText('8 November 1982')).toBeInTheDocument();

    expect(getByText('Address')).toBeInTheDocument();
    expect(getByText('72 Guild Street', { exact: false })).toBeInTheDocument();
    expect(getByText('London', { exact: false })).toBeInTheDocument();
    expect(getByText('SE23 6FH', { exact: false })).toBeInTheDocument();
  });

  it('should pass axe tests', async () => {
    const screen = renderSummaryList({
      rows: [
        {
          label: 'Name',
          value: 'John Smith',
          action: { href: '/change-name', label: 'Change name' },
        },
        {
          label: 'Date of birth',
          value: '8 November 1982',
          action: { href: '/change-dob', label: 'Change date of birth' },
        },
        {
          label: 'Address',
          value: '72 Guild Street London <br/> SE23 6FH',
          action: { href: '/change-address', label: 'Change address' },
        },
      ],
    });
    await screen.axe();
  });
});
