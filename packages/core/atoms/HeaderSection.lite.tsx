import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { clamp } from './utilities';
import GiBox from './Box.lite';

useMetadata({ angular: { selector: 'gi-header-section' } });

export const HeaderSectionVariant = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
} as const;

export type Props = {
  variant?: (typeof HeaderSectionVariant)[keyof typeof HeaderSectionVariant];
  children?: any;
  className?: string;
  styles?: Record<string, string>;
  role?: 'region' | 'group';
  ariaLabel?: string;
  id?: string;
  dataTestId?: string;
};

export default function HeaderSection(props: Props) {
  return (
    <GiBox
      id={props.id}
      className={sectionStyles({
        variant: getVariant(props.variant),
        className: props.className,
      })}
      styles={props.styles}
      role={props.role}
      ariaLabel={props.ariaLabel}
      dataTestId={props.dataTestId}
    >
      {props.children}
    </GiBox>
  );
}

const getVariant = (x: Props['variant']) => clamp(x, HeaderSectionVariant, HeaderSectionVariant.PRIMARY);

const sectionStyles = tv({
  base: '',
  variants: {
    variant: {
      primary:
        'gi-py-4 gi-bg-color-surface-system-neutral-layer1 gi-h-20 gi-items-center gi-flex gi-flex-row gi-flex-nowrap',
      secondary: 'gi-py-2 gi-bg-color-surface-system-neutral-layer2 gi-hidden gi-h-10 gi-items-center lg:gi-flex',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
