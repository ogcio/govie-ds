import { render, cleanup } from '../test-utils.js';
import { Spinner, type SpinnerProps } from './spinner.js';

describe('govieSpinner', () => {
  afterEach(cleanup);
  const renderSpinner = (props: SpinnerProps) => render(<Spinner {...props} />);

  it('should pass axe tests', async () => {
    const screen = renderSpinner({
      size: 'lg',
    });
    await screen.axe();
  });
});
