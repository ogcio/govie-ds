import { cleanup, render } from '../test-utils.js';
import { ProgressBar, ProgressBarProps } from './progress-bar.js';

describe('ProgressBar', () => {
  afterEach(cleanup);

  const renderProgressBar = (props: ProgressBarProps) =>
    render(<ProgressBar {...props} />);

  it('should render a progress bar with a specified value', () => {
    const screen = renderProgressBar({
      currentValue: 50,
      size: 'md',
      color: 'blue',
    });

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeTruthy();

    const progressBarInner = progressBar.firstElementChild;
    expect(progressBarInner).toBeTruthy();
    expect(progressBarInner).toHaveStyle('width: 50%');
    expect(progressBarInner).toHaveClass('gi-bg-blue-500', 'gi-h-4');
  });

  it('should render an indeterminate progress bar correctly', () => {
    const screen = renderProgressBar({
      isIndeterminate: true,
      size: 'lg',
      color: 'green',
    });

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeTruthy();

    const progressBarInner = progressBar.firstElementChild;
    expect(progressBarInner).toBeTruthy();
    expect(progressBarInner).toHaveClass(
      'gi-progress-bar-indeterminate',
      'gi-bg-emerald-800',
      'gi-h-6',
    );
  });

  it('should render progress bar with final value set', () => {
    const screen = renderProgressBar({
      finalValue: 500,
      currentValue: 200,
      size: 'lg',
      color: 'green',
    });

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeTruthy();

    const progressBarInner = progressBar.firstElementChild;

    console.log(progressBarInner);
    expect(progressBarInner).toBeTruthy();
    expect(progressBarInner).toHaveStyle('width: 40%');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderProgressBar({
      currentValue: 75,
      size: 'sm',
      color: 'green',
    });

    await screen.axe();
  });
});
