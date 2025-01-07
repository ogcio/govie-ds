import { render, cleanup, testVariantsAxe } from '../test-utils.js';
import { sizeVariants, Spinner, type SpinnerProps } from './spinner.js';

describe('govieSpinner', () => {
  afterEach(cleanup);
  const renderSpinner = (props: SpinnerProps) => render(<Spinner {...props} />);

  testVariantsAxe(Reflect.ownKeys(sizeVariants) as string[], (variant) =>
    renderSpinner({ size: variant }),
  );
});
