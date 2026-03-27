'use client';
import { ReactNode, useState, useId, useEffect, useCallback } from 'react';
import { tooltipVariants } from './variants.js';

export const positionVariants = ['top', 'bottom', 'left', 'right'];
export type Position = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
  text: string;
  position?: Position;
  children: ReactNode;
  dataTestid?: string;
};

export const Tooltip = ({
  text,
  position = 'top',
  dataTestid,
  children,
}: TooltipProps) => {
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

  const { wrapper, tooltip } = tooltipVariants({ position });

  return (
    <span
      className={wrapper()}
      onMouseEnter={showTooltip}
      onMouseLeave={() => {
        if (!isFocused) {
          hideTooltip();
        }
      }}
      onFocus={() => {
        setIsFocused(true);
        showTooltip();
      }}
      onBlur={() => {
        hideTooltip();
      }}
      aria-describedby={isVisible ? describedById : undefined}
      data-testid={dataTestid}
    >
      {children}
      {isVisible && (
        <span
          id={describedById}
          role="tooltip"
          className={tooltip()}
          aria-hidden={!isVisible}
          data-testid={`dti-tooltip-content-${position}`}
        >
          {text.length > 100 ? text.slice(0, 100) + '...' : text}
        </span>
      )}
    </span>
  );
};
