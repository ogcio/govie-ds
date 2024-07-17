import { Heading } from '@govie-react/ds';
import { Fragment } from 'react';

type Logo = {
  id: string;
  name: string;
  src: string;
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
      <div className="grid-cols-2 lg:grid-cols-4 gap-md">
        {logos.map((logo) => {
          return <div key={logo.id}>{logo.name}</div>;
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
