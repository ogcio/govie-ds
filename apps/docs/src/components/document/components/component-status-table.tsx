'use client';
import { IconButton, Paragraph, Tag } from '@govie-ds/react';
import { Table, Td, Tr } from '../common/table';
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
      {status === 'not-available' && <Tag text="N/A" type="default" />}
      {status === 'considering' && <Tag text="Considering" type="default" />}
      {status === 'alpha' && <Tag text="Alpha" type="warning" />}
      {status === 'beta' && <Tag text="Beta" type="info" />}
      {status === 'stable' && <Tag text="Stable" type="success" />}
      {status === 'deprecated' && <Tag text="Deprecated" type="error" />}
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
    .filter((component) => component.id.split('/').at(-1) === componentId)
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
        id: component.id.split('/').at(-1),
        name: component.name,
        figma: {
          status: figmaPlatform?.status ?? 'considering',
          href: figmaPlatform?.platform?.href,
        },
        local: {
          status: localPlatform?.status ?? 'considering',
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

  const componentStatus = componentStatuses.find(
    (componentStatus) => componentStatus.id === componentId,
  );

  if (!componentStatus) {
    throw new Error(`Component status not found '${componentId}'.`);
  }
  return (
    <table className="table-fixed">
      <tr>
        <td className="p-2">Figma Library</td>
        <td>
          <ComponentStatusPill
            status={componentStatus.figma.status}
            href={componentStatus.figma.href}
          />
        </td>
      </tr>
      <tr>
        <td className="p-2">Local HTML</td>
        <td>
          <ComponentStatusPill
            status={componentStatus.local.status}
            href={componentStatus.local.href}
          />
        </td>
      </tr>
      <tr>
        <td className="p-2">Global HTML</td>
        <td>
          <ComponentStatusPill
            status={componentStatus.global.status}
            href={componentStatus.global.href}
          />
        </td>
      </tr>
      <tr>
        <td className="p-2">Global React</td>
        <td>
          <ComponentStatusPill
            status={componentStatus.react.status}
            href={componentStatus.react.href}
          />
        </td>
      </tr>
    </table>
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
