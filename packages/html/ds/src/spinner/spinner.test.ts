import { render } from '../common/render';
import { IconSize } from '../icon/icon.schema';
import html from './spinner.html?raw';

describe('govieSpinner', () => {
  const renderSpinner = render({
    componentName: 'spinner',
    macroName: 'govieSpinner',
    html,
  });

  it('should pass axe tests', async () => {
    const screen = renderSpinner({
      size: IconSize.Large,
    });
    await screen.axe();
  });
});
