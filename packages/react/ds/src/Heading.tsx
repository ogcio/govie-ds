import type { Props as CoreProps, As } from './atoms/heading';
import CoreH1 from './atoms/heading/CoreH1';
import CoreH2 from './atoms/heading/CoreH2';
import CoreH3 from './atoms/heading/CoreH3';
import CoreH4 from './atoms/heading/CoreH4';
import CoreH5 from './atoms/heading/CoreH5';
import CoreH6 from './atoms/heading/CoreH6';

export type Props = CoreProps & { as?: As };

const map = {
  h1: CoreH1,
  h2: CoreH2,
  h3: CoreH3,
  h4: CoreH4,
  h5: CoreH5,
  h6: CoreH6,
};

export default function Heading({ as = 'h1', ...props }: Props) {
  const Component = map[as];
  return <Component {...props} />;
}
