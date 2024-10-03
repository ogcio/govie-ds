// Define the enum
export enum TagType {
  blue = 'blue',
  gray = 'gray',
  green = 'green',
  yellow = 'yellow',
  red = 'red',
}

// Update the TagProps type to accept enum values only
export type TagProps = {
  text: string;
  type?: TagType | keyof typeof TagType;
};

// Define the colour mapping
const colour = {
  [TagType.blue]: {
    background: 'gi-bg-blue-50',
    border: 'gi-border-blue-100',
    text: 'gi-text-blue-700',
  },
  [TagType.gray]: {
    background: 'gi-bg-gray-50',
    border: 'gi-border-gray-200',
    text: 'gi-text-gray-700',
  },
  [TagType.green]: {
    background: 'gi-bg-green-50',
    border: 'gi-border-green-100',
    text: 'gi-text-green-700',
  },
  [TagType.yellow]: {
    background: 'gi-bg-yellow-50',
    border: 'gi-border-yellow-300',
    text: 'gi-text-yellow-700',
  },
  [TagType.red]: {
    background: 'gi-bg-red-50',
    border: 'gi-border-red-100',
    text: 'gi-text-red-700',
  },
};

// Tag component
export const Tag = ({ text, type = TagType.blue }: TagProps) => {
  return (
    <strong
      className={`${colour[type].text} ${colour[type].border} ${colour[type].background} gi-rounded-md gi-border-xs gi-font-normal gi-py-0 gi-px-2 gi-inline-flex gi-justify-center gi-align gi-items-center`}
    >
      {text}
    </strong>
  );
};

// Set the displayName for debugging purposes
Tag.displayName = 'Tag';
