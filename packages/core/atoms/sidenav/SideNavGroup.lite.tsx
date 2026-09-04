import { Show, Slot, useDefaultProps, useMetadata } from '@builder.io/mitosis';
import classes, { actionClasses, arrowClasses } from './SideNavItem.styles';
import GiSideNavRow from './SideNavRow.lite';
import GiKeyboardArrowDownIcon from '../icons/KeyboardArrowDown.lite';
import GiBox from '../Box.lite';
export type Props = {
  id?: string;
  children: any;
  open?: boolean;
  actions?: any;
  value?: string;
  label: any;
  disabled?: boolean;
  className?: string;
  onClick?: (event: any) => void;
  ariaCurrent?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | boolean;
  ariaLabel?: string;
  dataTestId?: string;
};

useMetadata({ angular: { selector: 'gi-side-nav-group' } });

useDefaultProps({
  open: false,
  disabled: false,
});

export default function SideNavGroup(props: Props) {
  return (
    <>
      <GiSideNavRow>
        <button
          id={props.id}
          class={classes({
            disabled: props.disabled,
            hasAction: !!props.actions,
            className: props.className,
          })}
          value={props.value}
          onClick={(event) => props.onClick && props.onClick(event)}
          data-testid={props.dataTestId}
          aria-current={props.ariaCurrent}
          aria-label={props.ariaLabel}
        >
          <Slot name="label">{props.label}</Slot>
        </button>
        <Show when={!!props.actions}>
          <GiBox className={actionClasses({ expandable: true })}>
            <Slot name="actions">{props.actions}</Slot>
          </GiBox>
        </Show>
        <GiKeyboardArrowDownIcon className={arrowClasses({ open: props.open })} />
      </GiSideNavRow>
      <Show when={props.open}>
        <ul class="gi-side-nav-group">{props.children}</ul>
      </Show>
    </>
  );
}
