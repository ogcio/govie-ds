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
};
