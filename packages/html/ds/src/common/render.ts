import { renderMacro } from '@govie-ds/macro';
import {
  ByRoleMatcher,
  ByRoleOptions,
  getAllByRole,
  getByRole,
  getByTestId,
  getByText,
  getAllByTestId,
  Matcher,
  MatcherOptions,
  queryByText,
  SelectorMatcherOptions,
  getAllByText,
} from '@testing-library/dom';
import axe from 'axe-core';
import { initGovIe } from '..';
import { addMacroValidation } from './validation';

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

export function render<TProps>({
  componentName,
  macroName,
  html,
}: {
  componentName: string;
  macroName: string;
  html: string;
}) {
  return function (props: TProps) {
    const htmlWithValidation = addMacroValidation({
      engine: 'nunjucks',
      mode: 'dev',
      content: html,
      componentName,
    });

    const markup = renderMacro<TProps>({
      name: macroName,
      html: htmlWithValidation,
      path: './src/',
    })(props);

    const div = document.createElement('div');
    div.innerHTML = markup;

    document.body.append(div);

    initGovIe();

    return {
      container: div,
      getByText: (id: Matcher, options?: SelectorMatcherOptions) => {
        return getByText(div, id, options);
      },
      getAllByText: (id: Matcher, options?: SelectorMatcherOptions) => {
        return getAllByText(div, id, options);
      },
      getByRole: (role: ByRoleMatcher, options?: ByRoleOptions) => {
        return getByRole(div, role, options);
      },
      getAllByRole: (role: ByRoleMatcher, options?: ByRoleOptions) => {
        return getAllByRole(div, role, options);
      },
      getByTestId: (id: Matcher, options?: MatcherOptions) => {
        return getByTestId(div, id, options);
      },
      getAllByTestId: (id: Matcher, options?: MatcherOptions) => {
        return getAllByTestId(div, id, options);
      },
      queryByText: (id: Matcher, options?: SelectorMatcherOptions) => {
        return queryByText(div, id, options);
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
