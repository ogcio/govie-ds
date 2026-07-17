import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { clamp } from '../utilities';
import { SurfaceVariant, SurfaceAppearance } from '../constants';
import type { ValueOf } from '../constants';
import GiBox from '../Box.lite';
import GiContainer from '../Container.lite';
import type { Props as ContainerProps } from '../Container.lite';

useMetadata({ angular: { selector: 'gi-header-section' } });

export type Props = {
  children: any;
  variant?: ValueOf<typeof SurfaceVariant>;
  appearance?: ValueOf<typeof SurfaceAppearance>;
  maxWidth?: ContainerProps['maxWidth'];
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  role?: 'region' | 'group';
  ariaLabel?: string;
  dataTestId?: string;
};

export default function HeaderSection(props: Props) {
  return (
    <GiBox
      id={props.id}
      className={classes({
        variant: getVariant(props.variant),
        appearance: getAppearance(props.appearance),
        className: props.className,
      })}
      styles={props.styles}
      role={props.role}
      ariaLabel={props.ariaLabel}
      dataTestId={props.dataTestId}
    >
      <GiContainer maxWidth={props.maxWidth} className={contentClasses({ variant: getVariant(props.variant) })}>
        {props.children}
      </GiContainer>
    </GiBox>
  );
}

const getVariant = (x: Props['variant']) => clamp(x, SurfaceVariant, SurfaceVariant.PRIMARY);
const getAppearance = (x: Props['appearance']) => clamp(x, SurfaceAppearance, SurfaceAppearance.DEFAULT);

const classes = tv({
  base: 'gi-header-section gi-w-full',
  variants: {
    variant: {
      primary: '',
      utility: 'gi-hidden lg:gi-block',
    },
    appearance: {
      default: 'gi-text-white',
      light: 'gi-text-gray-950',
    },
  },
  compoundVariants: [
    { variant: 'primary', appearance: 'default', class: 'gi-bg-color-surface-system-primary-default' },
    { variant: 'utility', appearance: 'default', class: 'gi-bg-color-surface-system-primary-subtle' },
    { variant: 'primary', appearance: 'light', class: 'gi-bg-white' },
    { variant: 'utility', appearance: 'light', class: 'gi-bg-gray-50' },
  ],
  defaultVariants: {
    variant: 'primary',
    appearance: 'default',
  },
});

const contentClasses = tv({
  base: 'gi-flex gi-items-center',
  variants: {
    variant: {
      primary: 'gi-flex-row gi-flex-nowrap gi-justify-between gi-h-20 gi-text-md gi-font-bold',
      utility: 'gi-justify-end gi-h-10 gi-gap-4 [&_.gi-header-nav-item]:gi-py-1 [&_.gi-header-nav-item-link]:gi-py-1',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
