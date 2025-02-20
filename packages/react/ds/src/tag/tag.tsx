export const TagTypeEnum = {
  DEFAULT: 'default',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  COUNTER: 'counter',
  COUNTER_WARNING: 'counterWarning',
} as const;

export type TagType = (typeof TagTypeEnum)[keyof typeof TagTypeEnum];

export type TagProps = {
  text: string;
  type?: TagType;
  dataTestid?: string;
};

const tagClass = {
  [TagTypeEnum.DEFAULT]: 'gi-tag-default',
  [TagTypeEnum.INFO]: 'gi-tag-info',
  [TagTypeEnum.SUCCESS]: 'gi-tag-success',
  [TagTypeEnum.WARNING]: 'gi-tag-warning',
  [TagTypeEnum.ERROR]: 'gi-tag-error',
  [TagTypeEnum.COUNTER]: 'gi-tag-counter',
  [TagTypeEnum.COUNTER_WARNING]: 'gi-tag-counter-warning',
};

export const Tag = ({
  text,
  type = TagTypeEnum.DEFAULT,
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
