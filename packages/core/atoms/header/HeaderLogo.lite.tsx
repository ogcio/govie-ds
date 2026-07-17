import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import GiBox from '../Box.lite';

useMetadata({ angular: { selector: 'gi-header-logo' } });

export type Props = {
  children: any;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  dataTestId?: string;
};

export default function HeaderLogo(props: Props) {
  return (
    <GiBox
      id={props.id}
      className={classes({ className: props.className })}
      styles={props.styles}
      dataTestId={props.dataTestId}
    >
      {props.children}
    </GiBox>
  );
}

const classes = tv({
  base: 'gi-flex-none gi-rounded-sm',
});
