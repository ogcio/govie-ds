import { render } from '../common/render';
import html from './table.html?raw';
import { TableProps } from './table.schema';

describe('govieTable', () => {
  const renderTable = render<TableProps>({
    componentName: 'table',
    macroName: 'govieTable',
    html,
  });

  it('should render headers correctly', () => {
    const { getByText } = renderTable({
      captionText: 'Example Table',
      headers: ['Name', 'Email', 'Role'],
      rows: [
        ['John Doe', 'john.doe@example.com', 'Admin'],
        ['Jane Smith', 'jane.smith@example.com', 'User'],
      ],
    });

    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Role')).toBeInTheDocument();
  });

  it('should render rows correctly', () => {
    const { getByText } = renderTable({
      captionText: 'Example Table',
      headers: ['Name', 'Email', 'Role'],
      rows: [
        ['John Doe', 'john.doe@example.com', 'Admin'],
        ['Jane Smith', 'jane.smith@example.com', 'User'],
      ],
    });

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('john.doe@example.com')).toBeInTheDocument();
    expect(getByText('Admin')).toBeInTheDocument();

    expect(getByText('Jane Smith')).toBeInTheDocument();
    expect(getByText('jane.smith@example.com')).toBeInTheDocument();
    expect(getByText('User')).toBeInTheDocument();
  });

  it('should render the caption correctly', () => {
    const { getByText } = renderTable({
      captionText: 'Table Caption Example',
      headers: ['Header1', 'Header2'],
      rows: [['Cell1', 'Cell2']],
    });

    const caption = getByText('Table Caption Example');
    expect(caption).toBeInTheDocument();
    expect(caption.tagName).toBe('CAPTION');
  });

  it('should render "No data" message when rows are empty', () => {
    const { getByText } = renderTable({
      captionText: 'Empty Table',
      headers: ['Column1', 'Column2', 'Column3'],
      rows: [],
    });

    const noDataMessage = getByText('No data to display');
    expect(noDataMessage).toBeInTheDocument();
    expect(noDataMessage.tagName).toBe('TD');
    expect(noDataMessage).toHaveAttribute('colspan', '3');
  });

  it('should apply aria-rowcount and aria-colcount attributes', () => {
    const { getByRole } = renderTable({
      captionText: 'Aria Attributes Table',
      headers: ['Header1', 'Header2', 'Header3'],
      rows: [
        ['Cell1', 'Cell2', 'Cell3'],
        ['Cell4', 'Cell5', 'Cell6'],
      ],
      aria: {
        'aria-rowcount': '3',
        'aria-colcount': '3',
      },
    });

    const table = getByRole('table');
    expect(table).toBeInTheDocument();
    expect(table.getAttribute('aria-rowcount')).toBe('3');
    expect(table.getAttribute('aria-colcount')).toBe('3');
  });

  it('should pass axe tests', async () => {
    const screen = renderTable({
      captionText: 'Accessible Table',
      headers: ['Column1', 'Column2'],
      rows: [['Cell1', 'Cell2']],
    });

    await screen.axe();
  });
});
