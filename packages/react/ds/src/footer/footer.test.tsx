import { cleanup, render } from '../test-utils.js';
import { FooterProps, Footer } from './footer.js';

describe('footer', () => {
  afterEach(cleanup);
  const renderFooter = (props: FooterProps) => render(<Footer {...props} />);

  it('should pass axe tests', async () => {
    const screen = renderFooter({
      links: [
        {
          href: '#',
          label: 'Link 1',
        },
        {
          href: '#',
          label: 'Link 2',
        },
        {
          href: '#',
          label: 'Link 3',
        },
      ],
      secondaryNavLinks: [
        {
          heading: 'Heading',
          links: [
            {
              href: '#',
              label: 'Link 1',
            },
            {
              href: '#',
              label: 'Link 2',
            },
            {
              href: '#',
              label: 'Link 3',
            },
          ],
        },
        {
          heading: 'Heading 2',
          links: [
            {
              href: '#',
              label: 'Link 4',
            },
            {
              href: '#',
              label: 'Link 5',
            },
            {
              href: '#',
              label: 'Link 6',
            },
          ],
        },
      ],
    });

    await screen.axe();
  });
});
