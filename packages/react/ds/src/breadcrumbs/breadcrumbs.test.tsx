import { render, cleanup } from '../test-utils.js';
import { Breadcrumbs } from './breadcrumbs.js';

describe('govieBreadcrumbs', () => {
  afterEach(cleanup);
  it('should render a breadcrumb with the correct content', () => {
    const { getByTestId } = render(
      <Breadcrumbs
        links={[
          {
            href: '#',
            label: 'Home',
          },
          {
            href: '#',
            label: 'Passport',
          },
        ]}
      />,
    );
    expect(getByTestId('govie-breadcrumbs')).toBeInTheDocument();
    expect(getByTestId('breadcrumb_item_0')).toBeInTheDocument();
    expect(getByTestId('breadcrumb_item_1')).toBeInTheDocument();
  });

  it('should pass axe accessibility tests', async () => {
    const { axe } = render(
      <Breadcrumbs
        links={[
          {
            href: '#',
            label: 'Home',
          },
          {
            href: '#',
            label: 'Passport',
          },
        ]}
      />,
    );

    await axe();
  });
});
