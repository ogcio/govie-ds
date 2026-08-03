import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { SurfaceVariant } from '../constants';
import type { MaxWidth, ValueOf } from '../constants';
import { clamp } from '../utilities';
import GiBox from '../Box.lite';
import GiContainer from '../Container.lite';

useMetadata({ angular: { selector: 'gi-footer-section' } });

export type Props = {
  variant?: ValueOf<typeof SurfaceVariant>;
  maxWidth?: ValueOf<typeof MaxWidth>;
  children?: any;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  dataTestId?: string;
};

export default function FooterSection(props: Props) {
  return (
    <GiBox
      id={props.id}
      className={classes({ variant: getVariant(props.variant) })}
      styles={props.styles}
      dataTestId={props.dataTestId}
    >
      <GiContainer
        maxWidth={props.maxWidth}
        className={contentClasses({ variant: getVariant(props.variant), className: props.className })}
      >
        {props.children}
      </GiContainer>
    </GiBox>
  );
}

const getVariant = (x: Props['variant']) => clamp(x, SurfaceVariant, SurfaceVariant.PRIMARY);

const classes = tv({
  base: 'gi-footer-section gi-w-full',
  variants: {
    variant: {
      primary: 'gi-bg-color-surface-system-neutral-layer1',
      utility: 'gi-bg-color-surface-system-neutral-layer2',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const contentClasses = tv({
  base: 'gi-footer-section-container',
  variants: {
    variant: {
      primary: 'gi-py-8 md:gi-py-10',
      utility: 'gi-py-4',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
