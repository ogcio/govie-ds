export type TableProps = {
  layout?: 'auto' | 'fixed';
};

export type TableFootCell = {
  content: string;
  colSpan?: number;
  className?: string;
  align?: 'left' | 'center' | 'right';
  valign?: 'top' | 'middle' | 'bottom';
};

export type TablePropsExtension = TableProps & {
  captionText?: string;
  headers?: string[];
  rows?: string[][];
  foot?: TableFootCell[];
  stripped?: boolean;
  rowSize?: 'sm' | 'md' | 'lg';
  noBorder?: boolean;
};
