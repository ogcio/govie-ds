export type AccordionItemProps = {
  label: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
  variant?: 'default' | 'small';
  content?: string;
};

export type AccordionProps = {
  items: AccordionItemProps[];
  variant?: 'default' | 'small';
};
