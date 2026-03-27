import { cn } from '../cn.js';
import { translate as t } from '../i18n/utility.js';

export type SectionBreakSize = 'sm' | 'md' | 'lg' | 'xl';
export type SectionBreakProps = {
  size?: SectionBreakSize;
  color?: string;
} & React.HtmlHTMLAttributes<HTMLHRElement>;

export function SectionBreak({
  size = 'sm',
  color = 'gi-border-gray-400',
  ...props
}: SectionBreakProps) {
  let marginClass = 'gi-section-break-sm';
  switch (size) {
    case 'md': {
      marginClass = 'gi-section-break-md';
      break;
    }
    case 'lg': {
      marginClass = 'gi-section-break-lg';
      break;
    }
    case 'xl': {
      marginClass = 'gi-section-break-xl';
      break;
    }
    default: {
      break;
    }
  }
  return (
    <hr
      className={cn(marginClass, color)}
      role="separator"
      aria-label={t('sectionBreak.sectionBreak', {
        defaultValue: 'Section Break',
      })}
      {...props}
    />
  );
}
