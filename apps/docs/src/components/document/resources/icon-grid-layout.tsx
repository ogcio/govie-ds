'use client';
import {
  Container,
  Paragraph,
  FormField,
  FormFieldLabel,
  InputText,
} from '@ogcio/design-system-react';
import * as AllIcons from '@ogcio/design-system-react/icons';
import { DownloadIconButton } from './download-icon-button';
import { CopyToClipboardButton } from './copy-to-clipboard-button';
import { titleCase } from '@/lib/utilities';
import { useState } from 'react';

export function IconGridLayout() {
  const [iconFilter, setIconFilter] = useState('');

  return (
    <Container className="flex flex-col gap-2">
      <FormField className="flex flex-col gi-min-w-md">
        <FormFieldLabel>Search for your icon here</FormFieldLabel>
        <InputText
          onChange={(event) => {
            setIconFilter(event.target.value);
          }}
          value={iconFilter}
          placeholder="Accessibility"
          type="search"
          className="gi-max-w-md"
        />
      </FormField>
      <ul className="flex flex-wrap gap-2 p-0 gi-not-prose">
        {Object.entries(AllIcons).map(([name, Icon]) => {
          if (!new RegExp(iconFilter, 'gi').exec(name)) {
            return <></>;
          }
          const iconName = titleCase(name).replace('Icon', '');
          const safeName = iconName.toLowerCase().trim().replace(/\s+/g, '_');
          return (
            <li key={name} className="inline-block w-36">
              <div className="border rounded-md transition-colors relative">
                <div className="flex justify-center px-10 py-12">
                  <Icon size="lg" />
                </div>
                <div className="absolute bottom-1 right-1">
                  <CopyToClipboardButton text={`<${name}/>`} />
                </div>
                <div className="absolute bottom-1 right-10">
                  <DownloadIconButton
                    name={name}
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
    </Container>
  );
}
