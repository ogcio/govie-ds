import { ChipProps } from '../chip/types';

export const createChip = (arguments_: ChipProps) => {
  const container = document.createElement('div');
  container.className = `gi-chip ${arguments_.className || ''}`;

  const label = document.createElement('span');
  label.textContent = arguments_.label;

  const close = document.createElement('div');
  close.role = 'button';
  const closeIcon = document.createElement('span');
  closeIcon.role = 'presentation';
  closeIcon.className = 'material-symbols-outlined gi-block';
  closeIcon.style.fontSize = '16px';
  closeIcon.textContent = 'close';
  close.append(closeIcon);

  container.append(label);
  container.append(close);

  return container;
};
