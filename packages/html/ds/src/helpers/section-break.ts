import { SectionBreakProps } from '../section-break/section-break.schema';
import { beautifyHtmlNode } from '../storybook/storybook';

export const createSectionBreak = (arguments_: SectionBreakProps) => {
  const container = document.createElement('div');

  let classSize = '';
  if (arguments_.size == 'xl') {
    classSize = 'gi-section-break-xl';
  } else if (arguments_.size == 'lg') {
    classSize = 'gi-section-break-lg';
  } else if (arguments_.size == 'sm') {
    classSize = 'gi-section-break-sm';
  } else {
    classSize = 'gi-section-break-md';
  }

  const component = document.createElement('hr');
  component.className = `${classSize}`.trim();
  component.role = 'separator';

  container.append(component);

  return beautifyHtmlNode(container);
};
