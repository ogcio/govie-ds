export type AccordionItemProps = {
  label: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'small';
} & React.HTMLAttributes<HTMLDivElement>;

export type AccordionProps = {
  items: AccordionItemProps[];
  iconStart?: boolean;
  variant?: 'default' | 'small';
};
