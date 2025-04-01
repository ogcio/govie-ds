export const ListTypeEnum = {
  None: 'none',
  Bullet: 'bullet',
  Number: 'number',
} as const;

export type ListType = (typeof ListTypeEnum)[keyof typeof ListTypeEnum];

export type ListProps = {
  items: string[];
  spaced?: boolean;
  type?: ListType;
};
