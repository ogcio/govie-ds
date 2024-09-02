import { Icon, IconButton, Paragraph } from '@govie-react/ds';
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
          icon={<Icon id="open-in-new" size="sm" />}
          href={href}
          ariaLabel="Open"
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
      const htmlPlatform = component.statuses.find(
        (platformStatus) => platformStatus.platform.id === 'html',
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
        html: {
          status: htmlPlatform?.status ?? 'under-review',
          href: htmlPlatform?.platform?.href,
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
        headers={['Figma Library', 'HTML', 'React']}
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
                  status={componentStatus.html.status}
                  href={componentStatus.html.href}
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
    const htmlPlatform = component.statuses.find(
      (platformStatus) => platformStatus.platform.id === 'html',
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
      html: {
        status: htmlPlatform?.status ?? 'under-review',
        href: htmlPlatform?.platform?.href,
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
        headers={['Component', 'Figma Library', 'HTML', 'React']}
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
                <Paragraph>{componentStatus.name}</Paragraph>
              </Td>
              <Td>
                <ComponentStatusPill
                  status={componentStatus.figma.status}
                  href={componentStatus.figma.href}
                />
              </Td>
              <Td>
                <ComponentStatusPill
                  status={componentStatus.html.status}
                  href={componentStatus.html.href}
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
