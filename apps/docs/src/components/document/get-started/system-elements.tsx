import { Fragment } from 'react';
import { Card } from '../common/card';
import { DesignTokensIcon } from './design-tokens-icon';
import { FigmaIcon } from './figma-icon';
import { HtmlIcon } from './html-icon';
import { ReactIcon } from './react-icon';

const links = [
  {
    href: '/foundations/design-tokens/overview/',
    label: 'Design tokens',
    icon: <DesignTokensIcon />,
  },
  {
    href: '/components/html/',
    label: 'HTML components',
    icon: <HtmlIcon />,
  },
  {
    href: '/components/react/',
    label: 'React components',
    icon: <ReactIcon />,
  },
  {
    href: '/resources/figma/',
    label: 'Figma library',
    icon: <FigmaIcon />,
  },
];

export function SystemElements() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-lg">
      {links.map((link) => (
        <Fragment key={link.href}>
          <Card link={{ href: link.href, label: link.label }}>
            <div className="flex items-center justify-center">{link.icon}</div>
          </Card>
        </Fragment>
      ))}
    </div>
  );
}
