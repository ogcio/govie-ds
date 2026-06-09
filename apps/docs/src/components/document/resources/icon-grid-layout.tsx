'use client';
import { Paragraph } from '@ogcio/design-system-react';
import * as IconsList from '@ogcio/design-system-react/icons';
import { DownloadIconButton } from './download-icon-button';
import { CopyToClipboardButton } from './copy-to-clipboard-button';
import { titleCase } from '@/lib/utilities';

export function IconGridLayout() {
  return (
    <ul className="flex flex-wrap gap-2 p-0 gi-not-prose">
      {Object.entries(IconsList).map(([name, Icon]) => {
        const iconName = titleCase(name)
          .replaceAll(' Alt', '')
          .replace('Icon', '');
        const safeName = iconName.toLowerCase().trim().replace(/\s+/g, '_');
        return (
          <li key={name} className="inline-block w-48">
            <div className="border rounded-md transition-colors relative">
              <div className="flex justify-center px-10 py-12">
                <Icon />
              </div>
              <div className="absolute bottom-1 right-1">
                <CopyToClipboardButton text={iconName} />
              </div>
              <div className="absolute bottom-1 right-10">
                <DownloadIconButton
                  name={iconName}
                  href={`/icons/${safeName}.svg`}
                />
              </div>
            </div>
            <Paragraph size="sm" className="text-center">
              {iconName}
            </Paragraph>
          </li>
        );
      })}
    </ul>
  );
}
