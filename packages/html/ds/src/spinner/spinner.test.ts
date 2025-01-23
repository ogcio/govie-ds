import { render } from '../common/render';
import { testVariantsAxe } from '../helpers/test-helpers';
import { IconSize } from '../icon/icon.schema';
import html from './spinner.html?raw';

describe('govieSpinner', () => {
  const renderSpinner = render({
    componentName: 'spinner',
    macroName: 'govieSpinner',
    html,
  });

  testVariantsAxe(
    [IconSize.ExtraLarge, IconSize.Large, IconSize.Medium, IconSize.Small],
    (variant) => renderSpinner({ size: variant }),
  );
});
