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

export function StorybookIframe({ componentId }: { componentId: string }) {
  const components = getComponents();

  const component = components
    .filter((component) => component.id.split('/').at(-1) === componentId)
    .shift();

  if (!component) {
    throw new Error(`Component status not found '${componentId}'.`);
  }

  return <iframe className="gi-not-prose"></iframe>;
}
