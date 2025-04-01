import { render, cleanup } from '../test-utilities.js';
import { TableContent } from './table-content.js';
import { Table, TableProps } from './table.js';

describe('table', () => {
  afterEach(cleanup);
  const renderTable = (props: TableProps) => render(<Table {...props} />);

  it('should render table', () => {
    const screen = renderTable({
      children: TableContent,
    });
    expect(screen.getByText('This is the table head')).toBeTruthy();
  });

  it('should pass axe tests', async () => {
    const screen = renderTable({
      children: TableContent,
    });

    await screen.axe();
  });
});
