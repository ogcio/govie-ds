import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import H5 from '../heading/H5.lite';

useMetadata({ angular: { selector: 'gi-side-nav-heading' } });

export type Props = {
  children?: any;
  secondary?: boolean;
  className?: string;
  id?: string;
  dataTestId?: string;
};

export default function SideNavHeading(props: Props) {
  return (
    <li className="gi-list-none">
      <H5
        id={props.id}
        dataTestId={props.dataTestId}
        className={headingStyles({ secondary: !!props.secondary, class: props.className })}
      >
        {props.children}
      </H5>
    </li>
  );
}

const headingStyles = tv({
  base: [
    'gi-border-l-sm',
    'gi-text-md',
    'gi-font-bold',
    'gi-mt-2',
    'gi-text-color-text-system-neutral-muted',
    'gi-py-2',
    'gi-border-transparent',
  ],
  variants: {
    secondary: {
      true: 'gi-px-6',
      false: 'gi-px-3',
    },
  },
  defaultVariants: {
    secondary: false,
  },
});
