import { Icon } from '@govie-ds/react';
import React, { Fragment } from 'react';
import { Card } from '../common/card';
import { CopyToClipboardButton } from './copy-to-clipboard-button';

const icons = [
  'edit',
  'mic',
  'send',
  'thumb_down',
  'thumb_up',
  'open_in_new',
  'attach_file',
  'close',
  'search',
  'menu',
  'home',
  'logout',
  'download',
];

export function IconGridLayout() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 border-t border-l">
      {icons.map((icon) => (
        <Fragment key={icon}>
          <div className="border-r border-b hover:bg-gray-50 transition-colors">
            <Card title={icon}>
              <div className="flex justify-center p-4">
                <Icon icon={icon} size="lg" />
              </div>
              <div className="flex justify-end mt-2">
                <CopyToClipboardButton text={icon} />
              </div>
            </Card>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
