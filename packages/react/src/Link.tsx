import { Slot } from '@radix-ui/react-slot';
import GiLink, { type Props as GiLinkProps, linkStyles } from '@/atoms/Link';

export type LinkProps = GiLinkProps & {
  asChild?: boolean;
};

export function Link({ asChild, variant, underline, appearance, className, children, ...props }: LinkProps) {
  if (asChild) {
    return (
      <Slot
        className={linkStyles({
          variant,
          underline,
          appearance,
          class: className,
        })}
      >
        {children}
      </Slot>
    );
  }

  return (
    <GiLink {...props} variant={variant} underline={underline} appearance={appearance} className={className}>
      {children}
    </GiLink>
  );
}
