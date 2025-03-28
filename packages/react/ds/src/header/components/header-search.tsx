import { Button } from '../../button/button.js';
import { Heading } from '../../heading/heading.js';
import { Icon, IconId } from '../../icon/icon.js';
import { InputText } from '../../input-text/input-text.js';

export type HeaderSearchProps = {
  action?: string;
  serverAction?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  icon?: IconId;
};

export function HeaderSearch({
  action,
  serverAction,
  icon = 'search',
}: HeaderSearchProps) {
  const ActionType = action || serverAction;
  return (
    <form
      action={ActionType}
      className="gi-max-w-md gi-mx-auto"
      data-testid="header-search-form"
      aria-label="Search Form"
    >
      <Heading as="h4">Search the website</Heading>
      <div className="gi-flex gi-items-end gi-mt-4">
        <InputText
          name="search_query"
          aria-label="Search the website"
          placeholder="Enter search term"
          id="search"
          type="text"
          className="gi-flex-auto"
        />
        <Button className="gi-ml-1 gi-flex-none" aria-label="Submit search">
          Search
          <Icon icon={icon} ariaLabel="Search" aria-hidden="true" />
        </Button>
      </div>
    </form>
  );
}
