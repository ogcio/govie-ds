import { Fragment } from 'react/jsx-runtime';
import { SwatchSet, SwatchSetProps } from './swatch-set.js';

export type SwatchSetsProps = {
  sets: SwatchSetProps[];
  hideValues?: boolean;
};

export function SwatchSets({ sets, hideValues = false }: SwatchSetsProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-x-md gap-y-lg sm:grid-cols-1">
      {sets.map((entry) => (
        <Fragment key={entry.name}>
          <SwatchSet
            name={entry.name}
            set={entry.set}
            hideValues={hideValues}
          />
        </Fragment>
      ))}
    </div>
  );
}
