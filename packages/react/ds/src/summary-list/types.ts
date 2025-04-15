import { LinkProps } from '../link/link.js';
import {
  SummaryListAction,
  SummaryListRow,
  SummaryListValue,
} from './summary-list.js';

export type SummaryListItem = {
  key: string;
  value: string | string[];
  actionLink: LinkProps;
};

export type SummaryListValueProps = {
  children: React.ReactNode;
};

export type SummaryListActionProps = Pick<
  LinkProps,
  'children' | 'href' | 'asChild'
>;

export type SummaryListRowProps = {
  label: string;
  withBorder?: boolean;
  children:
    | React.ReactElement<typeof SummaryListValue | typeof SummaryListAction>
    | React.ReactElement<typeof SummaryListValue | typeof SummaryListAction>[];
} & React.AriaAttributes;

export type SummaryListProps = {
  children:
    | React.ReactElement<typeof SummaryListRow>[]
    | React.ReactElement<typeof SummaryListRow>;
  dataTestid?: string;
};
