import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { clamp } from './utilities';

useMetadata({ angular: { selector: 'gi-header-nav' } });

export const HeaderNavVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
} as const;

export type Props = {
  variant?: (typeof HeaderNavVariant)[keyof typeof HeaderNavVariant];
  ariaLabel: string;
  children?: any;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  dataTestId?: string;
};

export default function HeaderNav(props: Props) {
  return (
    <nav
      id={props.id}
      class={navStyles({
        variant: getVariant(props.variant),
        className: props.className,
      })}
      style={props.styles}
      aria-label={props.ariaLabel}
      data-testid={props.dataTestId}
    >
      <ul class={listStyles({ variant: getVariant(props.variant) })}>{props.children}</ul>
    </nav>
  );
}

const getVariant = (x: Props['variant']) => clamp(x, HeaderNavVariant, HeaderNavVariant.PRIMARY);

const navStyles = tv({
  base: '',
  variants: {
    variant: {
      primary: 'gi-flex gi-items-center gi-flex-none',
      secondary: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const listStyles = tv({
  base: 'gi-list-none gi-flex gi-items-center gi-m-0 gi-p-0',
  variants: {
    variant: {
      primary: 'gi-gap-2 md:gi-gap-4',
      secondary: 'gi-justify-end gi-gap-4',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
