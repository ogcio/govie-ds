'use client';
import { GovieLink } from '@/components/navigation/custom-link';
import analytics from '@/lib/analytics';
import { ComponentStatus, getComponents } from '@/lib/components';
import {
  Button,
  Paragraph,
  Table,
  TableBody,
  TableData,
  TableRow,
  Tag,
} from '@govie-ds/react';
import Image from 'next/image';
import { Fragment } from 'react';
import { TagFromStatus } from './tag-from-status';
import { getComponentsTemp } from '@/lib/helper';

export function ComponentStatusPill({ status }: { status: ComponentStatus }) {
  const tagProps = TagFromStatus(status);

  return (
    <div className="flex gap-sm items-center">
      {tagProps && <Tag {...tagProps} />}
    </div>
  );
}

export function ComponentStatusBlock({ componentId }: { componentId: string }) {
  const componentsDocuments = getComponents();

  const componentStatuses = componentsDocuments
    .filter((component) => component.component.id === componentId)
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
        id: component.component.id,
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

  const storybookLogo = '/logos/storybook.svg';
  const figmaLogo = '/logos/figma.svg';

  return (
    <table className="table-auto max-w-prose">
      <tbody>
        <tr>
          <td className="p-2 gi-align-middle">Figma Library</td>
          <td className="gi-align-middle">
            <ComponentStatusPill status={componentStatus.figma.status} />
          </td>
          <td>
            {componentStatus.figma.href ? (
              <Button
                variant="flat"
                onClick={() => {
                  analytics.trackEvent({
                    category: 'figma',
                    action: 'click',
                    name: componentStatus.figma.href,
                  });
                  globalThis.window.open(componentStatus.figma.href, '_blank');
                }}
              >
                <Image
                  src={figmaLogo}
                  alt={'View on Figma'}
                  width={24}
                  height={24}
                />
                View on Figma
              </Button>
            ) : null}
          </td>
        </tr>
        <tr>
          <td className="p-2 gi-align-middle">Global HTML</td>
          <td className="gi-align-middle">
            <ComponentStatusPill status={componentStatus.global.status} />
          </td>
          <td>
            {componentStatus.global.href ? (
              <Button
                variant="flat"
                onClick={() => {
                  analytics.trackEvent({
                    category: 'storybook-html',
                    action: 'click',
                    name: componentStatus.global.href,
                  });
                  globalThis.window.open(componentStatus.global.href, '_blank');
                }}
              >
                <Image
                  src={storybookLogo}
                  alt={'View on Storybook'}
                  width={24}
                  height={24}
                />
                View on Storybook
              </Button>
            ) : null}
          </td>
        </tr>
        <tr>
          <td className="p-2 gi-align-middle">Global React</td>
          <td className="gi-align-middle">
            <ComponentStatusPill status={componentStatus.react.status} />
          </td>
          <td>
            {componentStatus.react.href ? (
              <Button
                variant="flat"
                onClick={() => {
                  analytics.trackEvent({
                    category: 'storybook-react',
                    action: 'click',
                    name: componentStatus.react.href,
                  });
                  globalThis.window.open(componentStatus.react.href, '_blank');
                }}
              >
                <Image
                  src={storybookLogo}
                  alt={'View on Storybook'}
                  width={24}
                  height={24}
                />
                View on Storybook
              </Button>
            ) : null}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function ComponentStatusTable() {
  const components = getComponentsTemp();

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
      slug: component.slug,
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
                <GovieLink
                  noUnderline
                  noVisited
                  href={`/${componentStatus.slug}`}
                >
                  {componentStatus.name}
                </GovieLink>
              </div>
              <div className="flex p-2">
                <div className="w-32 block lg:hidden">Figma Library</div>
                <ComponentStatusPill status={componentStatus.figma.status} />
              </div>
              <div className="flex p-2">
                <div className="w-32 block lg:hidden">Global HTML</div>
                <ComponentStatusPill status={componentStatus.global.status} />
              </div>
              <div className="flex p-2">
                <div className="w-32 block lg:hidden">React</div>
                <ComponentStatusPill status={componentStatus.react.status} />
              </div>
              <hr className="block lg:hidden col-span-2" />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
