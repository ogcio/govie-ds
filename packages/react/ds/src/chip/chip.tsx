'use client';
import { useId } from 'react';
import { cn } from '../cn.js';
import { translate as t } from '../i18n/utility.js';
import { Icon } from '../icon/icon.js';

export type ChipProps = {
  label: string;
  onClose: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
  className?: string;
};

export const Chip = ({ label, className, onClose = () => null }: ChipProps) => {
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
      className={cn(
        className,
        'gi-flex gi-items-center gi-gap-1 gi-pl-1.5 gi-pr-1 gi-py-0.5 gi-bg-gray-100 gi-w-fit gi-rounded-sm gi-cursor-default gi-text-xs hover:gi-bg-gray-200 focus:gi-bg-gray-200 focus:gi-outline focus:gi-outline-gray-950 focus:gi-outline-[2px] focus:gi-shadow-[inset_0_0_0_1px_white,0_0_0_5px_var(--gieds-color-yellow-400)]',
      )}
      aria-label={t('chip.label', { label, defaultValue: `chip: ${label}` })}
      aria-describedby={descriptionId}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <span id={descriptionId}>{label}</span>
      <div
        role="button"
        aria-label={t('chip.removeChip', { defaultValue: 'remove chip' })}
        onClick={onClose}
      >
        <Icon icon="close" size="sm" />
      </div>
    </div>
  );
};

Chip.displayName = 'Chip';
