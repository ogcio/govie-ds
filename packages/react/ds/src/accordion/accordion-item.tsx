import React, { useState } from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';

type Props = {
  children: React.ReactNode;
  label: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
};

export const AccordionItem = ({
  defaultExpanded,
  children,
  label,
  disabled,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className={cn(
        'gi-py-4 gi-border-b-gray-150 gi-border-b gi-border-solid',
        disabled && 'gi-opacity-30',
      )}
    >
      <div
        onClick={() => !disabled && setIsExpanded(!isExpanded)}
        className={cn(
          'gi-flex gi-justify-between',
          disabled ? 'gi-cursor-not-allowed' : 'gi-cursor-pointer',
        )}
      >
        {label}{' '}
        <Icon icon={isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
      </div>
      <div className={cn(isExpanded ? 'gi-block' : 'gi-hidden', 'gi-pt-4')}>
        {children}
      </div>
    </div>
  );
};
