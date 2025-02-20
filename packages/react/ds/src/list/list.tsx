export const ListTypeEnum = {
  None: 'none',
  Bullet: 'bullet',
  Number: 'number',
} as const;

export type ListType = (typeof ListTypeEnum)[keyof typeof ListTypeEnum];

export type ListProps = {
  items: Array<string | React.ReactElement>;
  spaced?: boolean;
  type?: ListType;
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLive?: 'polite' | 'assertive' | 'off';
};

const getListClass = ({ spaced, type }: Omit<ListProps, 'items'>) => {
  const classes = [];

  switch (type) {
    case ListTypeEnum.Bullet: {
      classes.push('gi-list-bullet');
      break;
    }
    case ListTypeEnum.Number: {
      classes.push('gi-list-number');
      break;
    }
    default: {
      classes.push('gi-list');
      break;
    }
  }

  if (spaced) {
    classes.push('gi-list-spaced');
  }

  return classes.join(' ');
};

export function List({
  items,
  ariaLabel,
  ariaDescribedBy,
  ariaLive = 'off',
  type = ListTypeEnum.None,
  spaced,
}: ListProps) {
  return (
    <ul
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-live={ariaLive}
      role={type === ListTypeEnum.None ? 'list' : undefined}
      className={getListClass({ spaced, type })}
      data-testid="govieList"
    >
      {items.map((item, index) => {
        return <li key={`listItem-${index}`}>{item}</li>;
      })}
    </ul>
  );
}
