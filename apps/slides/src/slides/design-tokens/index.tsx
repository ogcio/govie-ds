import { Fragment } from "react/jsx-runtime";
import { SwatchSet, SwatchSets } from "@ogcio-ds/design-components";
import { meta } from "@ogcio-ds/theme-govie";
import { CheckIcon } from "@heroicons/react/20/solid";
import { Slide } from "../../components/slide";
import { Foundations } from "./foundations";
import { TokenName, Tokens, TokensStacked } from "../../components/tokens";
import { Quote } from "../../components/quote";
import { List } from "../../components/list";
import { StyleDictionarySlides } from "./style-dictionary";
import { Timeline } from "../../components/timeline";
import greensImage from "./greens.png";
import footerImage from "./footer.png";
import { dtcgToSet } from "../utils";

const primitiveTokenExamples = [
  {
    name: "color/blue-500",
    value: meta.light.unresolved.primitive.color.blue["500"].$value,
  },
  {
    name: "space/xs",
    value: "4px",
  },
  {
    name: "font-size/lg",
    value: "20px",
  },
  {
    name: "font-weight/semibold",
    value: "600",
  },
  {
    name: "shadow/md",
    value: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
];

const semanticTokenExamples = [
  {
    name: "surface/primary",
    value: meta.light.unresolved.semantic.surface.primary.$value,
  },
  {
    name: "surface/secondary",
    value: meta.light.unresolved.semantic.surface.secondary.$value,
  },
];

const componentTokenExamples = [
  {
    name: "button/primary-background-color-default",
    value:
      meta.light.unresolved.component.button["primary-background-color-default"]
        .$value,
  },
  {
    name: "button/secondary-background-color-hover",
    value: "{semantic.surface.secondary}",
  },
];

export function DesignTokensSlides() {
  return (
    <Fragment>
      <Slide title="Design System">
        <Foundations />
      </Slide>
      <Slide title="Design tokens">
        <Quote>
          Design tokens are used to abstract design decisions into reusable and
          consistent values that can be shared across teams and platforms.
        </Quote>
      </Slide>
      <Slide title="Design tokens">
        <div className="flex justify-center">
          <Tokens tokens={primitiveTokenExamples} />
        </div>
      </Slide>
      <Slide title="Design token types">
        <div className="flex justify-center">
          <div className="flex flex-col gap-2 w-[150px]">
            {[
              "color",
              "space",
              "shadow",
              "opacity",
              "radii",
              "border",
              "timing",
            ].map((type) => (
              <Fragment key={type}>
                <TokenName name={type} />
              </Fragment>
            ))}
          </div>
        </div>
      </Slide>
      <Slide title="Design tokens">
        <Timeline
          items={[
            {
              title: "Introduction",
              date: "2014",
              description:
                "Design tokens are introduced by Salesforce as a concept to abstract design decisions into reusable and consistent values.",
            },
            {
              title: "Theo",
              date: "2014",
              description:
                "Salesforce introduce Theo as a build tool to convert JSON to different outputs.",
            },
            {
              title: "Style Dictionary",
              date: "2017",
              description: "Amazon introduce their own design token tooling.",
            },
          ]}
        />
        <Timeline
          items={[
            {
              title: "Design Tokens Community Group",
              date: "2019",
              description:
                "Provide standards upon which products and design tools can rely for sharing stylistic pieces of a design system at scale.",
            },
            {
              title: "Figma variables introduced",
              date: "2023",
              description:
                "Figma introduces variables to allow designers to manage design tokens (string, number, colour, boolean).",
            },
            {
              title: "Figma typography variables",
              date: "2024",
              description:
                "Figma introduces typography variables to allow designers to manage font family, font size, line height, letter spacing etc.",
            },
          ]}
        />
      </Slide>
      <Slide title="Design token benefits">
        <List
          items={[
            {
              title: "Consistency across platforms and devices",
              description:
                "Design elements maintain their visual properties across different screen sizes, resolutions, and environments",
            },
            {
              title: "Scalability and maintenance",
              description:
                "Updating a design token can automatically propagate changes across the entire design system, saving time and effort in maintenance",
            },
            {
              title: "Collaboration and communication",
              description:
                "Common language between designers and developers, fostering collaboration and communication",
            },
            {
              title: "Integration with development workflow",
              description:
                "Utilised in code to ensure design consistency and maintainability",
            },
            {
              title: "Versioning and auditing",
              description:
                "Changes are audited and versioned, providing a history of design decisions and changes",
            },
          ].map((item) => ({ ...item, icon: CheckIcon }))}
        />
      </Slide>
      <Slide title="Multitier design tokens">
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                name: "Primitive",
                description: "Basic building blocks of a design system",
              },
              {
                name: "Semantic",
                description:
                  "Abstract design decisions into reusable and consistent values",
              },
              {
                name: "Component",
                description:
                  "Specific to a component or element in a design system",
              },
            ].map((tier) => (
              <div className="flex flex-col gap-2" key={tier.name}>
                <h2 className="text-xl font-semibold text-gray-800 text-center">
                  {tier.name}
                </h2>
                <p className="text-blue-400 text-center italic">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <TokensStacked tokens={primitiveTokenExamples} />
            <TokensStacked tokens={semanticTokenExamples} />
            <TokensStacked tokens={componentTokenExamples} />
          </div>
        </div>
      </Slide>
      <Slide title="Design tokens">
        <div className="flex justify-center">
          <div className="flex gap-4">
            <div>
              <img src={greensImage} alt="Greens" width={600} />
            </div>
            <div>
              <img src={footerImage} alt="Footer" width={300} />
            </div>
          </div>
        </div>
      </Slide>
      <StyleDictionarySlides />
      <Slide title="Design token example">
        <div className="flex flex-col gap-6">
          <SwatchSets
            sets={[
              {
                name: "Green",
                set: dtcgToSet(meta.light.resolved.primitive.color.green),
              },
              {
                name: "Blue",
                set: dtcgToSet(meta.light.resolved.primitive.color.blue),
              },
            ]}
          />
          <SwatchSet
            hideValues
            name="Surface"
            set={[
              {
                name: "Primary",
                value: meta.light.resolved.semantic.surface.primary.$value,
              },
            ]}
          />
          <div className="flex justify-center">
            <div className="grid grid-cols-[auto,1fr] gap-8">
              <div>
                <Button>Button</Button>
              </div>
              <div>
                <Panel>Panel</Panel>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    </Fragment>
  );
}

function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="px-4 py-2 text-white rounded-md text-xs"
      style={{
        backgroundColor: "var(--ods-surface-primary)",
        boxShadow: "0 2px 0 #0b0c0c",
      }}
    >
      {children}
    </button>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="p-8 text-white w-[600px] text-center"
      style={{ backgroundColor: "var(--ods-surface-primary)" }}
    >
      {children}
    </div>
  );
}
