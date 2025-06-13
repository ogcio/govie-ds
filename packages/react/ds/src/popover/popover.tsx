'use client';
import { createPopper } from '@popperjs/core';
import { useRef, useEffect } from 'react';
import { cn } from '../cn.js';
import { PopoverProps } from './types.js';

export const Popover = ({
  triggerRef,
  children,
  className,
  open,
  onOpenChange,
  options = {
    strategy: 'absolute',
    placement: 'bottom-start',
    modifiers: [
      { name: 'offset', options: { offset: [0, 4] } },
      { name: 'preventOverflow', options: { padding: 8 } },
    ],
  },
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && triggerRef?.current && popoverRef?.current) {
      createPopper(triggerRef.current, popoverRef.current, options);
    }
  }, [open, triggerRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
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
