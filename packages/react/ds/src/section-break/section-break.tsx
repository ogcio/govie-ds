export type SectionBreakSize = 'sm' | 'md' | 'lg' | 'xl';

export function SectionBreak({ size = 'sm' }: { size?: SectionBreakSize }) {
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
  return <hr className={marginClass} />;
}
