import { useMetadata } from '@builder.io/mitosis';
import classes from './Link.styles';
import type { Appearance, Underline, Variant, Visited } from './Link.styles';
import type { ValueOf } from './constants';

useMetadata({ angular: { selector: 'gi-link' } });

export type Props = {
  id?: string;
  children: any;
  href: string;
  className?: string;

  variant?: ValueOf<typeof Variant>;
  underline?: ValueOf<typeof Underline>;
  appearance?: ValueOf<typeof Appearance>;
  visited?: ValueOf<typeof Visited>;

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

  styles?: Record<string, string>;

  onClick?: (event: any) => void;
  onFocus?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;

  dataTestId?: string;
};

export default function Link(props: Props) {
  return (
    <a
      id={props.id}
      href={props.href}
      class={classes({
        variant: props.variant,
        underline: props.underline,
        appearance: props.appearance,
        visited: props.visited,
        className: props.className,
      })}
      style={props.styles}
      target={props.target ?? (props.external ? '_blank' : undefined)}
      rel={props.rel ?? (props.external ? 'noreferrer noopener' : undefined)}
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
      onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
      data-testid={props.dataTestId}
    >
      {props.children}
    </a>
  );
}
