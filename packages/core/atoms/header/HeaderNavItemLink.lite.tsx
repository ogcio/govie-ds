import { useMetadata } from '@builder.io/mitosis';
import classes, { getVisibility } from './HeaderNavItem.styles';
import type { VisibleValue } from './HeaderNavItem.styles';

useMetadata({ angular: { selector: 'gi-header-nav-item-link' } });

export type Props = {
  children?: any;
  /** Visibility: `true`/`false`, a breakpoint to show from (e.g. `"lg"`), or a per-breakpoint map like `{ base: false, lg: true }`. */
  visible?: VisibleValue;
  id?: string;
  href: string;
  className?: string;
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
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  dataTestId?: string;
};

export default function HeaderNavItemLink(props: Props) {
  return (
    <li class={getVisibility(props.visible)}>
      <a
        id={props.id}
        href={props.href}
        class={classes({
          className: ['gi-header-nav-item-link', props.className],
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
        data-testid={props.dataTestId}
        onClick={(event) => props.onClick && props.onClick(event)}
        onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
        onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
      >
        {props.children}
      </a>
    </li>
  );
}
