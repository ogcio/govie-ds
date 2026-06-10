import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import { clamp } from './utilities';
import GiBox from './Box.lite';

useMetadata({ angular: { selector: 'gi-footer-section' } });

export const FooterSectionVariant = {
  PRIMARY: 'primary',
  UTILITY: 'utility',
} as const;

export type Props = {
  variant?: (typeof FooterSectionVariant)[keyof typeof FooterSectionVariant];
  children?: any;
  className?: string;
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
      dataTestId={props.dataTestId}
    >
      {props.children}
    </GiBox>
  );
}

const getVariant = (x: Props['variant']) => clamp(x, FooterSectionVariant, FooterSectionVariant.PRIMARY);

const styles = tv({
  base: '',
  variants: {
    variant: {
      primary: 'gi-py-10 gi-bg-color-surface-system-neutral-layer1',
      utility: 'gi-py-4 gi-px-8 gi-bg-color-surface-system-neutral-layer2',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
