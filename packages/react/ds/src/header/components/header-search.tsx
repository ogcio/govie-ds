import { Icon, IconId } from '../../icon/icon.js';

function HeaderSearch({
  action,
  serverAction,
  className,
  icon = 'search',
}: {
  action?: string;
  // Temporary solution to include the usage of Server Actions, as the types of react allow only strings | undefined. The types/react package will eventually get allow this and a more permanent solution will be implemented
  serverAction?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  className?: string;
  icon?: IconId;
}) {
  const ActionType = action || serverAction;
  return (
    <div
      id="SearchContainer"
      className={`gi-flex gi-h-0 gi-bg-gray-50 gi-overflow-hidden gi-px-4 xs:gi-px-8 ${className}`}
    >
      <div className="sm:gi-w-3/6 gi-w-full gi-flex gi-mx-auto gi-flex-col gi-my-8">
        <form action={ActionType}>
          <label htmlFor="search" className="gi-text-md gi-font-bold gi-mb-4">
            Enter search term
          </label>
          <div className="gi-flex">
            <input
              name="search_query"
              type="text"
              className="gi-px-3 gi-py-1 gi-grow gi-w-full"
              id="search"
            />
            <button className="gi-bg-emerald-800 gi-text-white gi-p-md">
              <Icon icon={icon} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HeaderSearch;
