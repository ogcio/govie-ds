import { RefObject } from 'react';

export const useCombinedRefs = (...refs: (RefObject<any> | null)[]) => {
  return {
    contains: (node: Node) => refs.some((ref) => ref?.current?.contains(node)),
    current: refs.map((ref) => ref?.current).find(Boolean) ?? null,
  };
};
