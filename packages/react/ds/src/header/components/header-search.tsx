import { Button } from '../../button/button.js';
import { Heading } from '../../heading/heading.js';
import { translate as t } from '../../i18n/utility.js';
import { IconId } from '../../icon/icon.js';
import { IconButton } from '../../icon-button/icon-button.js';
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
      aria-label={t('header.searchForm', { defaultValue: 'Search Form' })}
    >
      <Heading as="h4">Search the website</Heading>
      <div className="gi-flex gi-items-end gi-mt-4">
        <InputText
          name="search_query"
          aria-label={t('header.searchTheWebsite', {
            defaultValue: 'Search the Website',
          })}
          placeholder="Enter search term"
          id="search"
          type="text"
          className="gi-flex-auto"
        />
        <div className="gi-ml-1 gi-flex-none gi-hidden md:gi-block">
          <Button
            aria-label={t('header.submitSearch', {
              defaultValue: 'Submit Search',
            })}
          >
            {t('header.search', { defaultValue: 'Search' })}
          </Button>
        </div>
        <div className="gi-ml-1 gi-flex-none gi-block md:gi-hidden">
          <IconButton
            aria-label={t('header.search', { defaultValue: 'Search' })}
            aria-hidden="true"
            icon={{ icon }}
          />
        </div>
      </div>
    </form>
  );
}
