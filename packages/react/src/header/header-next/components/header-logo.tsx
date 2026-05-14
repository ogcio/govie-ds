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
  if (href) {
    return (
      <a
        href={href}
        className={headerLogoVariants({ appearance: context.variant, className: 'gi-p-1 gi-block' })}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <div
      className={headerLogoVariants({
        appearance: context.variant,
      })}
    >
      {children}
    </div>
  );
};

Object.defineProperty(HeaderLogo, 'componentType', {
  value: 'HeaderLogo',
  writable: false,
  enumerable: false,
});
