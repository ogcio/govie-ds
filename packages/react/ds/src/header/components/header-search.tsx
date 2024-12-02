import { Button } from '../../button/button.js';
import { Heading } from '../../heading/heading.js';
import { Icon, IconId } from '../../icon/icon.js';
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
    <div
      id="SearchContainer"
      className={`gi-hidden gi-bg-gray-50 gi-px-8 gi-pt-8 gi-pb-14 gi-border-b-2xl gi-border-b-emerald-800`}
    >
      <form action={ActionType} className="gi-max-w-md gi-mx-auto">
        <Heading as="h4">Search the website</Heading>
        <div className="gi-flex gi-items-end gi-mt-4">
          <TextInput
            name="search_query"
            id="search"
            type="text"
            className="gi-flex-auto"
          />
          <Button className="gi-ml-1 gi-flex-none">
            Search
            <Icon icon={icon} ariaLabel="Search" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default HeaderSearch;
