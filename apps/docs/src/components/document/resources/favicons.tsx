import { Fragment } from 'react';
import { Card } from '../common/card';
import { Image } from '../common/image';
import { CopySvg } from './copy-svg';

type Favicon = {
  id: string;
  name: string;
  src: string;
  width: number;
  height: number;
  dark?: boolean;
};

const favicons: Favicon[] = [
  {
    id: 'light',
    name: 'Light',
    src: '/favicons/favicon-light.svg',
    width: 120,
    height: 120,
  },
  {
    id: 'dark',
    name: 'Dark',
    src: '/favicons/favicon-dark.svg',
    width: 120,
    height: 120,
    dark: true,
  },
];

export function Favicons() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-xl">
      {favicons.map((favicon) => {
        return (
          <Fragment key={favicon.id}>
            <Card title={favicon.name} isDark={favicon.dark}>
              <div className="relative flex justify-center">
                <Image
                  src={favicon.src}
                  alt={favicon.name}
                  width={favicon.width}
                  height={favicon.height}
                />
              </div>
              <div className="flex justify-end">
                <CopySvg src={favicon.src} />
              </div>
            </Card>
          </Fragment>
        );
      })}
    </div>
  );
}
