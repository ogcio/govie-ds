import { ComponentPropsWithoutRef, ReactNode, TdHTMLAttributes } from 'react';
import { LinkProps } from '../link/link.js';

export type SummaryListItem = {
  key: string;
  value: string | string[];
  actionLink: LinkProps;
};

export type SummaryListValueProps = TdHTMLAttributes<HTMLTableCellElement>;

export type SummaryListActionProps = LinkProps;

export type SummaryListRowProps = ComponentPropsWithoutRef<'tr'> & {
  label: ReactNode;
  withBorder?: boolean;
};

export type SummaryListProps = ComponentPropsWithoutRef<'table'> & {
  withBorder?: boolean;
};

export type SummaryListHeaderProps = ComponentPropsWithoutRef<'tr'> & {
  label?: ReactNode;
};
export type SummaryListActionListProps = ComponentPropsWithoutRef<'thead'> & {
  label?: string;
};
