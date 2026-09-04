import { useDefaultProps, useMetadata } from '@builder.io/mitosis';
import type { Size, ValueOf, Whitespace } from './constants';
import { getSize, getWhitespace } from './utilities';
import classes from './Text.styles';

export type Props = {
  children?: any;
  size?: ValueOf<typeof Size>;
  whitespace?: ValueOf<typeof Whitespace>;
  className?: string;
  id?: string;
  dataTestId?: string;
  styles?: Record<string, string>;
  ariaHidden?: boolean;
};

useMetadata({ angular: { selector: 'gi-text' } });

useDefaultProps({
  ariaHidden: undefined,
});

export default function Text(props: Props) {
  return (
    <span
      class={classes({
        size: getSize(props.size),
        whitespace: getWhitespace(props.whitespace),
        className: props.className,
      })}
      id={props.id}
      style={props.styles}
      data-testid={props.dataTestId}
      aria-hidden={props.ariaHidden}
    >
      {props.children}
    </span>
  );
}
