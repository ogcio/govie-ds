import { Link as DsLink, LinkProps } from '@govie-react/ds';
import NextLink from 'next/link';

export function Link(props: Omit<LinkProps, 'as'>) {
  return <DsLink as={NextLink} {...props} />;
}
