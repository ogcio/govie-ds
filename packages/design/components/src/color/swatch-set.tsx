import { Fragment } from "react/jsx-runtime";
import { Swatch, SwatchProps } from "./swatch.js";

export type SwatchSetProps = {
  name: string;
  set: SwatchProps[];
  hideValues?: boolean;
};

export function SwatchSet({ name, set, hideValues = false }: SwatchSetProps) {
  return (
    <div>
      <p className="font-semibold text-sm text-gray-900">{name}</p>
      <div className="grid mt-lg grid-cols-1 sm:grid-cols-11 gap-y-md gap-x-md sm:mt-md 2xl:mt-0">
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
