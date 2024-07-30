'use client';
import { Heading } from '@govie-react/ds';
import { Children, isValidElement, useState } from 'react';
import { PlatformSelection } from './platform-selection';

const platforms = ['html', 'python', 'node', 'react', 'angular', 'other'];

type DeveloperRecommendation = 'html' | 'html-macro' | 'react' | 'guidelines';

const suggestions: Record<string, DeveloperRecommendation> = {
  html: 'html',
  node: 'html-macro',
  python: 'html-macro',
  react: 'react',
  angular: 'guidelines',
  other: 'guidelines',
};

export function DevelopersAdvice({ children }: { children: React.ReactNode }) {
  const [platform, setPlatform] = useState<string>('html');

  const childrenArray = Children.toArray(children);

  const suggestion = platform ? suggestions[platform] : undefined;

  const recommendation = platform
    ? childrenArray.find((child) => {
        if (!isValidElement(child)) {
          return;
        }

        return child.props.platform === suggestion;
      })
    : undefined;

  if (!recommendation) {
    throw new Error(`No recommendation found for platform '${platform}'.`);
  }

  return (
    <div className="flex flex-col">
      <PlatformSelection
        platforms={platforms}
        current={platform}
        onSelect={setPlatform}
      />
      {recommendation}
    </div>
  );
}

export function DeveloperRecommendation({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  platform,
  children,
}: {
  platform: string;
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
