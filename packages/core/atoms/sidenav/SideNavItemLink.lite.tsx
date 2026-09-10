import { Slot, useDefaultProps, useMetadata } from '@builder.io/mitosis';
import classes, { actionClasses } from './SideNavItem.styles';

useMetadata({ angular: { selector: 'gi-side-nav-item-link' } });

useDefaultProps({
  download: undefined,
  ariaHidden: undefined,
  ariaCurrent: undefined,
});

export type Props = {
  children?: any;
  id?: string;
  href: string;
  selected?: boolean;
  actions?: any;
  className?: string;
  external?: boolean;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
  download?: string | boolean;
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean;
  ariaLabel?: string;
  ariaHidden?: boolean | 'true' | 'false';
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  tabIndex?: number;
  lang?: string;
  styles?: Record<string, string>;
  onClick?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  dataTestId?: string;
};

export default function SideNavItemLink(props: Props) {
  return (
    <li class="gi-list-none gi-mt-1 gi-relative gi-side-nav-list" aria-hidden={props.ariaHidden}>
      <a
        id={props.id}
        href={props.href}
        target={props.target ?? (props.external ? '_blank' : undefined)}
        rel={props.rel ?? (props.external ? 'noreferrer noopener' : undefined)}
        download={props.download}
        class={classes({
          selected: !!props.selected,
          className: props.className,
        })}
        style={props.styles}
        onClick={(event) => props.onClick && props.onClick(event)}
        onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
        onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
        aria-current={props.ariaCurrent}
        aria-label={props.ariaLabel}
        aria-labelledby={props.ariaLabelledBy}
        aria-describedby={props.ariaDescribedBy}
        tabIndex={props.ariaHidden ? -1 : props.tabIndex}
        lang={props.lang}
        data-testid={props.dataTestId}
      >
        {props.children}
      </a>
      <div class={actionClasses()}>
        <Slot name="actions" />
      </div>
    </li>
  );
}
