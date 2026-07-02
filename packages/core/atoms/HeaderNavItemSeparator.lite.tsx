import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { dividerStyles } from './Divider.lite';

useMetadata({ angular: { selector: 'gi-header-nav-item-separator' } });

export type Props = {
  className?: string;
  id?: string;
  dataTestId?: string;
};

export default function HeaderNavItemSeparator(props: Props) {
  return (
    <li
      role="none"
      id={props.id}
      class={separatorStyles({ className: props.className })}
      data-testid={props.dataTestId}
      aria-hidden="true"
    />
  );
}

const separatorStyles = tv({
  extend: dividerStyles,
  base: 'gi-h-8 gi-mx-2 gi-self-center',
  defaultVariants: {
    orientation: 'vertical',
  },
});
