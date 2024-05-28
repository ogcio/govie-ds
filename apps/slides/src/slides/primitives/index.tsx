import { Fragment } from "react/jsx-runtime";
import { Slide } from "../../components/slide";
import { meta } from "@ogcio-ds/theme-govie";
import { Space, SwatchSets, sortSpaces } from "@ogcio-ds/design-components";
import { objectKeys } from "ts-extras";
import { dtcgToSet } from "../utils";
import { StrategySlide } from "../strategy";
import { List } from "../../components/list";

const sets = objectKeys(meta.light.resolved.primitive.color).map((key) => ({
  name: key,
  set: dtcgToSet(meta.light.resolved.primitive.color[key]),
}));

const spaces = sortSpaces(meta.light.resolved.primitive.space).map((space) => ({
  name: space.name,
  value: `${space.value}px`,
}));

export function PrimitivesSlides() {
  return (
    <Fragment>
      <Slide title="Colours">
        <SwatchSets sets={sets.slice(0, 4)} />
      </Slide>
      <Slide title="Colours">
        <SwatchSets sets={sets.slice(4, 8)} />
      </Slide>
      <Slide title="Space">
        <div className="grid grid-cols-2 gap-md">
          <Space spaces={spaces.slice(0, 18)} />
          <Space spaces={spaces.slice(18)} />
        </div>
      </Slide>
      <Slide title="Primitives">
        <div className="flex justify-center">
          <div className="flex items-start gap-xl">
            <List
              items={[
                { title: "Colours" },
                { title: "Space" },
                { title: "Breakpoints" },
                { title: "Font Size" },
                { title: "Font Weight" },
                { title: "Line Height" },
              ]}
            />
            <List
              items={[
                { title: "Border Radius" },
                { title: "Border Width" },
                { title: "Shadow" },
                { title: "Opacity" },
                { title: "Z-Index" },
              ]}
            />
          </div>
        </div>
      </Slide>
      <StrategySlide />
    </Fragment>
  );
}
