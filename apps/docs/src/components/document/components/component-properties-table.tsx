'use client';
import { getComponents } from '@/lib/components';
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from '@govie-ds/react';

export function ComponentPropertiesTable({
  componentId,
}: {
  componentId: string;
}) {
  const components = getComponents();

  const component = components
    .filter((component) => component.id.split('/').at(-1) === componentId)
    .shift();

  if (!component) {
    throw new Error(`Component status not found '${componentId}'.`);
  }

  console.log('Component properties:', component.properties);
  return (
    <Table className="gi-not-prose">
      {component.properties?.map((property, pindex) => (
        <>
          <TableHead key={`${pindex}`}>
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
        </>
      ))}
    </Table>
  );
}
