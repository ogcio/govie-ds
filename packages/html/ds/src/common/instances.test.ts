import { destroyGovIe, initGovIe } from '..';
import { Header } from '../header/header';
import headerHtml from '../header/header.html?raw';
import { createInstance } from './instances';

describe('instances', () => {
  beforeEach(() => {
    destroyGovIe();
    initGovIe();
  });

  it('should return expected instance', () => {
    const element = document.createElement('div');
    element.innerHTML = headerHtml;

    expect(
      createInstance({ component: 'Header', options: { element } }),
    ).toBeInstanceOf(Header);
  });
});
