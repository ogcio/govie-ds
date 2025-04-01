export type Position = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
  text: string;
  content: string;
  position?: Position;
  dataTestid?: string;
};
