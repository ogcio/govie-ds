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
      value: 50,
      size: 'md',
    });

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeTruthy();

    const progressBarInner = progressBar.firstElementChild;
    expect(progressBarInner).toBeTruthy();
    expect(progressBarInner).toHaveStyle('width: 50%');
    expect(progressBarInner).toHaveClass('gi-bg-gray-700', 'gi-h-4');
  });

  it('should render an indeterminate progress bar correctly', () => {
    const screen = renderProgressBar({
      isIndeterminate: true,
      size: 'lg',
    });

    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeTruthy();

    const progressBarInner = progressBar.firstElementChild;
    expect(progressBarInner).toBeTruthy();
    expect(progressBarInner).toHaveClass(
      'gi-progress-bar-indeterminate',
      'gi-bg-gray-700',
      'gi-h-6',
    );
  });

  it('should render progress bar with final value set', () => {
    const screen = renderProgressBar({
      max: 500,
      value: 200,
      size: 'lg',
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
      size: 'sm',
    });

    await screen.axe();
  });
});
