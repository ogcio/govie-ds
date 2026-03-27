import {
  render as tlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import { run, Result } from 'axe-core';
import React from 'react';

function toAxeErrorMessage(violations: Result[]) {
  return violations
    .map((violation) => {
      return `${violation.id}: ${violation.description}\n${violation.nodes
        .map((node) => {
          return `  - ${node.html}\n    ${node.failureSummary}`;
        })
        .join('\n')}`;
    })
    .join('\n');
}

export * from '@testing-library/react';

interface CustomRenderResult extends RenderResult {
  axe: () => Promise<void>;
}

export function renderComponent(
  component: React.ReactNode,
  options?: RenderOptions,
): CustomRenderResult {
  const { container, ...renderRest } = tlRender(component, options);

  return {
    ...renderRest,
    container,
    axe: async () => {
      const axeResult = await run(container);

      if (axeResult.violations.length > 0) {
        throw new Error(toAxeErrorMessage(axeResult.violations));
      }
    },
  };
}

export const testVariantsAxe = (
  variants: any,
  renderFunction: (variant: any) => CustomRenderResult,
) => {
  for (const variant of variants) {
    test(`axe accessibility test for variant: ${variant}`, async () => {
      const { axe } = renderFunction(variant);
      await axe();
    });
  }
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
