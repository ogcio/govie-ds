import { Fragment } from 'react/jsx-runtime';
import { Swatch, SwatchProps } from './swatch';

export type SwatchSetProps = {
  name: string | number;
  set: SwatchProps[];
  hideValues?: boolean;
};

export function SwatchSet({ name, set, hideValues = false }: SwatchSetProps) {
  return (
    <div className="flex flex-col gap-md">
      <p className="font-semibold text-sm text-gray-800">{name}</p>
      <div className="flex flex-col">
        {set.map((swatch) => (
          <Fragment key={swatch.name}>
            <Swatch
              name={swatch.name}
              value={swatch.value}
              hideValue={hideValues}
            />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
