'use client';
import type { ReactElement } from 'react';
import { useState } from 'react';
import _ from 'lodash';
import {
  Container,
  Paragraph,
  FormField,
  FormFieldLabel,
  InputText,
  Box,
  Grid,
} from '@ogcio/design-system-react';
import * as AllIcons from '@ogcio/design-system-react/icons';
import { DownloadIconButton } from './download-icon-button';
import { titleCase } from '@/lib/utilities';

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
      <Grid container gap={2}>
        {_.map(AllIcons, (Icon, name) => {
          if (!name.toLowerCase().includes(iconFilter.toLowerCase())) {
            return null;
          }
          const iconName = titleCase(name).replace('Icon', '');
          return (
            <Grid key={name} size={2}>
              <Box className="h-36 w-36 flex flex-col">
                <Box className="grow border rounded-md relative p-1">
                  <Box className="h-full flex items-center justify-center">
                    <Icon size={48} />
                  </Box>
                  <Box className="absolute bottom-1 right-1">
                    <DownloadIconButton name={iconName} IconComponent={Icon} />
                  </Box>
                </Box>
                <Paragraph size="sm" className="text-center truncate">
                  {iconName}
                </Paragraph>
              </Box>
            </Grid>
          );
        }).filter(Boolean)}
      </Grid>
    </Container>
  );
}
