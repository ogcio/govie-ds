import clsx from 'clsx';
import { Divider } from '../Divider';

export type SectionBreakSize = 'sm' | 'md' | 'lg' | 'xl';
export type SectionBreakProps = {
  size?: SectionBreakSize;
  color?: string;
  'data-testid'?: string;
} & React.HtmlHTMLAttributes<HTMLHRElement>;

const marginClasses: Partial<Record<SectionBreakSize, string>> = {
  sm: 'gi-m-0',
  md: 'gi-my-4',
  lg: 'gi-my-8',
  xl: 'gi-my-12',
};

/** @deprecated Use `<Divider>` instead. */
export function SectionBreak({
  size = 'sm',
  color = 'gi-border-gray-400',
  id,
  style,
  className,
  'data-testid': dataTestId,
}: SectionBreakProps) {
  return (
    <Divider
      dataTestId={dataTestId}
      id={id}
      style={style}
      className={clsx(marginClasses[size], color, className)}
    />
  );
}
