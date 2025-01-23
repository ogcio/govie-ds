'use client';
import { ReactNode, useState, useId } from 'react';
import { tv } from 'tailwind-variants';

export const positionVariants = ['top', 'bottom', 'left', 'right'];

export type Position = 'top' | 'bottom' | 'left' | 'right';

type TooltipProps = {
  text: string;
  position: Position;
  children: ReactNode;
};

const tooltipTv = tv({
  base: 'gi-tooltip',
  variants: {
    position: {
      left: `gi-tooltip-left`,
      right: `gi-tooltip-right`,
      top: `gi-tooltip-top`,
      bottom: `gi-tooltip-bottom`,
    },
  },
});

export const Tooltip = ({ text, position = 'top', children }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const describedById = useId();

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  return (
    <span
      className="gi-tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      aria-describedby={isVisible ? describedById : undefined}
    >
      {children}
      {isVisible && (
        <span
          id={describedById}
          role="tooltip"
          className={tooltipTv({ position })}
          aria-hidden="false"
        >
          {text}
        </span>
      )}
    </span>
  );
};
