'use client';

import { Link } from '../../../link/link.js';
import type { HeaderAppearance, HeaderTitleProps } from '../../types.js';
import { headerTitleVariants } from '../../variants.js';
import { cn } from '../../../cn.js';
import { useHeaderContext } from '../header-context.js';

const toggleAppearance: Record<HeaderAppearance, 'light' | 'default'> = {
  default: 'light',
  light: 'default',
};

export const HeaderTitle = ({
  children,
  href,
  className,
}: HeaderTitleProps) => {
  const context = useHeaderContext();

  if (!context) {
    throw new Error('HeaderTitle must be used within a Header');
  }
  return (
    <div
      className={cn(headerTitleVariants({ appearance: context.variant }), {
        className,
        'gi-p-2': !!href,
      })}
    >
      {href ? (
        <Link appearance={toggleAppearance[context.variant]} href={href}>
          {children}
        </Link>
      ) : (
        children
      )}
    </div>
  );
};

Object.defineProperty(HeaderTitle, 'componentType', {
  value: 'HeaderTitle',
  writable: false,
  enumerable: false,
});
