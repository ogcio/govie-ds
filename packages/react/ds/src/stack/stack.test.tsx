import { render, cleanup } from '../test-utils.js';
import { Stack } from './stack.js';
import type { StackProps } from './types.js';

describe('govieStack', () => {
  afterEach(cleanup);
  const renderStack = (props: StackProps) => render(<Stack {...props} />);

  it('should Stack items render correctly', () => {
    const screen = renderStack({
      direction: 'column',
      itemsAlignment: 'center',
      itemsDistribution: 'end',
      gap: 1,
      children: [<div>item 1</div>, <div>item 2</div>, <div>item 3</div>],
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
      children: [<div>item 1</div>, <div>item 2</div>, <div>item 3</div>],
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
      children: [<div>item 1</div>, <div>item 2</div>, <div>item 3</div>],
    });

    await screen.axe();
  });
});
