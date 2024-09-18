export type SectionBreakSize = 'sm' | 'md' | 'lg' | 'xl';

export function SectionBreak({ size = 'sm' }: { size?: SectionBreakSize }) {
  let marginClass = 'gi-m-0';
  switch (size) {
    case 'md': {
      marginClass = 'gi-my-4';
      break;
    }
    case 'lg': {
      marginClass = 'gi-my-8';
      break;
    }
    case 'xl': {
      marginClass = 'gi-my-12';
      break;
    }
    default: {
      break;
    }
  }
  return <hr className={`gi-border-b-1 gi-border-gray-400 ${marginClass}`} />;
}
