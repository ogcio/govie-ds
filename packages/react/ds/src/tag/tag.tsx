export const TagTypeEnum = {
  default: 'default',
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
  counter: 'counter',
  counterWarning: 'counterWarning',
} as const;

export type TagType = (typeof TagTypeEnum)[keyof typeof TagTypeEnum];

export type TagProps = {
  text: string;
  type?: TagType;
  dataTestid?: string;
};

const tagClass = {
  [TagTypeEnum.default]: 'gi-tag-default',
  [TagTypeEnum.info]: 'gi-tag-info',
  [TagTypeEnum.success]: 'gi-tag-success',
  [TagTypeEnum.warning]: 'gi-tag-warning',
  [TagTypeEnum.error]: 'gi-tag-error',
  [TagTypeEnum.counter]: 'gi-tag-counter',
  [TagTypeEnum.counterWarning]: 'gi-tag-counter-warning',
};

export const Tag = ({
  text,
  type = TagTypeEnum.default,
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
