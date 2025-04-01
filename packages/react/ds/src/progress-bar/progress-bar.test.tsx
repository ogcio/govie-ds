import { cleanup, render } from '../test-utilities.js';
import { ProgressBar, ProgressBarProps } from './progress-bar.js';

describe('ProgressBar', () => {
  afterEach(cleanup);

  const renderProgressBar = (props: ProgressBarProps) =>
    render(<ProgressBar {...props} />);

  it('should render a progress bar with a specified value', () => {
    const screen = renderProgressBar({
      value: 50,
    });

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeTruthy();

    const progressBarInner = progressBar.firstElementChild;
    expect(progressBarInner).toBeTruthy();
    expect(progressBarInner).toHaveStyle('width: 50%');
  });

  it('should render an indeterminate progress bar correctly', () => {
    const screen = renderProgressBar({
      isIndeterminate: true,
    });

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeTruthy();

    const progressBarInner = progressBar.firstElementChild;
    expect(progressBarInner).toBeTruthy();
    expect(progressBarInner).toHaveClass('gi-progress-bar-indeterminate');
  });

  it('should render progress bar with final value set', () => {
    const screen = renderProgressBar({
      max: 500,
      value: 200,
    });

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeTruthy();

    const progressBarInner = progressBar.firstElementChild;
    expect(progressBarInner).toBeTruthy();
    expect(progressBarInner).toHaveStyle('width: 40%');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderProgressBar({
      value: 75,
    });

    await screen.axe();
  });
});
