import { Options as PopperOptions } from '@popperjs/core';

export type PopoverProps = {
  triggerRef: React.RefObject<any> | null;
  children: React.ReactNode;
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options?: PopperOptions;
};
