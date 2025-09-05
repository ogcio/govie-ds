// src/utils/createBreadcrumbs.ts

import { BreadcrumbsProps } from '../breadcrumbs/breadcrumbs.schema';
import { createIcon } from './icons';
import { createLink } from './links';

export const createBreadcrumbs = (arguments_: BreadcrumbsProps) => {
  const nav = document.createElement('nav');
  nav.className = 'gi-breadcrumbs';
  nav.dataset.module = 'gieds-breadcrumbs';
  nav.dataset.element = 'breadcrumbs-container';
  nav.setAttribute('aria-label', 'Breadcrumbs');

  const ol = document.createElement('ol');
  ol.setAttribute('role', 'list');

  if (arguments_?.iconStart) {
    const li = document.createElement('li');
    li.setAttribute('role', 'listitem');
    li.className = 'gi-pr-1';

    const icon = createIcon({
      icon: 'chevron_left',
      size: 'sm',
    });
    icon.setAttribute('aria-label', 'chevron-left');

    li.append(icon);
    ol.append(li);
  }

  const { navItems } = arguments_;
  for (let index = 0; index < navItems.length; index++) {
    const navItem = navItems[index];

    const li = document.createElement('li');
    li.setAttribute('role', 'listitem');

    let element: HTMLElement;

    if (navItem.ellipsis) {
      const wrapper = document.createElement('div');
      wrapper.setAttribute('aria-hidden', 'true');

      const icon = createIcon({
        icon: 'more_horiz',
        className: 'gi-text-gray-700',
      });

      wrapper.append(icon);
      element = wrapper;
    } else {
      element = createLink({
        noColor: true,
        href: navItem.href,
        content: navItem.label!,
        className: 'gi-breadcrumbs-link',
      });

      if (navItem.currentPage) {
        (element as HTMLAnchorElement).setAttribute('aria-current', 'page');
      } else {
        element.setAttribute('aria-label', `${navItem.label} page`);
      }
    }

    li.append(element);

    if (index < navItems.length - 1) {
      const separator = document.createElement('span');
      separator.className = 'gi-breadcrumbs-separator';
      separator.textContent = '/';
      li.append(separator);
    }

    ol.append(li);
  }

  nav.append(ol);

  return nav;
};
