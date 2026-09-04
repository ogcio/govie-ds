import { Show, Slot, useDefaultProps, useMetadata } from '@builder.io/mitosis';
import classes, { actionClasses } from './SideNavItem.styles';
import GiSideNavRow from './SideNavRow.lite';
import GiBox from '../Box.lite';

export type Props = {
  children?: any;
  id?: string;
  href: string;
  actions?: any;
  disabled?: boolean;
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
useMetadata({ angular: { selector: 'gi-side-nav-item-link' } });

useDefaultProps({
  disabled: false,
  external: false,
  download: undefined,
  ariaHidden: false,
});

export default function SideNavItem(props: Props) {
  return (
    <GiSideNavRow ariaHidden={props.ariaHidden}>
      <a
        id={props.id}
        href={props.href}
        target={props.target ?? (props.external ? '_blank' : undefined)}
        rel={props.rel ?? (props.external ? 'noreferrer noopener' : undefined)}
        download={props.download}
        onClick={(event) => props.onClick && props.onClick(event)}
        class={classes({
          disabled: props.disabled,
          hasAction: !!props.actions,
          className: ['gi-side-nav-item-link', props.className],
        })}
        style={props.styles}
        data-testid={props.dataTestId}
        aria-current={props.ariaCurrent}
        aria-label={props.ariaLabel}
        aria-labelledby={props.ariaLabelledBy}
        aria-describedby={props.ariaDescribedBy}
        tabIndex={props.ariaHidden ? -1 : props.tabIndex}
        lang={props.lang}
        onKeyDown={(event) => props.onKeyDown && props.onKeyDown(event)}
        onKeyUp={(event) => props.onKeyUp && props.onKeyUp(event)}
      >
        {props.children}
      </a>
      <Show when={!!props.actions}>
        <GiBox className={actionClasses({ expandable: true })}>
          <Slot name="actions">{props.actions}</Slot>
        </GiBox>
      </Show>
    </GiSideNavRow>
  );
}
