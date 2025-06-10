import { Placement } from '@popperjs/core';

export type PopoverProps = {
  triggerRef: React.RefObject<HTMLElement> | null;
  children: React.ReactNode;
  className?: string;
  placement?: Placement;
  offset?: [number, number];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
