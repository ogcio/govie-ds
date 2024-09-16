import { destroyGovIe, initGovIe } from '..';
import headerHtml from '../header/header.html?raw';

describe('instances', () => {
  beforeEach(() => {
    destroyGovIe();
    initGovIe();
  });

  it('should return expected instance', () => {
    const element = document.createElement('div');
    element.innerHTML = headerHtml;

    expect(element).toBeTruthy();
    //TODO: bring back the test below once we resolve the issue with imports in while running tests (Story 21073)
    // expect(
    //   createInstance({ component: 'Header', options: { element } }),
    // ).toBeInstanceOf(Header);
  });
});
