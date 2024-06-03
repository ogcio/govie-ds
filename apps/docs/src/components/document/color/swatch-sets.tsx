import { Fragment } from 'react/jsx-runtime';
import { SwatchSet, SwatchSetProps } from './swatch-set';

export type SwatchSetsProps = {
  sets: SwatchSetProps[];
  hideValues?: boolean;
};

export function SwatchSets({ sets, hideValues = false }: SwatchSetsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2xl">
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
