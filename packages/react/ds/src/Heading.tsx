import type { Props as CoreProps } from './atoms/heading';
import H1 from './atoms/heading/H1';
import H2 from './atoms/heading/H2';
import H3 from './atoms/heading/H3';
import H4 from './atoms/heading/H4';
import H5 from './atoms/heading/H5';
import H6 from './atoms/heading/H6';

export type Props = CoreProps & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

const map = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
};

export default function Heading({ as = 'h1', ...props }: Props) {
  const Component = map[as];
  return <Component {...props} />;
}
