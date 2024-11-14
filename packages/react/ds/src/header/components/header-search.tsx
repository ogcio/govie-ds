import { IconId } from '../../icon/icon.js';
import { IconButton } from '../../icon-button/icon-button.js';
import { TextInput } from '../../text-input/text-input.js';

function HeaderSearch({
  action,
  serverAction,
  className,
  icon = 'search',
}: {
  action?: string;
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
      <div className="gi-w-fit gi-mx-auto gi-flex-col gi-my-8">
        <form action={ActionType}>
          <div className="gi-flex gi-items-end">
            <TextInput
              label={{ text: 'Enter search term' }}
              name="search_query"
              type="text"
            />
            <IconButton
              icon={{ icon, ariaLabel: 'Open' }}
              size="medium"
              className="gi-mb-4 gi-ml-1"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default HeaderSearch;
