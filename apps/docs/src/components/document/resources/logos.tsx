import { Heading } from '@govie-react/ds';
import Image from 'next/image';
import { Fragment } from 'react';
import { CopySvg } from './copy-svg';
import { Text } from '@/components/typography/text';

type Logo = {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
  backgroundColor?: string;
};

type LogoGroup = {
  name: string;
  logos: Logo[];
};

const logoGroups: LogoGroup[] = [
  {
    name: 'General',
    logos: [
      {
        id: 'harp',
        name: 'Harp',
        src: '/logos/general/harp.svg',
        width: 57,
        height: 88,
      },
    ],
  },
  {
    name: 'Government of Ireland',
    logos: [],
  },
];

function LogoGroup({ name, logos }: { name: string; logos: Logo[] }) {
  return (
    <div>
      <Heading as="h2">{name}</Heading>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
        {logos.map((logo) => {
          return (
            <div className="flex flex-col gap-md bg-gray-50 p-lg rounded">
              <Text className="mb-0 text-center">{logo.name}</Text>
              <div
                key={logo.id}
                className="relative flex justify-center p-md"
                style={{ backgroundColor: logo.backgroundColor ?? 'white' }}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                />
              </div>
              <div className="flex justify-end">
                <CopySvg src={logo.src} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Logos() {
  return (
    <div className="flex flex-col gap-md">
      {logoGroups.map((logoGroup) => {
        return (
          <Fragment key={logoGroup.name}>
            <LogoGroup name={logoGroup.name} logos={logoGroup.logos} />
          </Fragment>
        );
      })}
    </div>
  );
}
