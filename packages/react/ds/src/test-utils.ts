import {
  render as tlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import axe from 'axe-core';
import React from 'react';

function toAxeErrorMessage(violations: axe.Result[]) {
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

export function render(
  component: React.ReactNode,
  options?: RenderOptions,
): CustomRenderResult {
  const { container, ...renderRest } = tlRender(component, options);

  return {
    ...renderRest,
    container,
    axe: async () => {
      const axeResult = await axe.run(container);

      if (axeResult.violations.length > 0) {
        throw new Error(toAxeErrorMessage(axeResult.violations));
      }
    },
  };
}
