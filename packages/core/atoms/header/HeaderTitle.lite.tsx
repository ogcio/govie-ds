import { useMetadata } from '@builder.io/mitosis';
import { tv } from 'tailwind-variants';
import GiBox from '../Box.lite';

useMetadata({ angular: { selector: 'gi-header-title' } });

export type Props = {
  children?: any;
  className?: string;
  styles?: Record<string, string>;
  id?: string;
  dataTestId?: string;
};

export default function HeaderTitle(props: Props) {
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
  base: [
    'gi-min-w-0 gi-flex-1 gi-p-2',
    'gi-text-lg xl:gi-text-xl gi-font-bold gi-font-primary',
    'gi-truncate',
    'gi-ml-2 md:gi-ml-4 lg:gi-ml-10',
  ],
});
