import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import GiBox from '../Box.lite';
import { styles as buttonBaseStyles } from '../Button.lite';

useMetadata({ angular: { selector: 'gi-side-nav-item' } });

export type Props = {
  children?: any;
  selected?: boolean;
  expanded?: boolean;
  expandedContentId?: string;
  expandedContent?: any;
  expandedLabel?: string;
  actions?: any;
  id?: string;
  className?: string;
  dataTestId?: string;
};

export default function SideNavItem(props: Props) {
  return (
    <li
      id={props.id}
      data-testid={props.dataTestId}
      aria-current={props.selected ? 'page' : undefined}
      className={`gi-list-none gi-mt-1 ${props.className ?? ''}`}
    >
      <GiBox className="gi-relative gi-flex gi-items-center">
        {props.children}
        {props.actions ? <GiBox className="gi-absolute gi-right-2">{props.actions}</GiBox> : null}
      </GiBox>
      {props.expanded && props.expandedContent ? (
        <ul className="gi-list-none gi-p-0 gi-m-0" id={props.expandedContentId} aria-label={props.expandedLabel}>
          {props.expandedContent}
        </ul>
      ) : null}
    </li>
  );
}

export const slotStyles = tv({
  extend: buttonBaseStyles,
  base: [
    '!gi-px-3',
    'gi-w-full',
    'focus:gi-outline',
    'focus:gi-outline-sm',
    'focus:gi-outline-color-shadow-intent-focus-default',
    'focus:gi-outline-offset-0',
    'focus:gi-border-solid',
    'focus:gi-border-color-border-intent-focus-default',
    'focus:gi-border-sm',
    'focus:gi-rounded-sm',
    'focus:gi-bg-color-surface-tone-light-fill-hover',
  ],
  variants: {
    hasActions: {
      true: '!gi-pr-10',
      false: '',
    },
    selected: {
      true: [
        'gi-shadow-[inset_4px_0_0_var(--gieds-color-border-tone-primary-accent-selected)]',
        'gi-bg-color-surface-system-neutral-interactive-selected-subtle',
      ],
      false: '',
    },
    variant: {
      flat: '',
    },
    appearance: {
      dark: '',
    },
  },
  defaultVariants: {
    hasActions: false,
    selected: false,
    variant: 'flat',
    appearance: 'dark',
  },
});

export const contentStyles = tv({
  base: ['gi-relative', 'gi-flex', 'gi-items-center', 'gi-justify-between', 'gi-w-full', 'gi-gap-3'],
  variants: {
    primary: {
      true: 'gi-pr-3 gi-font-bold',
      false: 'gi-px-3',
    },
  },
  defaultVariants: {
    primary: true,
  },
});
