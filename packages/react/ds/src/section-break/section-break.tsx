export type SectionBreakSize = 'sm' | 'md' | 'lg' | 'xl';
export type SectionBreakProps = { size?: SectionBreakSize };

export function SectionBreak({ size = 'sm' }: SectionBreakProps) {
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
      data-testid="govie-section-break"
      className={marginClass}
      role="separator"
      aria-label="Section break"
    />
  );
}
