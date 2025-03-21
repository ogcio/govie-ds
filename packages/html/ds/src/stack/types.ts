export type Gap =
  | number
  | {
      base?: number;
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
      '2xl'?: number;
    };
type SimpleDirection = 'column' | 'row';

export type Alignment = 'start' | 'center' | 'end' | 'stretch';
export type Distribution =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly'
  | 'stretch';
export type Direction =
  | SimpleDirection
  | {
      base?: SimpleDirection;
      xs?: SimpleDirection;
      sm?: SimpleDirection;
      md?: SimpleDirection;
      lg?: SimpleDirection;
      xl?: SimpleDirection;
      '2xl'?: SimpleDirection;
    };

export type StackProps = {
  direction?: Direction;
  itemsAlignment?: Alignment;
  itemsDistribution?: Distribution;
  gap?: Gap;
  hasDivider?: boolean;
  wrap?: boolean;
  fixedHeight?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
