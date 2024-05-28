import { Fragment } from "react/jsx-runtime";
import { Slide } from "../../components/slide";
import { Foundations } from "../design-tokens/foundations";
import { Timeline } from "../../components/timeline";
import { CurrentSituation } from "./current-situation";

export function StrategySlide() {
  return (
    <Slide title="Strategy">
      <div className="flex flex-col gap-8">
        <Timeline
          items={[
            {
              title: "Primitive Tokens",
              description:
                "Create a codified set of primitive design tokens with workflow across engineering and design.",
            },
            {
              title: "Semantic Tokens",
              description:
                "Build codified semantic tokens via holistic view of components in scope.",
            },
            {
              title: "Documentation Site",
              description: "Document initial guidelines and design tokens.",
            },
          ]}
        />
        <Timeline
          items={[
            {
              title: "Promulgate token usage",
              description:
                "Work with other departments to provide tokens in appropriate formats for their use case.",
            },
            {
              title: "Review theme builder",
              description:
                "Review theme builder to support customisation of design tokens for different brands.",
            },
            {
              title: "Review components and assets",
              description:
                "Review making assets available, and assess current component implementations to review strategy for their future development.",
            },
          ]}
        />
      </div>
    </Slide>
  );
}

export function StrategySlides() {
  return (
    <Fragment>
      <Slide title="Design System">
        <Foundations />
      </Slide>
      <Slide title="Current Situation">
        <CurrentSituation />
      </Slide>
      <StrategySlide />
    </Fragment>
  );
}
