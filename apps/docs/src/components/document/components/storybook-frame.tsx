'use client';
import { getComponents } from '@/lib/components';
import { Button, Link } from '@govie-ds/react';
import StorybookLogo from './storybook';
import React from 'react';

export function StorybookFrame({
  componentId,
  story,
  heightClassName,
}: {
  componentId: string;
  story: string;
  heightClassName?: string;
}) {
  const components = getComponents();

  const component = components
    .filter((component) => component.component.id === componentId)
    .shift();

  if (!component) {
    throw new Error(`Component status not found '${componentId}'.`);
  }

  const storyProps = component?.component.stories?.find(
    (s) => s.name === story,
  );

  if (!storyProps) {
    return <></>;
  }

  let baseUrl = componentId.includes('html')
    ? '/storybook-html'
    : '/storybook-react';

  if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:6006';
  }

  const id = storyProps.url.replace('/story/', '');
  const iframeStoryUrl = `${baseUrl}/iframe.html?id=${id}`;

  const storyPath = id.split('--');
  const docsUrl = `${baseUrl}/?path=/docs/${storyPath[0]}--docs#${storyPath[1]}`;

  return (
    <div className="relative">
      <iframe
        src={iframeStoryUrl}
        className={`gi-not-prose flex w-full border border-gray-200 shadow-sm shadow-gray-200 p-2 items-center justify-center ${heightClassName || 'h-32'}`}
      ></iframe>
      <Link
        external
        noColor
        noUnderline
        noVisited
        href={docsUrl}
        className="block p-2 bottom-0 right-0 absolute"
      >
        <StorybookLogo className="inline mr-2" /> View on Storybook
      </Link>
    </div>
  );
}
