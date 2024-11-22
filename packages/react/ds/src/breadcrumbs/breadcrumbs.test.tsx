import { render, cleanup } from '../test-utils.js';
import {
  Breadcrumbs,
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbEllipses,
} from './breadcrumbs.js';

describe('govieBreadcrumbs', () => {
  afterEach(cleanup);
  it('should render Breadcrumbs', () => {
    const { getByRole, getAllByRole } = render(
      <Breadcrumbs>
        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        <BreadcrumbEllipses />
        <BreadcrumbCurrentLink href="/travel">Travel</BreadcrumbCurrentLink>
      </Breadcrumbs>,
    );

    const breadcrumbNav = getByRole('navigation', {
      name: /breadcrumb/i,
    });
    expect(breadcrumbNav).toBeInTheDocument();

    const listItems = getAllByRole('listitem');
    expect(listItems).toHaveLength(3);

    expect(listItems[0]).toHaveTextContent('Home');
    expect(listItems[1]).toBeInTheDocument();
    expect(listItems[2]).toHaveTextContent('Travel');
  });

  it('should render Breadcrumbs with ellipses correctly', () => {
    const { container } = render(
      <Breadcrumbs>
        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        <BreadcrumbEllipses />
        <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
        <BreadcrumbCurrentLink href="/travel">Travel</BreadcrumbCurrentLink>
      </Breadcrumbs>,
    );

    const listItem = container.querySelector('li .gi-breadcrumb-ellipses');
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveClass('gi-breadcrumb-ellipses');
  });

  it('should pass axe accessibility tests', async () => {
    const { axe } = render(
      <Breadcrumbs>
        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        <BreadcrumbEllipses />
        <BreadcrumbCurrentLink href="/travel">Travel</BreadcrumbCurrentLink>
      </Breadcrumbs>,
    );

    await axe();
  });
});
