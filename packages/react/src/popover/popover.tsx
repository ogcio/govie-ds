'use client';
import { createPopper, type Options } from '@popperjs/core';
import { useRef, useEffect } from 'react';
import { cn } from '../cn.js';
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
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
          boundary: 'clippingParents',
          rootBoundary: 'viewport',
          tether: true,
        },
      },
      {
        name: 'flip',
        options: { fallbackPlacements: ['right', 'top'], altBoundary: true },
      },
      {
        name: 'computeStyles',
        options: { adaptive: false, gpuAcceleration: false },
      },
      { name: 'eventListeners', enabled: true },
    ],
  },
  extraRefs = [],
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<ReturnType<typeof createPopper> | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const referenceElement = triggerRef?.current ?? null;
    const floatingElement = popoverRef.current ?? null;

    if (!referenceElement || !floatingElement) {
      return;
    }

    instanceRef.current = createPopper(referenceElement, floatingElement, {
      ...(options as Options),
      modifiers: [
        ...((options?.modifiers as any[]) ?? []),
        createDynamicHeightModifier(maxHeight),
        { name: 'eventListeners', enabled: true },
      ],
    });

    resizeObserverRef.current = new ResizeObserver(() => {
      if (instanceRef.current) {
        instanceRef.current.update();
      }
    });

    resizeObserverRef.current.observe(floatingElement);
    resizeObserverRef.current.observe(referenceElement);

    requestAnimationFrame(() => {
      if (instanceRef.current) {
        instanceRef.current.update();
      }
    });

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      resizeObserverRef.current = null;

      if (instanceRef.current) {
        instanceRef.current.destroy?.();
      }
      instanceRef.current = null;
    };
  }, [open, triggerRef, maxHeight, options]);

  useEffect(() => {
    if (!open) {
      return;
    }
    if (instanceRef.current) {
      instanceRef.current.setOptions((previous) => ({
        ...previous,
        ...(options as Options),
        modifiers: [
          ...((options?.modifiers as any[]) ?? []),
          createDynamicHeightModifier(maxHeight),
          { name: 'eventListeners', enabled: true },
        ],
      }));
      instanceRef.current.update();
    }
  }, [open, children, maxHeight, options]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const getAllAnchorElements = () => {
      const base = triggerRef?.current ?? null;
      const extras = extraRefs
        .map((reference) => reference?.current ?? null)
        .filter(Boolean) as HTMLElement[];
      return { base, extras };
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const popoverElement = popoverRef.current;
      const { base, extras } = getAllAnchorElements();

      const insidePopover = Boolean(
        popoverElement && popoverElement.contains(target),
      );
      const insideTrigger = Boolean(base && base.contains(target));
      let insideExtras = false;

      for (const element of extras) {
        if (element.contains(target)) {
          insideExtras = true;
          break;
        }
      }

      if (!insidePopover && !insideTrigger && !insideExtras) {
        onOpenChange(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange, triggerRef, extraRefs]);

  if (!open) {
    return null;
  }

  return (
    <div
      ref={popoverRef}
      aria-label="popover"
      role="dialog"
      className={cn(
        'gi-overflow-y-auto gi-bg-color-surface-system-neutral-layer1 gi-z-[1000] gi-rounded-sm gi-border-[1px] gi-border-color-border-system-neutral-muted [width:inherit]',
        className,
      )}
    >
      {children}
    </div>
  );
};
