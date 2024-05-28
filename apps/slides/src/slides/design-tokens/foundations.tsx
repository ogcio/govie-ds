import { clsx } from "clsx";

type StructureInfo = {
  text: string;
  subText?: string;
  progress?: number;
};

type Structure = {
  foundations?: StructureInfo[];
  additions?: StructureInfo[];
};

const guidelines: Structure = {
  foundations: [
    { text: "Design principles", progress: 50 },
    { text: "Governance and maintenance" },
    { text: "Colour", progress: 20 },
    { text: "Typography", progress: 20 },
    { text: "Iconography " },
    { text: "Logos" },
    { text: "Illustration" },
    { text: "Sound" },
    { text: "Voice and tone" },
    { text: "Content formatting" },
    { text: "Grammar" },
    { text: "Inclusive language" },
    { text: "Internationalisation" },
    { text: "Photography" },
    { text: "Motion/animation" },
    { text: "Layout" },
    { text: "Elevation" },
    { text: "Data visualisation" },
    { text: "Dark mode" },
    { text: "Messaging" },
    { text: "Forms" },
    { text: "Screen sizes" },
    { text: "Responsive design" },
    { text: "Accessibility" },
  ],
};

const assets: Structure = {
  foundations: [
    { text: "Repositories" },
    { text: "Design tokens", progress: 40 },
    { text: "UX and design files", progress: 10 },
    { text: "Images" },
    { text: "Fonts" },
    { text: "Icons" },
  ],
  additions: [
    { text: "Components", subText: "(HTML)", progress: 80 },
    { text: "Components", subText: "(Web Components)" },
    { text: "Components", subText: "(React)" },
    { text: "Components", subText: "(Angular)" },
    { text: "Patterns" },
  ],
};

const tools: Structure = {
  additions: [
    { text: "Figma UI Kit" },
    { text: "Figma plugins" },
    { text: "Theme builder" },
    { text: "Token validators", progress: 70 },
    { text: "Utility packages" },
  ],
};

const process: Structure = {
  additions: [
    { text: "Onboarding" },
    { text: "Communication" },
    { text: "Contribution" },
    { text: "Governance and testing" },
    { text: "Synchronisation" },
    { text: "Deprecation" },
    { text: "Release and versioning" },
    { text: "Extension and variation" },
  ],
};

type PillsVariant = "guidelines" | "assets" | "tools" | "process";

function Pills({
  items,
  variant,
  showProgress,
}: {
  items: StructureInfo[];
  variant: PillsVariant;
  showProgress: boolean;
}) {
  const backgroundColors = {
    "bg-green-100": variant === "guidelines",
    "bg-blue-100": variant === "assets",
    "bg-gold-100": variant === "tools",
    "bg-purple-100": variant === "process",
  };

  return (
    <div className="flex flex-col gap-xl">
      <ul className="flex flex-wrap gap-md justify-center">
        {items.map((item, index) => (
          <li
            key={`${item.text}${index}`}
            className={clsx(
              "relative flex flex-col gap-xs rounded shadow px-md py-sm text-center text-xs text-gray-700",
              showProgress ? undefined : backgroundColors
            )}
          >
            <div
              className={clsx(
                "absolute top-0 left-0 h-full rounded",
                showProgress ? backgroundColors : undefined
              )}
              style={{ width: `${item.progress ?? 0}%` }}
            >
              &nbsp;
            </div>

            <p className="z-100">{item.text}</p>
            {item.subText ? (
              <p className="z-100 text-2xs text-gray-600">{item.subText}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Foundational({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-lg bg-gray-50 py-xl px-lg rounded-sm">
      <h2 className="text-xs text-gray-400">{title}</h2>
      <div>{children}</div>
    </div>
  );
}

function Structure({
  title,
  items,
  variant,
  showProgress,
}: {
  title: string;
  items: Structure;
  variant: PillsVariant;
  showProgress: boolean;
}) {
  return (
    <div className="flex flex-col gap-lg">
      <h2 className="text-center text-md text-gray-600">{title}</h2>
      {items.foundations ? (
        <Foundational title="Foundations">
          <Pills
            items={items.foundations}
            variant={variant}
            showProgress={showProgress}
          />
        </Foundational>
      ) : null}
      {items.additions ? (
        <Pills
          items={items.additions}
          variant={variant}
          showProgress={showProgress}
        />
      ) : null}
    </div>
  );
}

export function Foundations({
  showProgress = false,
}: {
  showProgress?: boolean;
}) {
  return (
    <div className="flex gap-md items-start">
      <Structure
        title="Guidelines"
        items={guidelines}
        variant="guidelines"
        showProgress={showProgress}
      />
      <Structure
        title="Assets"
        items={assets}
        variant="assets"
        showProgress={showProgress}
      />
      <Structure
        title="Tools"
        items={tools}
        variant="tools"
        showProgress={showProgress}
      />
      <Structure
        title="Process"
        items={process}
        variant="process"
        showProgress={showProgress}
      />
    </div>
  );
}
