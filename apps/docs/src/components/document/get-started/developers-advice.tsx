'use client';
import { Heading } from '@govie-ds/react';
import { Children, isValidElement, useState } from 'react';
import { useHash, useIsomorphicLayoutEffect } from 'react-use';
import { PlatformSelection } from './platform-selection';

const platforms = ['html', 'python', 'node', 'react', 'angular', 'other'];

type DeveloperRecommendation =
  | 'html'
  | 'html-jinja'
  | 'html-nunjucks'
  | 'react'
  | 'guidelines';

const suggestions: Record<string, DeveloperRecommendation> = {
  html: 'html',
  python: 'html-jinja',
  node: 'html-nunjucks',
  react: 'react',
  angular: 'guidelines',
  other: 'guidelines',
};

function getPlatform(hash: string) {
  const platform = hash.replace(/^#/, '');
  return platforms.includes(platform) ? platform : 'html';
}

function DevelopersAdviceInternal({ children }: { children: React.ReactNode }) {
  const [hash, setHash] = useHash();

  const platform = getPlatform(hash);

  if (!platform) {
    throw new Error(`Unknown platform '${platform}'.`);
  }

  const childrenArray = Children.toArray(children);

  const recommendation = platform
    ? childrenArray.find((child) => {
        if (!isValidElement(child)) {
          return;
        }

        return child.props.platform === suggestions[platform];
      })
    : childrenArray.find((child) => {
        if (!isValidElement(child)) {
          return;
        }

        return child.props.platform === 'html';
      });

  return (
    <div className="flex flex-col">
      <PlatformSelection
        platforms={platforms}
        current={platform}
        onSelect={setHash}
      />
      <Heading as="h2">Recommendation</Heading>
      {recommendation}
    </div>
  );
}

// useHash is only available on the client
export function DevelopersAdvice({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <DevelopersAdviceInternal>{children}</DevelopersAdviceInternal>
  ) : null;
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
