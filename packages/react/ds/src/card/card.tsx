import { CardLegacy } from './card-legacy.js';
import { CardNext } from './card-next.js';
import { CardProps } from './types.js';

const deprecatedKeys = [
  'title',
  'subTitle',
  'href',
  'media',
  'tag',
  'content',
  'action',
  'titleAsChild',
] as const;

export const Card = (props: CardProps) => {
  const isLegacy = deprecatedKeys.some((key) => key in props);

  if (isLegacy) {
    console.warn(
      '[Card] Using legacy props. Please migrate to the new composable API.',
    );
    return <CardLegacy {...props} />;
  }

  return (
    <CardNext
      inset={props.inset}
      type={props.type}
      dataTestid={props.dataTestid}
    >
      {props.children}
    </CardNext>
  );
};
