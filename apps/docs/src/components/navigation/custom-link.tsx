'use client';
import { Link, LinkProps } from '@ogcio/design-system-react';
import analytics from '@/lib/analytics';
import NextLink from 'next/link';

export function GovieLink(props: LinkProps) {
  if (props.external)
    return (
      <Link
        {...props}
        onClick={() => {
          analytics.trackEvent({
            action: 'navigate',
            category: 'external link',
            name: props.href,
          });
        }}
      >
        {props.children}
      </Link>
    );
  else
    return (
      <Link {...props} asChild>
        <NextLink href={props.href || '#'}>{props.children}</NextLink>
      </Link>
    );
}
