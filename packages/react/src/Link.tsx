import { Slot } from '@radix-ui/react-slot';
import GiLink, { type Props as GiLinkProps, linkStyles } from '@/atoms/Link';

export type LinkProps = GiLinkProps & {
  asChild?: boolean;
};

export default function Link({ asChild, variant, underline, appearance, visited, className, ...rest }: LinkProps) {
  const styleProps = { variant, underline, appearance, visited };

  if (asChild) {
    return <Slot {...rest} className={linkStyles({ ...styleProps, class: className })} />;
  }

  return <GiLink {...styleProps} {...rest} className={className} />;
}
