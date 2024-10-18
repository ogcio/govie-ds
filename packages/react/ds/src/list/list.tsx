export type ListProps = {
  items: Array<string | React.ReactElement>;
  spaced?: boolean;
  type?: 'bullet' | 'number' | 'normal';
};

const getListClass = ({ spaced, type }: Omit<ListProps, 'items' | 'link'>) => {
  const classes = [];

  switch (type) {
    case 'bullet': {
      classes.push('gi-list-bullet');
      break;
    }
    case 'number': {
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
    <ul className={getListClass(props)}>
      {items.map((item, index) => {
        return <li key={`listItem-${index}`}>{item}</li>;
      })}
    </ul>
  );
}
