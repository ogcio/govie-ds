import { IconId } from '../../icon/icon.js';
import { IconButton } from '../../icon-button/icon-button.js';
import { TextInput } from '../../text-input/text-input.js';

function HeaderSearch({
  action,
  serverAction,
  icon = 'search',
}: {
  action?: string;
  serverAction?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  icon?: IconId;
}) {
  const ActionType = action || serverAction;
  return (
    <div id="SearchContainer" className={`gi-hidden gi-bg-gray-50 gi-p-4`}>
      <form action={ActionType}>
        <div className="gi-flex gi-items-end gi-max-w-md gi-mx-auto">
          <TextInput
            label={{ text: 'Enter search term', htmlFor: 'search' }}
            name="search_query"
            id="search"
            type="text"
            className="gi-flex-auto"
          />
          <IconButton
            icon={{ icon, ariaLabel: 'Open' }}
            size="medium"
            className="gi-mb-4 gi-ml-1 gi-flex-none"
          />
        </div>
      </form>
    </div>
  );
}

export default HeaderSearch;
