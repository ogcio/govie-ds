'use client';
import { ReactNode, useState, useId, useEffect, useCallback } from 'react';
import { tv } from 'tailwind-variants';

export const positionVariants = ['top', 'bottom', 'left', 'right'];
export type Position = 'top' | 'bottom' | 'left' | 'right';

type TooltipProps = {
  text: string;
  position?: Position;
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
  const [isFocused, setIsFocused] = useState(false);
  const describedById = useId();

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = useCallback(() => {
    setIsVisible(false);
    setIsFocused(false);
  }, []);

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        hideTooltip();
      }
    },
    [hideTooltip],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [handleEscapeKey]);

  return (
    <span
      className="gi-tooltip-wrapper"
      onMouseEnter={showTooltip}
      onMouseLeave={() => {
        if (!isFocused) hideTooltip();
      }}
      onFocus={() => {
        setIsFocused(true);
        showTooltip();
      }}
      onBlur={() => {
        hideTooltip();
      }}
      role="button"
      aria-describedby={isVisible ? describedById : undefined}
    >
      {children}
      {isVisible && (
        <span
          id={describedById}
          role="tooltip"
          className={tooltipTv({ position })}
          aria-hidden={!isVisible}
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
