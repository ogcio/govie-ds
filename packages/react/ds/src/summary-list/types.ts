import { LinkProps } from '../link/link.js';
import {
  SummaryListAction,
  SummaryListRow,
  SummaryListTitle,
  SummaryListValue,
} from './summary-list.js';

export type SummaryListItem = {
  key: string;
  value: string | string[];
  actionLink: LinkProps;
};

export type SummaryListTitleProps = {
  children: string;
};

export type SummaryListValueProps = {
  children: string | string[];
};

export type SummaryListActionProps = Pick<LinkProps, 'children' | 'href'>;

export type SummaryListRowProps = {
  children: React.ReactElement<
    typeof SummaryListTitle | typeof SummaryListValue | typeof SummaryListAction
  >[];
  withBorder?: boolean;
} & React.AriaAttributes;

export type SummaryListProps = {
  children: React.ReactElement<typeof SummaryListRow>[] & React.AriaAttributes;
};
