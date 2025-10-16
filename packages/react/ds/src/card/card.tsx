'use client';
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

  const { inset, background, type, children, ...rest } = props;
  const deprecatedSet = new Set(deprecatedKeys as readonly string[]);
  const cleanRest = Object.fromEntries(
    Object.entries(rest).filter(([key]) => !deprecatedSet.has(key)),
  ) as typeof rest;

  return (
    <CardNext inset={inset} type={type} background={background} {...cleanRest}>
      {children}
    </CardNext>
  );
};
