import { render } from '../common/render';
import html from './progress-bar.html?raw';
import { ProgressBarProps } from './progress-bar.schema';

describe('govieProgressBar', () => {
  const renderProgressBar = render<ProgressBarProps>({
    componentName: 'progress-bar',
    macroName: 'govieProgressBar',
    html,
  });

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
