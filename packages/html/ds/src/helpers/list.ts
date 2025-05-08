import { ListProps } from '../list/types';
import { beautifyHtmlNode } from '../storybook/storybook';

export const createList = (arguments_: ListProps) => {
  const container = document.createElement('div');

  let classType = '';
  if (arguments_.type == 'bullet') {
    classType = 'gi-list-bullet';
  } else if (arguments_.type == 'number') {
    classType = 'gi-list-number';
  } else {
    classType = 'gi-list';
  }

  if (arguments_.spaced) {
    classType += ' gi-list-spaced';
  }

  const component = document.createElement('ul');
  component.className = classType;
  component.dataset.element = 'list-container';
  component.dataset.testid = 'list';

  for (const item of arguments_.items) {
    const li = document.createElement('li');
    li.innerHTML = item;

    component.append(li);
  }

  container.append(component);

  return beautifyHtmlNode(container);
};
