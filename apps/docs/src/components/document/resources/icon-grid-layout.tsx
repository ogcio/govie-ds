'use client';
import { Icon, Icons, Paragraph } from '@ogcio/design-system-react';
import { CopyToClipboardButton } from './copy-to-clipboard-button';
import { titleCase } from '@/lib/utilities';

const icons = [...Icons.sort()];

export function IconGridLayout() {
  return (
    <ul className="flex flex-wrap gap-2 p-0 gi-not-prose">
      {icons.map((icon) => {
        const iconName = titleCase(icon).replaceAll(' Alt', '');
        return (
          <li key={icon} className="inline-block w-32 h-32">
            <div className="border rounded-md hover:bg-gray-50 transition-colors relative">
              <div className="flex justify-center p-6">
                <Icon icon={icon} size="lg" />
              </div>
              <div className="absolute bottom-1 right-2">
                <CopyToClipboardButton text={icon} />
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
