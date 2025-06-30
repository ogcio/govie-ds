'use client';
import { getComponents } from '@/lib/components';
import { Link } from '@ogcio/design-system-react';
import StorybookLogo from './storybook';
import React from 'react';
import { cn } from '@/lib/cn';

export function StorybookFrame({
  componentId,
  story,
  className,
  iframeId,
  docsPath,
}: {
  componentId: string;
  story?: string;
  className?: string;
  docsPath?: string;
  iframeId?: string;
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

  let baseUrl = componentId.includes('html')
    ? '/storybook-html'
    : '/storybook-react';

  if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:6006';
  }

  if (!storyProps) {
    if (iframeId && docsPath) {
      return (
        <div className="relative">
          <iframe
            src={`${baseUrl}/iframe.html?id=${iframeId}`}
            className={cn(
              'gi-not-prose flex w-full border border-gray-200 shadow-sm shadow-gray-200 p-2 items-center justify-center h-32',
              className,
            )}
          ></iframe>
          <div className="p-2 bottom-0 right-0 absolute">
            <Link
              external
              noColor
              noUnderline
              noVisited
              href={`${baseUrl}/${docsPath}`}
              className="block"
            >
              <StorybookLogo className="inline mr-2" /> View on Storybook
            </Link>
          </div>
        </div>
      );
    }
    return <></>;
  }

  const id = storyProps.url.replace('/story/', '');
  const iframeStoryUrl = `${baseUrl}/iframe.html?id=${id}`;

  const storyPath = id.split('--');
  const docsUrl = `${baseUrl}/?path=/docs/${storyPath[0]}--docs#${storyPath[1]}`;

  return (
    <div className="relative">
      <iframe
        src={iframeStoryUrl}
        className={cn(
          'gi-not-prose flex w-full border border-gray-200 shadow-sm shadow-gray-200 p-2 items-center justify-center h-32',
          className,
        )}
      ></iframe>
      <div className="p-2 bottom-0 right-0 absolute">
        <Link
          external
          noColor
          noUnderline
          noVisited
          href={docsUrl}
          className="block"
        >
          <StorybookLogo className="inline mr-2" /> View on Storybook
        </Link>
      </div>
    </div>
  );
}
