'use client';
import { createPopper } from '@popperjs/core';
import { useRef, useEffect } from 'react';
import { cn } from '../cn.js';
import { useCombinedRefs } from '../hooks/use-combined-refs.js';
import { PopoverProps } from './types.js';
import { createDynamicHeightModifier } from './utilities.js';

export const Popover = ({
  triggerRef,
  children,
  className,
  open,
  onOpenChange,
  maxHeight,
  options = {
    strategy: 'absolute',
    placement: 'bottom-start',
    modifiers: [
      { name: 'preventOverflow', options: { padding: 8 } },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['right', 'top'],
        },
      },
    ],
  },
  extraRefs = [],
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const combinedTriggerRef = useCombinedRefs(triggerRef, ...extraRefs);
  const instanceRef = useRef<ReturnType<typeof createPopper> | null>(null);

  useEffect(() => {
    if (open && triggerRef?.current && popoverRef?.current) {
      instanceRef.current = createPopper(
        triggerRef.current,
        popoverRef.current,
        {
          ...options,
          modifiers: [
            ...(options.modifiers || []),
            createDynamicHeightModifier(maxHeight),
          ],
        },
      );

      requestAnimationFrame(() => {
        instanceRef.current?.update();
      });
    }

    return () => {
      instanceRef.current?.destroy?.();
      instanceRef.current = null;
    };
  }, [open, triggerRef, maxHeight]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !combinedTriggerRef.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange, triggerRef]);

  return open ? (
    <div ref={popoverRef} role="dialog" className={cn('gi-popover', className)}>
      {children}
    </div>
  ) : null;
};
