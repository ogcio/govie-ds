'use client';
import { getComponents } from '@/lib/components';

export function StorybookIframe({ componentId }: { componentId: string }) {
  const components = getComponents();

  const component = components
    .filter((component) => component.component.id === componentId)
    .shift();

  if (!component) {
    throw new Error(`Component status not found '${componentId}'.`);
  }

  return <iframe className="gi-not-prose"></iframe>;
}
