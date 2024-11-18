'use client';
import { IconButton, Paragraph } from '@govie-ds/react';
import { Table, Td, Tr } from '../common/table';
import { cn } from '@/lib/cn';
import { ComponentStatus, getComponents } from '@/lib/components';

export function ComponentStatusPill({
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
          status === 'not-available' ? 'bg-gray-50 text-gray-800' : undefined,
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
      {href ? (
        <IconButton
          icon={{ icon: 'open_in_new', ariaLabel: 'Open' }}
          size="small"
          variant="flat"
          onClick={() => window.open(href, '_blank')}
        />
      ) : null}
    </div>
  );
}

export function ComponentStatusBlock({ componentId }: { componentId: string }) {
  const components = getComponents();

  const componentStatuses = components
    .filter((component) => component.id === componentId)
    .map((component) => {
      const figmaPlatform = component.statuses.find(
        (platformStatus) => platformStatus.platform.id === 'figma',
      );
      const localPlatform = component.statuses.find(
        (platformStatus) => platformStatus.platform.id === 'local',
      );
      const globalPlatform = component.statuses.find(
        (platformStatus) => platformStatus.platform.id === 'global',
      );
      const reactPlatform = component.statuses.find(
        (platformStatus) => platformStatus.platform.id === 'react',
      );

      return {
        id: component.id,
        name: component.name,
        figma: {
          status: figmaPlatform?.status ?? 'considering',
          href: figmaPlatform?.platform?.href,
        },
        local: {
          status: localPlatform?.status ?? 'under-review',
          href: localPlatform?.platform?.href,
        },
        global: {
          status: globalPlatform?.status ?? 'under-review',
          href: globalPlatform?.platform?.href,
        },
        react: {
          status: reactPlatform?.status ?? 'considering',
          href: reactPlatform?.platform?.href,
        },
      };
    });

  return (
    <div>
      <Table
        headers={['Figma Library', 'Local HTML', 'Global HTML', 'React']}
        ids={componentStatuses.map((componentStatus) => componentStatus.id)}
        renderRow={(id) => {
          const componentStatus = componentStatuses.find(
            (componentStatus) => componentStatus.id === id,
          );

          if (!componentStatus) {
            throw new Error(`Component status not found '${id}'.`);
          }

          return (
            <Tr key={id}>
              <Td>
                <ComponentStatusPill
                  status={componentStatus.figma.status}
                  href={componentStatus.figma.href}
                />
              </Td>
              <Td>
                <ComponentStatusPill
                  status={componentStatus.local.status}
                  href={componentStatus.local.href}
                />
              </Td>
              <Td>
                <ComponentStatusPill
                  status={componentStatus.global.status}
                  href={componentStatus.global.href}
                />
              </Td>
              <Td>
                <ComponentStatusPill
                  status={componentStatus.react.status}
                  href={componentStatus.react.href}
                />
              </Td>
            </Tr>
          );
        }}
      />
    </div>
  );
}

export function ComponentStatusTable() {
  const components = getComponents();

  const componentStatuses = components.map((component) => {
    const figmaPlatform = component.statuses.find(
      (platformStatus) => platformStatus.platform.id === 'figma',
    );
    const localPlatform = component.statuses.find(
      (platformStatus) => platformStatus.platform.id === 'local',
    );
    const globalPlatform = component.statuses.find(
      (platformStatus) => platformStatus.platform.id === 'global',
    );
    const reactPlatform = component.statuses.find(
      (platformStatus) => platformStatus.platform.id === 'react',
    );

    return {
      id: component.id,
      name: component.name,
      figma: {
        status: figmaPlatform?.status ?? 'considering',
        href: figmaPlatform?.platform?.href,
      },
      local: {
        status: localPlatform?.status ?? 'stable',
        href: localPlatform?.platform?.href,
      },
      global: {
        status: globalPlatform?.status ?? 'considering',
        href: globalPlatform?.platform?.href,
      },
      react: {
        status: reactPlatform?.status ?? 'considering',
        href: reactPlatform?.platform?.href,
      },
    };
  });

  return (
    <div>
      <Paragraph>
        There are currently <strong>{components.length}</strong> components
        under consideration for the design system.
      </Paragraph>
      <Table
        headers={[
          'Component',
          'Figma Library',
          'Local HTML',
          'Global HTML',
          'React',
        ]}
        ids={componentStatuses.map((componentStatus) => componentStatus.id)}
        renderRow={(id) => {
          const componentStatus = componentStatuses.find(
            (componentStatus) => componentStatus.id === id,
          );

          if (!componentStatus) {
            throw new Error(`Component status not found '${id}'.`);
          }

          return (
            <Tr key={id}>
              <Td>{componentStatus.name}</Td>
              <Td>
                <ComponentStatusPill
                  status={componentStatus.figma.status}
                  href={componentStatus.figma.href}
                />
              </Td>
              <Td>
                <ComponentStatusPill
                  status={componentStatus.local.status}
                  href={componentStatus.local.href}
                />
              </Td>
              <Td>
                <ComponentStatusPill
                  status={componentStatus.global.status}
                  href={componentStatus.global.href}
                />
              </Td>
              <Td>
                <ComponentStatusPill
                  status={componentStatus.react.status}
                  href={componentStatus.react.href}
                />
              </Td>
            </Tr>
          );
        }}
      />
    </div>
  );
}
