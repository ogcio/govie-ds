import { cleanup, render } from '../test-utils.js';
import { ProgressBar, ProgressBarProps } from './progress-bar.js';

describe('ProgressBar', () => {
  afterEach(cleanup);

  const renderProgressBar = (props: ProgressBarProps) =>
    render(<ProgressBar {...props} />);

  it('should render a progress bar with a specified value', () => {
    const screen = renderProgressBar({
      value: 50,
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

  it('should render an indeterminate progress bar', () => {
    const screen = renderProgressBar({
      indeterminate: true,
      size: 'lg',
      color: 'gray',
    });

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeTruthy();

    const progressBarInner = progressBar.firstElementChild;
    expect(progressBarInner).toBeTruthy();
    expect(progressBarInner).toHaveClass(
      'gi-progress-bar-indeterminate',
      'gi-bg-gray-500',
      'gi-h-6',
    );
    expect(progressBarInner).not.toHaveStyle('width: 50%'); // Indeterminate should not have a fixed width
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderProgressBar({
      value: 75,
      size: 'sm',
      color: 'green',
    });

    await screen.axe();
  });
});
