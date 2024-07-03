import { Heading, Icon, Link } from '@govie-react/ds';
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
    <div className="flex gap-sm">
      <div
        className={cn(
          'px-sm rounded',
          status === 'considering' ? 'bg-emerald-50' : undefined,
          status === 'under-review' ? 'bg-blue-50' : undefined,
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
  return (
    <ul className="flex flex-col gap-sm">
      <li className="grid grid-cols-4">
        <Heading as="h3">Component</Heading>
        <Heading as="h3">Figma UI Kit</Heading>
        <Heading as="h3">HTML</Heading>
        <Heading as="h3">React</Heading>
      </li>
      {getComponents().map((component) => {
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
          <li key={component.id} className="grid grid-cols-4">
            <Text className="mb-0">{component.name}</Text>
            <ComponentStatusPill
              status={figmaPlatform?.status ?? 'considering'}
            />
            <ComponentStatusPill
              status={htmlPlatform?.status ?? 'under-review'}
              href={htmlPlatform?.platform.href}
            />
            <ComponentStatusPill
              status={reactPlatform?.status ?? 'considering'}
            />
          </li>
        );
      })}
    </ul>
  );
}
