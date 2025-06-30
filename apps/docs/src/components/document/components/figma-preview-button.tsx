'use client';

import { Button } from '@ogcio/design-system-react';
import analytics from '@/lib/analytics';
import Image from 'next/image';

export function FigmaPreviewButton({ href }: { href: string }) {
  const figmaLogo = '/logos/figma.svg';
  return (
    <Button
      variant="flat"
      className="mt-2"
      onClick={() => {
        analytics.trackEvent({
          category: 'figma',
          action: 'click',
          name: href,
        });
        window.open(href, '_blank');
      }}
    >
      <Image src={figmaLogo} alt="View on Figma" width={24} height={24} />
      View on Figma
    </Button>
  );
}
