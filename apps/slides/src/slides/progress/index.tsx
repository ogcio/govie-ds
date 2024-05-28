import { Fragment } from "react/jsx-runtime";
import { Slide } from "../../components/slide";
import { Foundations } from "../design-tokens/foundations";
import { IssuesSlide } from "./issues-slide";

export function ProgressSlides() {
  return (
    <Fragment>
      <Slide title="Design System">
        <Foundations />
      </Slide>
      <Slide title="Current Situation">
        <Foundations showProgress />
      </Slide>
      <IssuesSlide />
    </Fragment>
  );
}
