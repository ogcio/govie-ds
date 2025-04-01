'use client';
import { useId } from 'react';
import { Icon } from '../icon/icon.js';
import { translate as t } from '../i18n/util.js';

export type ChipProps = {
  label: string;
  onClose: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
};

export const Chip = ({ label, onClose = () => null }: ChipProps) => {
  const uniqueId = useId();
  const descriptionId = `chip-description-${uniqueId}`;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    // should close if Enter or Space
    if (['Enter', ' '].includes(event.key)) {
      event.preventDefault();
      onClose(event);
    }
  };

  return (
    <div
      className="gi-chip"
      aria-label={t('chip.label', { label })}
      aria-describedby={descriptionId}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <span id={descriptionId}>{label}</span>
      <div role="button" aria-label={t('chip.removeChip')} onClick={onClose}>
        <Icon icon="close" size="sm" />
      </div>
    </div>
  );
};

Chip.displayName = 'Chip';
