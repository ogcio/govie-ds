import { render, cleanup, testVariantsAxe } from '../test-utilities.js';
import { spinnerSizeVariants, Spinner, type SpinnerProps } from './spinner.js';

describe('govieSpinner', () => {
  afterEach(cleanup);
  const renderSpinner = (props: SpinnerProps) => render(<Spinner {...props} />);

  testVariantsAxe(Reflect.ownKeys(spinnerSizeVariants) as string[], (variant) =>
    renderSpinner({ size: variant }),
  );
});
