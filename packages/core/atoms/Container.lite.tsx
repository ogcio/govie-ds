import { useDefaultProps, useMetadata } from '@builder.io/mitosis';
import type { MaxWidth, ValueOf } from './constants';
import { getMaxWidth } from './utilities';
import classes from './Container.styles';
import type { Props as BoxProps } from './Box.lite';
import CoreBox from './Box.lite';

export type Props = {
  inset?: boolean;
  gutters?: boolean;
  maxWidth?: ValueOf<typeof MaxWidth>;
} & BoxProps;

useMetadata({ angular: { selector: 'core-container' } });

useDefaultProps({
  gutters: true,
});

export default function Container(props: Props) {
  return (
    <CoreBox
      id={props.id}
      role={props.role}
      ariaLabel={props.ariaLabel}
      ariaLabelledBy={props.ariaLabelledBy}
      styles={props.styles}
      dataTestId={props.dataTestId}
      className={classes({
        inset: !!props.inset,
        gutters: props.gutters ?? true,
        maxWidth: getMaxWidth(props.maxWidth),
        className: props.className,
      })}
    >
      {props.children}
    </CoreBox>
  );
}
