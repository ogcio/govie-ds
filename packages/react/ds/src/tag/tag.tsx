export enum TagType {
  blue = 'blue',
  gray = 'gray',
  green = 'green',
  yellow = 'yellow',
  red = 'red',
}

export type TagProps = {
  text: string;
  type?: TagType | keyof typeof TagType;
};

const tagClass = {
  [TagType.blue]: 'gi-tag-blue',
  [TagType.gray]: 'gi-tag-gray',
  [TagType.green]: 'gi-tag-green',
  [TagType.yellow]: 'gi-tag-yellow',
  [TagType.red]: 'gi-tag-red',
};

export const Tag = ({ text, type = TagType.blue }: TagProps) => {
  return <strong className={`gi-tag ${tagClass[type]}`}>{text}</strong>;
};

// Set the displayName for debugging purposes
Tag.displayName = 'Tag';
