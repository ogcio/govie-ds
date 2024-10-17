import { Link } from '../link/link.js';

export type LinkProps = {
  items: Array<string | React.ReactElement>;
  spaced?: boolean;
  type?: 'bullet' | 'number' | 'normal';
};

const getListClass = ({
  spaced,
  type,
}: Omit<LinkProps, 'as' | 'items' | 'link'>) => {
  const classes = [];

  switch (type) {
    case 'bullet':
      classes.push('gi-list-bullet');
      break;
    case 'number':
      classes.push('gi-list-number');
      break;
    default:
      classes.push('gi-list');
      break;
  }

  if (spaced) {
    classes.push('gi-list-spaced');
  }

  return classes.join(' ');
};

export function List({ items, ...props }: LinkProps) {
  const listClasses = getListClass(props);

  return (
    <ul className={listClasses}>
      {items.map((item, index) => (
        <li key={`item-${index}`}>{item}</li>
      ))}
    </ul>
  );
}
