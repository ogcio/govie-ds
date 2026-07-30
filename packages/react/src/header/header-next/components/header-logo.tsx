'use client';
import type { HeaderLogoProps } from '@/header/types.js';
import { headerLogoVariants } from '@/header/variants.js';
import { useHeaderContext } from '@/header/header-next/header-context.js';

/** @deprecated Use the new composable `HeaderLogo` from `@ogcio/design-system-react/next`. */

export const HeaderLogo = ({ children, href }: HeaderLogoProps) => {
  const context = useHeaderContext();

  if (!context) {
    throw new Error('HeaderLogo must be used within a Header');
  }
  if (href) {
    return (
      <a href={href} className={headerLogoVariants({ appearance: context.variant, className: 'gi-p-1 gi-block' })}>
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
