import { BreadcrumbsProps } from '../breadcrumbs/breadcrumbs.schema';
import { beautifyHtmlNode } from '../storybook/storybook';
import { createIcon } from './icons';
import { createLink } from './links';

export const createBreadcrumbs = (arguments_: BreadcrumbsProps) => {
  const container = document.createElement('div');
  const nav = document.createElement('nav');
  nav.className = 'gi-breadcrumbs';
  nav.dataset.module = 'gieds-breadcrumbs';
  nav.dataset.element = 'breadcrumbs-container';

  if (arguments_?.iconStart) {
    const icon = createIcon({
      icon: 'chevron_left',
      size: 'sm',
    });

    nav.append(icon);
  }

  const ol = document.createElement('ol');
  ol.role = 'list';

  for (const navItem of arguments_.navItems) {
    const li = document.createElement('li');
    li.role = 'listitem';

    let element;
    if (navItem.ellipsis) {
      const icon = createIcon({
        icon: 'more_horiz',
        className: 'gi-text-gray-700',
      });
      element = document.createElement('div');
      element.ariaHidden = 'true';
      element.append(icon);
    } else if (navItem.currentPage) {
      element = createLink({
        noColor: true,
        href: navItem.href,
        content: navItem.label!,
        className: 'gi-breadcrumbs-link',
      }) as HTMLAnchorElement;
      element.ariaCurrent = 'page';
    } else {
      element = createLink({
        noColor: true,
        href: navItem.href,
        content: navItem.label!,
        className: 'gi-breadcrumbs-link',
      });
    }

    li.append(element);
    ol.append(li);
  }

  nav.append(ol);
  container.append(nav);

  return beautifyHtmlNode(container);
};
