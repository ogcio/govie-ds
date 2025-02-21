export const TagTypeEnum = {
  Default: 'default',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Error: 'error',
  Counter: 'counter',
  CounterWarning: 'counterWarning',
} as const;

export type TagType = (typeof TagTypeEnum)[keyof typeof TagTypeEnum];

export type TagProps = {
  text: string;
  type?: TagType;
  dataTestid?: string;
};

const tagClass = {
  [TagTypeEnum.Default]: 'gi-tag-default',
  [TagTypeEnum.Info]: 'gi-tag-info',
  [TagTypeEnum.Success]: 'gi-tag-success',
  [TagTypeEnum.Warning]: 'gi-tag-warning',
  [TagTypeEnum.Error]: 'gi-tag-error',
  [TagTypeEnum.Counter]: 'gi-tag-counter',
  [TagTypeEnum.CounterWarning]: 'gi-tag-counter-warning',
};

export const Tag = ({
  text,
  type = TagTypeEnum.Default,
  dataTestid,
}: TagProps) => {
  return (
    <strong
      className={`gi-tag ${tagClass[type]}`}
      data-testid={dataTestid}
      aria-label={text}
    >
      {text}
    </strong>
  );
};

// Set the displayName for debugging purposes
Tag.displayName = 'Tag';
