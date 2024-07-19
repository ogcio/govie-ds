import { Heading, Link, Paragraph } from '@govie-react/ds';
import { Text } from '@/components/typography/text';
import { cn } from '@/lib/cn';
import { ComponentStatus, getComponents } from '@/lib/components';

function ComponentStatusPill({
  status,
  href,
}: {
  status: ComponentStatus;
  href?: string;
}) {
  return (
    <div className="flex gap-sm items-center">
      <div
        className={cn(
          'px-md py-sm rounded text-xs',
          status === 'considering' ? 'bg-gray-50 text-gray-800' : undefined,
          status === 'under-review' ? 'bg-blue-50 text-blue-800' : undefined,
          status === 'alpha' ? 'bg-yellow-50 text-yellow-800' : undefined,
        )}
      >
        {(() => {
          switch (status) {
            case 'under-review': {
              return 'under review';
            }
            default: {
              return status;
            }
          }
        })()}
      </div>
      {href ? <Link href={href}>View</Link> : null}
    </div>
  );
}

export function ComponentStatusTable() {
  const components = getComponents();

  return (
    <div>
      <Paragraph>
        There are currently <strong>{components.length}</strong> components
        under consideration for the design system.
      </Paragraph>
      <ul className="flex flex-col gap-sm xl:max-w-[60%]">
        <li className="grid grid-cols-4 gap-sm">
          <Heading as="h3">Component</Heading>
          <Heading as="h3">Figma UI Kit</Heading>
          <Heading as="h3">HTML</Heading>
          <Heading as="h3">React</Heading>
        </li>
        {components.map((component) => {
          const figmaPlatform = component.statuses.find(
            (platformStatus) => platformStatus.platform.id === 'figma',
          );
          const htmlPlatform = component.statuses.find(
            (platformStatus) => platformStatus.platform.id === 'html',
          );
          const reactPlatform = component.statuses.find(
            (platformStatus) => platformStatus.platform.id === 'react',
          );

          return (
            <li key={component.id} className="grid grid-cols-4 gap-sm">
              <Text className="mb-0">{component.name}</Text>
              <ComponentStatusPill
                status={figmaPlatform?.status ?? 'considering'}
                href={figmaPlatform?.platform.href}
              />
              <ComponentStatusPill
                status={htmlPlatform?.status ?? 'under-review'}
                href={htmlPlatform?.platform.href}
              />
              <ComponentStatusPill
                status={reactPlatform?.status ?? 'considering'}
                href={reactPlatform?.platform.href}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
