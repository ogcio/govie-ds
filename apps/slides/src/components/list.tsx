import { Fragment } from "react/jsx-runtime";

export type ListItem = {
  title: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any; // TODO: type
};

function ListItem({ title, description, icon: Icon }: ListItem) {
  return (
    <li key={title} className="bg-blue-50 px-md py-sm rounded">
      <div className="flex gap-md items-center">
        {Icon ? (
          <div className="h-[8px] w-[8px] rounded-full bg-green-200 flex items-center justify-center ring-8 ring-white">
            <Icon className="w-[4px] h-[4px]" />
          </div>
        ) : null}
        <div className="flex flex-col gap-xs">
          <p className="text-md text-gray-600">{title}</p>
          {description ? (
            <p className="text-gray-500 text-xs">{description}</p>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function List({ items }: { items: ListItem[] }) {
  return (
    <ul className="grid grid-cols-1 gap-md">
      {items.map((item) => (
        <Fragment key={item.title}>
          <ListItem {...item} />
        </Fragment>
      ))}
    </ul>
  );
}
