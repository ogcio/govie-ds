import { cn } from '@/lib/cn';

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
    { text: 'Design principles' },
    { text: 'Governance and maintenance' },
    { text: 'Colour' },
    { text: 'Typography' },
    { text: 'Iconography ' },
    { text: 'Logos' },
    { text: 'Illustration' },
    { text: 'Sound' },
    { text: 'Voice and tone' },
    { text: 'Content formatting' },
    { text: 'Grammar' },
    { text: 'Inclusive language' },
    { text: 'Internationalisation' },
    { text: 'Photography' },
    { text: 'Motion/animation' },
    { text: 'Layout' },
    { text: 'Elevation' },
    { text: 'Data visualisation' },
    { text: 'Dark mode' },
    { text: 'Messaging' },
    { text: 'Forms' },
    { text: 'Screen sizes' },
    { text: 'Responsive design' },
    { text: 'Accessibility' },
  ],
};

const assets: Structure = {
  foundations: [
    { text: 'Repositories' },
    { text: 'Design tokens' },
    { text: 'UX and design files' },
    { text: 'Images' },
    { text: 'Fonts' },
    { text: 'Icons' },
  ],
  additions: [
    { text: 'Components', subText: '(HTML)' },
    { text: 'Components', subText: '(React)' },
    { text: 'Patterns' },
  ],
};

const tools: Structure = {
  additions: [
    { text: 'Figma Library' },
    { text: 'Figma plugins' },
    { text: 'Token validators' },
    { text: 'Utility packages' },
  ],
};

const process: Structure = {
  additions: [
    { text: 'Onboarding' },
    { text: 'Communication' },
    { text: 'Contribution' },
    { text: 'Governance and testing' },
    { text: 'Synchronisation' },
    { text: 'Deprecation' },
    { text: 'Release and versioning' },
    { text: 'Extension and variation' },
  ],
};

type PillsVariant = 'guidelines' | 'assets' | 'tools' | 'process';

function Pills({
  items,
  variant,
}: {
  items: StructureInfo[];
  variant: PillsVariant;
}) {
  const backgroundColors = {
    guidelines: 'bg-green-100',
    assets: 'bg-blue-100',
    tools: 'bg-gold-100',
    process: 'bg-purple-100',
  };

  return (
    <div className="flex flex-col gap-xl">
      <ul className="flex flex-wrap gap-md justify-center">
        {items.map((item, index) => (
          <li
            key={`${item.text}${index}`}
            className={cn(
              'relative flex flex-col rounded px-md py-sm text-center text-xs text-gray-700',
              backgroundColors[variant],
            )}
          >
            <p>{item.text}</p>
            {item.subText ? (
              <p className="text-2xs text-gray-600">{item.subText}</p>
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
}: {
  title: string;
  items: Structure;
  variant: PillsVariant;
}) {
  return (
    <div className="flex flex-col gap-lg">
      <h2 className="text-center text-md text-gray-600">{title}</h2>
      {items.foundations ? (
        <Foundational title="Foundations">
          <Pills items={items.foundations} variant={variant} />
        </Foundational>
      ) : null}
      {items.additions ? (
        <Pills items={items.additions} variant={variant} />
      ) : null}
    </div>
  );
}

export function Vision() {
  return (
    <div className="grid xl:flex gap-md">
      <Structure title="Guidelines" items={guidelines} variant="guidelines" />
      <Structure title="Assets" items={assets} variant="assets" />
      <Structure title="Tools" items={tools} variant="tools" />
      <Structure title="Process" items={process} variant="process" />
    </div>
  );
}
