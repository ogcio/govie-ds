'use client';
import {
  IconButton,
  Paragraph,
  Table,
  TableBody,
  TableData,
  TableRow,
  Tag,
  TagTypeEnum,
} from '@govie-ds/react';
import { Fragment } from 'react';
import { ComponentStatus, getComponents } from '@/lib/components';

export function TagFromStatus(status: ComponentStatus) {
  switch (status) {
    case 'not-available': {
      return { text: 'N/A', type: TagTypeEnum.default };
    }
    case 'considering': {
      return { text: 'Considering', type: TagTypeEnum.default };
    }
    case 'alpha': {
      return { text: 'Alpha', type: TagTypeEnum.warning };
    }
    case 'beta': {
      return { text: 'Beta', type: TagTypeEnum.info };
    }
    case 'deprecated': {
      return { text: 'Deprecated', type: TagTypeEnum.error };
    }
    case 'stable': {
      return { text: 'Stable', type: TagTypeEnum.success };
    }
    default: {
      return;
    }
  }
}

export function ComponentStatusPill({
  status,
  href,
}: {
  status: ComponentStatus;
  href?: string;
}) {
  const tagProps = TagFromStatus(status);
  return (
    <div className="flex gap-sm items-center">
      {tagProps && <Tag {...tagProps} />}
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
    <table className="table-fixed max-w-prose">
      <tbody>
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
      </tbody>
    </table>
  );
}

export function ComponentStatusTable() {
  const components = getComponents();

  const componentStatuses = components.map((component) => {
    const figmaPlatform = component.statuses.find(
      (platformStatus) => platformStatus.platform.id === 'figma',
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
      <div className="max-w-prose gi-not-prose">
        <Table>
          <TableBody>
            <TableRow>
              <TableData className="border-none">
                <Tag text="alpha" type="warning" />
              </TableData>
              <TableData className="border-none text-wrap">
                The design and/or the implementation of the component is not
                definitive yet. The component can be subject to major
                refactoring.
              </TableData>
            </TableRow>
            <TableRow>
              <TableData className="border-none">
                <Tag text="beta" type="info" />
              </TableData>
              <TableData className="border-none text-wrap">
                The component has an approved design on Figma and is
                implemented. There can be changes due to feedback from early
                adopters or minor refactoring.
              </TableData>
            </TableRow>
            <TableRow>
              <TableData className="border-none">
                <Tag text="stable" type="success" />
              </TableData>
              <TableData className="border-none text-wrap">
                The component will not have design changes or major refactoring.
              </TableData>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Paragraph>
        There are currently <strong>{components.length}</strong> components
        under consideration for the design system.
      </Paragraph>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        <div className="hidden lg:block bg-gray-50 p-2 text-sm text-gray-600">
          Component
        </div>
        <div className="hidden lg:block bg-gray-50 p-2 text-sm text-gray-600">
          Figma Library
        </div>
        <div className="hidden lg:block bg-gray-50 p-2 text-sm text-gray-600">
          Global HTML
        </div>
        <div className="hidden lg:block bg-gray-50 p-2 text-sm text-gray-600">
          React
        </div>

        {componentStatuses.map((componentStatus) => {
          return (
            <Fragment key={componentStatus.id}>
              <div className="row-span-3 lg:row-span-1 mb-4 lg:mb-0 w-32 lg:w-full p-2">
                {componentStatus.name}
              </div>
              <div className="flex p-2">
                <div className="w-32 block lg:hidden">Figma Library</div>
                <ComponentStatusPill
                  status={componentStatus.figma.status}
                  href={componentStatus.figma.href}
                />
              </div>
              <div className="flex p-2">
                <div className="w-32 block lg:hidden">Global HTML</div>
                <ComponentStatusPill
                  status={componentStatus.global.status}
                  href={componentStatus.global.href}
                />
              </div>
              <div className="flex p-2">
                <div className="w-32 block lg:hidden">React</div>
                <ComponentStatusPill
                  status={componentStatus.react.status}
                  href={componentStatus.react.href}
                />
              </div>
              <hr className="block lg:hidden col-span-2" />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
