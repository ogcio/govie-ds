export enum TagType {
  default = 'default',
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
  counter = 'counter',
  counterWarning = 'counterWarning',
}

export type TagProps = {
  text: string;
  type?: TagType | keyof typeof TagType;
  dataTestid?: string;
};

const tagClass = {
  [TagType.default]: 'gi-tag-default',
  [TagType.info]: 'gi-tag-info',
  [TagType.success]: 'gi-tag-success',
  [TagType.warning]: 'gi-tag-warning',
  [TagType.error]: 'gi-tag-error',
  [TagType.counter]: 'gi-tag-counter',
  [TagType.counterWarning]: 'gi-tag-counter-warning',
};

export const Tag = ({ text, type = TagType.default, dataTestid }: TagProps) => {
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
