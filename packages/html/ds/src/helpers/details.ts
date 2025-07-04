import { DetailsProps } from '../details/types';
import { createIcon } from './icons';

export const createDetails = (arguments_: DetailsProps) => {
  const details = document.createElement('details');

  details.className = 'gi-details';
  details.name = arguments_.name!;
  details.open = arguments_.open || false;
  details.dataset.module = 'gieds-details';
  details.dataset.testid = 'govie-details';
  details.ariaExpanded = arguments_.open ? 'true' : 'false';

  const summary = document.createElement('summary');
  summary.className = 'gi-details-summary';
  summary.dataset.testid = 'govie-details-summary';
  summary.role = 'button';
  summary.ariaExpanded = arguments_.open ? 'true' : 'false';

  const toggleIcon = createIcon({
    icon: arguments_.open ? 'keyboard_arrow_up' : 'keyboard_arrow_down',
  });

  summary.append(toggleIcon);

  const summaryText = document.createElement('span');
  summaryText.className = 'gi-details-summary-text';
  summaryText.textContent = arguments_.label;
  summary.append(summaryText);

  const detailsContent = document.createElement('div');
  detailsContent.id = 'details-content';
  detailsContent.className = 'gi-details-text';
  detailsContent.ariaHidden = arguments_.open ? 'false' : 'true';
  detailsContent.textContent = arguments_.content || '';

  details.append(summary, detailsContent);

  return details;
};
