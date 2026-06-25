import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import GiBox from './Box.lite';

useMetadata({ angular: { selector: 'gi-footer-logo' } });

export type Props = {
  children: any;
  id?: string;
  className?: string;
  dataTestId?: string;
};

export default function FooterLogo(props: Readonly<Props>) {
  return (
    <GiBox id={props.id} className={styles({ class: props.className })} dataTestId={props.dataTestId}>
      {props.children}
    </GiBox>
  );
}

const styles = tv({
  base: 'gi-min-w-fit md:gi-ml-auto gi-mt-8 md:gi-mt-0',
});
