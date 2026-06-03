import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { clamp } from './utilities';
import GiBox from './Box.lite';
import type { Props as BoxProps } from './Box.lite';

useMetadata({ angular: { selector: 'gi-footer-section' } });

export const FooterSectionVariant = {
  DEFAULT: 'default',
  META: 'meta',
} as const;

export type Props = {
  variant?: (typeof FooterSectionVariant)[keyof typeof FooterSectionVariant];
  children?: any;
  className?: string;
  role?: BoxProps['role'];
  ariaLabel?: string;
  ariaLabelledBy?: string;
  id?: string;
  dataTestId?: string;
};

export default function FooterSection(props: Props) {
  return (
    <GiBox
      id={props.id}
      className={styles({
        variant: getVariant(props.variant),
        className: props.className,
      })}
      role={props.role ?? (props.ariaLabel || props.ariaLabelledBy ? 'region' : undefined)}
      ariaLabel={props.ariaLabel}
      ariaLabelledBy={props.ariaLabelledBy}
      dataTestId={props.dataTestId}
    >
      {props.children}
    </GiBox>
  );
}

const getVariant = (x: Props['variant']) => clamp(x, FooterSectionVariant, FooterSectionVariant.DEFAULT);

const styles = tv({
  base: '',
  variants: {
    variant: {
      default: 'gi-py-10 gi-bg-color-surface-system-neutral-layer1',
      meta: 'gi-py-4 gi-px-8 gi-bg-color-surface-system-neutral-layer2',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
