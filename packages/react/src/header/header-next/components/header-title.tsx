'use client';

import { cn } from '@/cn.js';
import type { HeaderTitleProps } from '@/header/types.js';
import { headerTitleVariants } from '@/header/variants.js';
import { useHeaderContext } from '@/header/header-next/header-context.js';

export const HeaderTitle = ({ children, className }: HeaderTitleProps) => {
  const context = useHeaderContext();

  if (!context) {
    throw new Error('HeaderTitle must be used within a Header');
  }

  return <div className={cn(className, headerTitleVariants({ appearance: context.variant }))}>{children}</div>;
};

Object.defineProperty(HeaderTitle, 'componentType', {
  value: 'HeaderTitle',
  writable: false,
  enumerable: false,
});
