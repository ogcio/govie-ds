import { render, cleanup } from '../test-utils.js';
import { Spinner, SpinnerPropTypes } from './spinner.js';

describe('govieSpinner', () => {
  afterEach(cleanup);
  const renderSpinner = (props: SpinnerPropTypes) =>
    render(<Spinner {...props} />);

  it('should pass axe tests', async () => {
    const screen = renderSpinner({
      size: 'lg',
    });
    await screen.axe();
  });
});
