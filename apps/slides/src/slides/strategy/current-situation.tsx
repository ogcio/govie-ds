function Item({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded shadow-sm px-md py-sm text-center text-xs text-gray-700 bg-green-100">
      {children}
    </div>
  );
}

function Text({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-gray-500">{children}</p>;
}

function Ul({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-sm text-xs list-disc ml-xl">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Card({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-md bg-gray-50 rounded p-lg shadow-sm">
      <h3 className="text-sm">{title}</h3>
      <Ul items={items} />
    </div>
  );
}

export function CurrentSituation() {
  return (
    <div className="flex flex-col gap-xl">
      <div className="flex gap-lg items-center">
        <Text>Benefits:</Text>
        <Item>Consistency</Item>
        <Item>Quality</Item>
        <Item>Efficiency</Item>
      </div>
      <div className="flex gap-lg items-center">
        <Text>Challenges:</Text>
        <Item>Fragmentation</Item>
        <Item>Ownership</Item>
        <Item>Adoption</Item>
        <Item>Obsolescence</Item>
      </div>
      <div className="flex flex-col gap-lg">
        <Text>Components:</Text>
        <div className="grid grid-cols-3 gap-lg">
          <Card
            title="OGCIO"
            items={[
              "~45 HTML components",
              "Copy of GOV.UK govuk-frontend (October 2022)",
              "Framework agnostic",
              "Non-idiomatic",
              "No design tokens",
              "Anachronistic",
            ]}
          />
          <Card
            title="DAFM"
            items={[
              "~30 Angular components",
              "Colour design tokens only",
              "Styling not aligned with OGCIO",
            ]}
          />
          <Card
            title="GOV.IE"
            items={[
              "Django/Python CMS",
              "Bootstrap with custom styling",
              "FOUC and performance issues",
              "Custom UI components",
            ]}
          />
          <Card
            title="Building Blocks"
            items={[
              "Next.js app router",
              "Copy of OGCIO design system styles",
              "Custom colour constants",
            ]}
          />
          <Card
            title="Others"
            items={[
              "Different branding requirements",
              "Different tech stacks, e.g. .NET",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
