import { Show, Slot, useDefaultProps, useMetadata } from '@builder.io/mitosis';
import classes, { actionClasses } from './SideNavItem.styles';
import GiSideNavRow from './SideNavRow.lite';
import GiBox from '../Box.lite';

export type Props = {
  id?: string;
  children?: any;
  actions?: any;
  value?: string;
  disabled?: boolean;
  className?: string;
  styles?: Record<string, string>;
  onClick?: (event: any) => void;
  ariaHidden?: boolean | 'true' | 'false';
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean;
  ariaLabel?: string;
  ariaControls?: string;
  tabIndex?: number;
  dataTestId?: string;
};

useMetadata({ angular: { selector: 'gi-side-nav-item' } });

useDefaultProps({
  disabled: false,
  ariaHidden: false,
});

export default function SideNavItem(props: Props) {
  return (
    <GiSideNavRow ariaHidden={props.ariaHidden}>
      <button
        id={props.id}
        class={classes({
          disabled: props.disabled,
          hasAction: !!props.actions,
          className: ['gi-side-nav-item_', props.className],
        })}
        style={props.styles}
        value={props.value}
        onClick={(event) => props.onClick && props.onClick(event)}
        data-testid={props.dataTestId}
        aria-current={props.ariaCurrent}
        aria-label={props.ariaLabel}
        aria-controls={props.ariaControls}
        tabIndex={props.ariaHidden ? -1 : props.tabIndex}
      >
        {props.children}
      </button>
      <Show when={!!props.actions}>
        <GiBox className={actionClasses({ expandable: true })}>
          <Slot name="actions">{props.actions}</Slot>
        </GiBox>
      </Show>
    </GiSideNavRow>
  );
}
