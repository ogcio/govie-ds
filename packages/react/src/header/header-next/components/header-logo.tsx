'use client';
import type { HeaderLogoProps } from '../../types.js';
import { headerLogoVariants } from '../../variants.js';
import { useHeaderContext } from '../header-context.js';
import { cn } from '../../../cn.js';

export const HeaderLogo = ({ children, ariaLabel, href }: HeaderLogoProps) => {
  const context = useHeaderContext();

  if (!context) {
    throw new Error('HeaderLogo must be used within a Header');
  }

  return (
    <div
      className={cn(
        !!href && 'gi-p-1',
        headerLogoVariants({
          appearance: context?.variant,
        }),
      )}
    >
      {href ? (
        <a href={href} aria-label={ariaLabel}>
          {children}
        </a>
      ) : (
        children
      )}
    </div>
  );
};

Object.defineProperty(HeaderLogo, 'componentType', {
  value: 'HeaderLogo',
  writable: false,
  enumerable: false,
});
