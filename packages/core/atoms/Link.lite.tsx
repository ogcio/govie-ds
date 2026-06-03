import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'gi-link' } });

export const Variant = {
  DEFAULT: 'default',
  INLINE: 'inline',
} as const;

export const Underline = {
  ALWAYS: 'always',
  HOVER: 'hover',
  NONE: 'none',
} as const;

export const Appearance = {
  DEFAULT: 'default',
  LIGHT: 'light',
  INHERIT: 'inherit',
} as const;

export const Visited = {
  DEFAULT: 'default',
  NONE: 'none',
} as const;

export type Props = {
  id?: string;
  children: any;
  href: string;
  className?: string;

  variant?: (typeof Variant)[keyof typeof Variant];
  underline?: (typeof Underline)[keyof typeof Underline];
  appearance?: (typeof Appearance)[keyof typeof Appearance];
  visited?: (typeof Visited)[keyof typeof Visited];

  external?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
  download?: string | boolean;

  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaHidden?: boolean | 'true' | 'false';
  tabIndex?: number;
  lang?: string;

  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;

  dataTestId?: string;
};

export default function Link(props: Props) {
  return (
    <a
      id={props.id}
      href={props.href}
      class={linkStyles({
        variant: props.variant,
        underline: props.underline,
        appearance: props.appearance,
        visited: props.visited,
        class: props.className,
      })}
      target={props.target || (props.external ? '_blank' : undefined)}
      rel={props.rel || (props.external ? 'noreferrer noopener' : undefined)}
      download={props.download}
      aria-current={props.ariaCurrent}
      aria-label={props.ariaLabel}
      aria-labelledby={props.ariaLabelledBy}
      aria-describedby={props.ariaDescribedBy}
      aria-hidden={props.ariaHidden}
      tabIndex={props.ariaHidden ? -1 : props.tabIndex}
      lang={props.lang}
      onClick={(event) => props.onClick && props.onClick(event)}
      onFocus={(event) => props.onFocus && props.onFocus(event)}
      onBlur={(event) => props.onBlur && props.onBlur(event)}
      onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
      data-testid={props.dataTestId}
    >
      {props.children}
    </a>
  );
}

export const linkStyles = tv({
  base: '',
  variants: {
    variant: {
      [Variant.DEFAULT]: '',
      [Variant.INLINE]: [
        'gi-font-primary',
        'gi-w-fit',
        'gi-inline-flex',
        'gi-text-color-text-tone-convention-default',
        'hover:gi-text-color-text-tone-convention-hover',
        'focus:gi-no-underline',
        'focus:gi-rounded-sm',
        'focus:gi-text-color-text-tone-convention-hover',
        'focus:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)]',
        'focus-visible:gi-shadow-[0_0_0_2px_var(--gieds-color-gray-950),0_0_0_5px_var(--gieds-color-yellow-400)]',
        'focus-visible:gi-no-underline',
        'focus-visible:gi-rounded-sm',
        'focus-visible:gi-outline-none',
        'focus-visible:gi-text-color-text-tone-convention-hover',
        'aria-[current=page]:gi-text-color-icon-tone-convention-disabled',
        'aria-[current=page]:gi-pointer-events-none',
        'aria-[current=page]:gi-no-underline',
        'aria-[current=page]:focus-visible:gi-outline-none',
        'aria-[current=page]:focus-visible:gi-shadow-none',
        'gi-underline',
        'hover:gi-underline',
        'supports-[-moz-appearance:none]:gi-underline-offset-[0.23em]',
      ],
    },
    underline: {
      [Underline.ALWAYS]: 'gi-underline',
      [Underline.HOVER]: 'gi-no-underline hover:gi-underline',
      [Underline.NONE]: 'gi-no-underline hover:gi-no-underline',
    },
    appearance: {
      [Appearance.DEFAULT]: '',
      [Appearance.LIGHT]: 'gi-text-white hover:gi-text-white focus:gi-text-white',
      [Appearance.INHERIT]: 'gi-text-inherit hover:gi-text-inherit',
    },
    visited: {
      [Visited.DEFAULT]: '',
      [Visited.NONE]: '',
    },
  },
  defaultVariants: {
    variant: Variant.DEFAULT,
    appearance: Appearance.DEFAULT,
    visited: Visited.DEFAULT,
  },
  compoundVariants: [
    {
      variant: Variant.INLINE,
      visited: Visited.DEFAULT,
      class:
        'visited:gi-text-color-icon-tone-convention-visited hover:visited:gi-text-color-icon-tone-convention-visited',
    },
    {
      variant: Variant.INLINE,
      visited: Visited.NONE,
      class:
        'visited:gi-text-color-text-tone-convention-default hover:visited:gi-text-color-text-tone-convention-default',
    },
    {
      variant: Variant.DEFAULT,
      visited: Visited.NONE,
      class: 'visited:gi-text-inherit hover:visited:gi-text-inherit',
    },
    {
      appearance: Appearance.LIGHT,
      visited: Visited.DEFAULT,
      class: 'visited:gi-text-color-text-tone-light-visited hover:visited:gi-text-color-text-tone-light-visited',
    },
    {
      appearance: Appearance.LIGHT,
      visited: Visited.NONE,
      class: 'visited:gi-text-color-text-tone-light-visited hover:visited:gi-text-color-text-tone-light-visited',
    },
  ],
});
