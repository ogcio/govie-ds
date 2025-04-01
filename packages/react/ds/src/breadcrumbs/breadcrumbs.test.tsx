import { render, cleanup } from '../test-utilities.js';
import {
  Breadcrumbs,
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbEllipsis,
} from './breadcrumbs.js';

describe('govieBreadcrumbs', () => {
  afterEach(cleanup);
  it('should render Breadcrumbs', () => {
    const { getByRole, getAllByRole } = render(
      <Breadcrumbs>
        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        <BreadcrumbEllipsis />
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
        <BreadcrumbEllipsis />
        <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
        <BreadcrumbCurrentLink href="/travel">Travel</BreadcrumbCurrentLink>
      </Breadcrumbs>,
    );

    const ellipsisDiv = container.querySelector('div[aria-hidden="true"]');
    expect(ellipsisDiv).toBeInTheDocument();
    expect(ellipsisDiv).toHaveTextContent('more_horiz');
  });

  it('should show left chevron icon when iconStart is true', () => {
    const { container } = render(
      <Breadcrumbs iconStart>
        <BreadcrumbLink href="/home">Back to [Previous page]</BreadcrumbLink>
      </Breadcrumbs>,
    );

    const iconElement = container.querySelector('div > nav > span');
    expect(iconElement?.textContent).toBe('chevron_left');
  });

  it('should pass axe accessibility tests', async () => {
    const { axe } = render(
      <Breadcrumbs>
        <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        <BreadcrumbEllipsis />
        <BreadcrumbCurrentLink href="/travel">Travel</BreadcrumbCurrentLink>
      </Breadcrumbs>,
    );

    await axe();
  });
});
