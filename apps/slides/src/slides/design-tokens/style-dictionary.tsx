import { Fragment } from "react/jsx-runtime";
import { Card } from "../../components/card";
import { Code } from "../../components/code";
import { Slide } from "../../components/slide";

function TokensInput() {
  return (
    <Card title="tokens.json">
      <Code language="json">
        {`{
  "primitive": {
    "color": {
      "blue": {
        "500": { 
          "$type": "color", 
          "$value": "#3b82f6" 
        }
      }
    }
  },
  "semantic": {
    "surface": {
      "primary": {
        "$type": "color",
        "$value": "{primitive.color.blue.500}"
      }
    }
  }
}`}
      </Code>
    </Card>
  );
}

export function StyleDictionarySlides() {
  return (
    <Fragment>
      <Slide title="Style Dictionary">
        <div className="grid grid-cols-2 gap-4">
          <TokensInput />
          <div className="flex flex-col gap-4">
            <Card title="theme.css">
              <Code language="css">
                {`:root {
  --ods-color-blue-500: #3b82f6;
  --ods-surface-primary: var(--ods-color-blue-500);
}`}
              </Code>
            </Card>
            <Card title="tokens.ts">
              <Code language="typescript">
                {`export const tokens = {
  primitive: {
    color: {
      blue: {
        "500": "#3b82f6",
      },
    },
  },
  semantic: {
    surface: {
      primary: "{primitive.color.blue.500}",
    },
  },
};`}
              </Code>
            </Card>
          </div>
        </div>
      </Slide>
      <Slide title="Style Dictionary">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <Card title="tokens.json">
              <Code language="json">
                {`{
  "primitive": {
    ...
  },
  "semantic": {
    ...
  },
}`}
              </Code>
            </Card>
            <Card title="theme-1.json">
              <Code language="json">
                {`{
  "semantic": { ... "{primitive.color.green.500}" }
}`}
              </Code>
            </Card>
            <Card title="theme-2.json">
              <Code language="json">
                {`{
  "semantic": { ... "primitive.color.red.500}" }
}`}
              </Code>
            </Card>
          </div>
          <div className="flex flex-col gap-4">
            <Card title="primitive.json">
              <Code language="json">{`{ "primitive": { ... } }`}</Code>
            </Card>
            <Card title="default-hybrid.json">
              <Code language="json">{`{
  "semantic": { ... "{primitive.color.green.500}" }
  "component": { ... },
}`}</Code>
            </Card>
            <Card title="alternative-hybrid.json">
              <Code language="json">{`{
  "semantic": { ... "{primitive.color.red.500}" }
  "component": { ... },
}`}</Code>
            </Card>
            <Card title="manifest.json">
              <Code language="json">{`{
  "collections": {
    "primitive": { ..."primitive.json" }
    "semantic": {
      "modes": { 
        "Default": ["default-hybrid.json"],
        "Alternative": ["alternative-hybrid.json"]
    ...`}</Code>
            </Card>
          </div>
        </div>
      </Slide>
    </Fragment>
  );
}
