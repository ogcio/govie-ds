/**
 * A React hook that generates a DOM-safe unique ID by replacing colons with hyphens.
 *
 * This hook addresses the issue where React 18's useId() generates IDs containing colons,
 * which are invalid in certain DOM contexts (see https://github.com/facebook/react/pull/32001).
 *
 * @returns A string containing a unique, DOM-safe identifier where all colons have been replaced with hyphens
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const id = useDomId();
 *   return <div id={id}>Content</div>;
 * }
 * ```
 */
import { useId, useMemo } from 'react';

export function useDomId() {
  const idRef = useId();
  return useMemo(() => idRef.replaceAll(':', '-'), [idRef]);
}
