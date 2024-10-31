import { render as tlRender, RenderOptions } from '@testing-library/react';
import axe from 'axe-core';

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
export function render(component: React.ReactNode, options?: RenderOptions) {
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
