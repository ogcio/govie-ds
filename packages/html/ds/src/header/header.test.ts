import { renderMacro } from '@govie-frontend/macro';
import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
} from '@testing-library/dom';
import html from './header.html?raw';
import { HeaderProps } from './header.schema';

function renderContent<TProps>({ name, html }: { name: string; html: string }) {
  return function foo(props: TProps) {
    const markup = renderMacro<TProps>({ name, html })(props);

    const div = document.createElement('div');
    div.innerHTML = markup;
    return div;
  };
}

describe('header', () => {
  const renderHeader = renderContent<HeaderProps>({
    name: 'govieHeader',
    html,
  });

  it('should work', () => {
    const foo = renderHeader({ title: 'Application service' });

    expect(getByText(foo, 'Application service')).toBeTruthy();
  });
});
