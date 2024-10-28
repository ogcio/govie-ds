import { useId } from 'react';
import { Icon } from '../icon/icon.js';

export type ChipProps = {
  label: string;
  onClose: React.MouseEventHandler<HTMLDivElement>;
};

export const Chip = ({ label, onClose }: ChipProps) => {
  const uniqueId = useId();
  const descriptionId = `chip-description-${uniqueId}`;

  return (
    <div
      className={'gi-chip'}
      aria-label={`chip: ${label}`}
      aria-describedby={descriptionId}
      tabIndex={0}
    >
      <span id={descriptionId}>{label}</span>
      <div role="button" aria-label="remove chip" onClick={onClose}>
        <Icon icon="close" size="sm" />
      </div>
    </div>
  );
};

Chip.displayName = 'Chip';
