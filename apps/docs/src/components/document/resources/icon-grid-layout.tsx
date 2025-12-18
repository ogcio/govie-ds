'use client';
import { Icon, Icons, Paragraph } from '@ogcio/design-system-react';
import { DownloadIconButton } from './download-icon-button';
import { CopyToClipboardButton } from './copy-to-clipboard-button';
import { titleCase } from '@/lib/utilities';

const icons = [...Icons.sort()];

export function IconGridLayout() {
  return (
    <ul className="flex flex-wrap gap-2 p-0 gi-not-prose">
      {icons.map((icon) => {
        const iconName = titleCase(icon).replaceAll(' Alt', '');
        const safeName = iconName.toLowerCase().trim().replace(/\s+/g, '_');
        return (
          <li key={icon} className="inline-block w-32">
            <div className="border rounded-md transition-colors relative">
              <div className="flex justify-center px-10 py-12">
                <Icon icon={icon} size="lg" />
              </div>
              <div className="absolute bottom-1 right-1">
                <CopyToClipboardButton text={icon} />
              </div>
              <div className="absolute bottom-1 right-10">
                <DownloadIconButton
                  name={icon}
                  fetchPath={`/icons/${safeName}.svg`}
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
