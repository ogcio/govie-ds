'use client';
import { ReactNode, useState } from 'react';

type TooltipProps = {
  label: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
};

export const Tooltip = (props: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <span
      className="gi-tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {props.children}
      {isVisible && (
        <span className={`gi-tooltip gi-tooltip-${props.position}`}>
          {props.label}
        </span>
      )}
    </span>
  );
};
