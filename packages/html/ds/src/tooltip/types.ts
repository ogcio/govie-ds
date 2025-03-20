export type Position = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
  text: string;
  position?: Position;
  dataTestid?: string;
} & React.HTMLAttributes<HTMLSpanElement>;
