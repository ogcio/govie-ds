import { render } from '../common/render';
import html from './spinner.html?raw';
import { SpinnerSize } from './spinner.schema';

describe('govieSpinner', () => {
  const renderSpinner = render({
    componentName: 'spinner',
    macroName: 'govieSpinner',
    html,
  });

  it('should pass axe tests', async () => {
    const screen = renderSpinner({
      size: SpinnerSize.Large,
    });
    await screen.axe();
  });
});
