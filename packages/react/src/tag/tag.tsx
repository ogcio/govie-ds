import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

export const TagTypeEnum = {
  Default: 'default',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Counter: 'counter',
  CounterWarning: 'counterWarning',
} as const;

export const TagSizeEnum = {
  Default: 'default',
  Small: 'small',
} as const;

export type TagType = (typeof TagTypeEnum)[keyof typeof TagTypeEnum];

export type TagSize = (typeof TagSizeEnum)[keyof typeof TagSizeEnum];

export type TagProps = {
  text: string;
  type?: TagType;
  size?: TagSize;
} & Omit<ComponentPropsWithoutRef<'strong'>, 'children'>;

const tagClass = {
  [TagTypeEnum.Default]: 'gi-tag-default',
  [TagTypeEnum.Info]: 'gi-tag-info',
  [TagTypeEnum.Success]: 'gi-tag-success',
  [TagTypeEnum.Warning]: 'gi-tag-warning',
  [TagTypeEnum.Error]: 'gi-tag-error',
  [TagTypeEnum.Counter]: 'gi-tag-counter',
  [TagTypeEnum.CounterWarning]: 'gi-tag-counter-warning',
};

const tagSizeClass = {
  [TagSizeEnum.Default]: 'gi-tag-size-default',
  [TagSizeEnum.Small]: 'gi-tag-size-small',
};

export const Tag = ({
  text,
  type = TagTypeEnum.Default,
  size = TagSizeEnum.Default,
  className,
  ...props
}: TagProps) => (
  <strong
    {...props}
    className={clsx('gi-tag', tagClass[type], tagSizeClass[size], className)}
  >
    {text}
  </strong>
);

Tag.displayName = 'Tag';
