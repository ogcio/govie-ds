export type SummaryListItem = {
  key: string;
  value: string | string[];
  actionText?: string;
  actionHref?: string;
};

export type SummaryListProps = {
  items: SummaryListItem[];
};
