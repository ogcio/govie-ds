import { Heading } from '@ogcio/design-system-react';
import { Fragment } from 'react';
import { Card } from '../common/card';
import { Image } from '../common/image';
import { CopySvg } from './copy-svg';
import { DownloadSvg } from './download-svg';

type Logo = {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
  dark?: boolean;
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
    logos: [
      {
        id: 'standard',
        name: 'Standard',
        src: '/logos/government-of-ireland/gov-std.svg',
        width: 181,
        height: 64,
      },
      {
        id: 'green',
        name: 'Green',
        src: '/logos/government-of-ireland/gov-green.svg',
        width: 181,
        height: 64,
      },
      {
        id: 'black',
        name: 'Black',
        src: '/logos/government-of-ireland/gov-black.svg',
        width: 181,
        height: 64,
      },
      {
        id: 'standard-reverse',
        name: 'Standard Reverse',
        src: '/logos/government-of-ireland/gov-std-reverse.svg',
        width: 181,
        height: 64,
        dark: true,
      },
      {
        id: 'white',
        name: 'White',
        src: '/logos/government-of-ireland/gov-white.svg',
        width: 181,
        height: 64,
        dark: true,
      },
    ],
  },
];

function LogoGroup({ name, logos }: { name: string; logos: Logo[] }) {
  return (
    <div>
      <Heading as="h2">{name}</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-xl">
        {logos.map((logo) => {
          return (
            <Fragment key={logo.id}>
              <Card title={logo.name} isDark={logo.dark}>
                <div className="relative flex justify-center">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                  />
                </div>
                <div className="flex justify-end gap-1">
                  <DownloadSvg name={logo.name} src={logo.src} />
                  <CopySvg src={logo.src} />
                </div>
              </Card>
            </Fragment>
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
