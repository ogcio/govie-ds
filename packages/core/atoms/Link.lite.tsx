import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';

useMetadata({ angular: { selector: 'gi-link' } });

export type Props = {
  id?: string;
  children: any;
  href: string;
  className?: string;
  underline?: boolean;

  external?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
  download?: string | boolean;

  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaHidden?: boolean;
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
      class={styles({ underline: props.underline, class: props.className })}
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

const styles = tv({
  base: [
    'gi-font-primary',
    'gi-w-fit',
    'gi-text-color-text-tone-convention-default',
    'gi-inline-flex',
    'hover:gi-text-color-text-tone-convention-hover',
    'visited:gi-text-color-icon-tone-convention-visited',
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
    'supports-[-moz-appearance:none]:gi-underline-offset-[0.23em]',
  ],
  variants: {
    underline: {
      true: 'gi-underline',
      false: 'gi-no-underline hover:gi-underline focus:gi-no-underline',
    },
  },
  defaultVariants: {
    underline: true,
  },
});
