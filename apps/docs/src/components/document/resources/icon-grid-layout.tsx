'use client';
import {
  Container,
  Paragraph,
  FormField,
  FormFieldLabel,
  InputText,
  Box,
} from '@ogcio/design-system-react';
import * as AllIcons from '@ogcio/design-system-react/icons';
import { DownloadIconButton } from './download-icon-button';
import { titleCase } from '@/lib/utilities';
import { useState } from 'react';
import _ from 'lodash';

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
        {_.toPairs(AllIcons).map(([name, Icon]) => {
          if (!new RegExp(iconFilter, 'gi').exec(name)) {
            return null;
          }
          const iconName = titleCase(name).replace('Icon', '');
          return (
            <li key={name} className="w-36 aspect-square flex flex-col">
              <Box className="grow border rounded-md relative p-1">
                <Box className="h-full flex items-center justify-center">
                  <Icon size={48} />
                </Box>
                <Box className="absolute bottom-1 right-1">
                  <DownloadIconButton
                    name={iconName}
                    href={`/icons/${iconName}.svg`}
                  />
                </Box>
              </Box>
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
