export enum TypeEnum {
  None = 'none',
  Bullet = 'bullet',
  Number = 'number',
}

export type ListProps = {
  items: Array<string | React.ReactElement>;
  spaced?: boolean;
  type?: TypeEnum;
};

const getListClass = ({ spaced, type }: Omit<ListProps, 'items'>) => {
  const classes = [];

  switch (type) {
    case TypeEnum.Bullet: {
      classes.push('gi-list-bullet');
      break;
    }
    case TypeEnum.Number: {
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

export function List({ items, ...props }: ListProps) {
  return (
    <ul className={getListClass(props)} data-testid="govieList">
      {items.map((item, index) => {
        return <li key={`listItem-${index}`}>{item}</li>;
      })}
    </ul>
  );
}
