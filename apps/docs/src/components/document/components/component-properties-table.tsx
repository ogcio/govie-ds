'use client';
import { getComponents } from '@/lib/components';
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from '@ogcio/design-system-react';
import { Fragment } from 'react';

export function ComponentPropertiesTable({
  componentId,
}: {
  componentId: string;
}) {
  const componentDocs = getComponents();

  const componentDoc = componentDocs
    .filter((component) => component.component.id === componentId)
    .shift();

  if (!componentDoc) {
    throw new Error(`Component status not found '${componentId}'.`);
  }

  return (
    <Table className="gi-not-prose">
      {componentDoc.component.properties?.map((property, pindex) => (
        <Fragment key={`${pindex}`}>
          <TableHead>
            <TableRow>
              <TableHeader colSpan={4}>{property.name}</TableHeader>
            </TableRow>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Type</TableHeader>
              <TableHeader>Required</TableHeader>
              <TableHeader>Description</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {property.fields.map((field, findex) => (
              <TableRow key={`${pindex}-${findex}`}>
                <TableData>
                  <code className="rounded-sm text-gray-600 text-xs gi-font-tertiary">
                    {field.name}
                  </code>
                </TableData>
                <TableData>{field.ofType}</TableData>
                <TableData>{field.required ? 'Yes' : 'No'}</TableData>
                <TableData>{field.description}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </Fragment>
      ))}
    </Table>
  );
}
