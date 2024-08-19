import { renderMacro } from '@govie-frontend/macro';
import {
  getByText,
  // getByLabelText,
  // getByTestId,
  // queryByTestId,
  Matcher,
  SelectorMatcherOptions,
} from '@testing-library/dom';
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

export function render<TProps>({ name, html }: { name: string; html: string }) {
  return function (props: TProps) {
    const markup = renderMacro<TProps>({ name, html })(props);

    const div = document.createElement('div');
    div.innerHTML = markup;

    return {
      getByText: (id: Matcher, options?: SelectorMatcherOptions) => {
        return getByText(div, id, options);
      },
      axe: async () => {
        const parser = new DOMParser();
        const parsed = parser.parseFromString(markup, 'text/html');

        const axeResult = await axe.run(parsed.body);

        if (axeResult.violations.length > 0) {
          throw new Error(toAxeErrorMessage(axeResult.violations));
        }
      },
    };
  };
}