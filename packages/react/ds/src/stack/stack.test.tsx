import { render, cleanup } from '../test-utilities.js';
import { Stack } from './stack.js';
import type { StackProps } from './types.js';

describe('govieStack', () => {
  afterEach(cleanup);
  const renderStack = (props: StackProps) =>
    render(<Stack {...props} data-testid="govie-stack" />);
  const children = [
    <div key="stack_1">item 1</div>,
    <div key="stack_2">item 2</div>,
    <div key="stack_3">item 3</div>,
  ];

  it('should Stack items render correctly', () => {
    const screen = renderStack({
      direction: 'column',
      itemsAlignment: 'center',
      itemsDistribution: 'end',
      gap: 1,
      children,
    });
    expect(screen.getByTestId('govie-stack')).toBeInTheDocument();
    expect(screen.getByTestId('govie-stack-item-0')).toBeInTheDocument();
    expect(screen.getByTestId('govie-stack-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('govie-stack-item-2')).toBeInTheDocument();
  });

  it('should Stack items render correctly with breakpoint configuration', () => {
    const screen = renderStack({
      direction: {
        base: 'column',
        md: 'row',
      },
      gap: {
        sm: 2,
        xs: 1,
        md: 3,
      },
      itemsAlignment: 'start',
      itemsDistribution: 'start',
      children,
    });
    expect(screen.getByTestId('govie-stack')).toBeInTheDocument();
    expect(screen.getByTestId('govie-stack-item-0')).toBeInTheDocument();
    expect(screen.getByTestId('govie-stack-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('govie-stack-item-2')).toBeInTheDocument();
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderStack({
      direction: 'column',
      itemsAlignment: 'start',
      itemsDistribution: 'start',
      children,
    });

    await screen.axe();
  });
});
