import { render } from '../common/render';
import html from './breadcrumbs.html?raw';
import type { BreadcrumbsProps } from './breadcrumbs.schema';

describe('govieBreadcrumbs', () => {
  const renderBreadcrumbs = render<BreadcrumbsProps>({
    componentName: 'breadcrumbs',
    macroName: 'govieBreadcrumbs',
    html,
  });
  const navItems = [
    { label: 'Home', href: '/' },
    {
      ellipsis: true,
    },
    {
      label: 'Travel',
      href: '/travel',
      currentPage: true,
    },
  ];

  it('should render Breadcrumbs', () => {
    const { getByRole, getAllByRole } = renderBreadcrumbs({
      navItems,
    });

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

  it('should pass axe tests', async () => {
    const { axe } = renderBreadcrumbs({
      navItems,
    });

    await axe();
  });
});
