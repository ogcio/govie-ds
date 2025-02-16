import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../cn.js';
import { Icon } from '../icon/icon.js';

type Props = {
  children: React.ReactNode;
  label: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
  dataTestid?: string;
};

export const AccordionItem = ({
  defaultExpanded,
  children,
  label,
  disabled,
  dataTestid,
}: Props) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [iconStart, setIconStart] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonId = `${label}-button`;
  const panelId = `${label}-panel`;

  useEffect(() => {
    if (ref.current) {
      setIconStart(Boolean(ref.current.parentElement?.dataset.iconStart));
    }
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        'gi-py-4 gi-border-b-gray-150 gi-border-b gi-border-solid',
        disabled && 'gi-opacity-30',
      )}
      data-testid={dataTestid}
    >
      {/* TODO Replace the following tag (div) with button */}
      <div
        onClick={() => !disabled && setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        className={cn(
          iconStart
            ? 'gi-flex gi-flex-row-reverse gi-justify-end'
            : 'gi-flex gi-justify-between',
          disabled ? 'gi-cursor-not-allowed' : 'gi-cursor-pointer',
        )}
      >
        {label}{' '}
        <Icon icon={isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
      </div>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(isExpanded ? 'gi-block' : 'gi-hidden', 'gi-pt-4')}
      >
        {children}
      </div>
    </div>
  );
};
