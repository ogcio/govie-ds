import { render } from '../common/render';
import html from './footer.html?raw';
import { FooterProps } from './footer.schema';

describe('footer', () => {
  const renderFooter = render<FooterProps>({
    componentName: 'footer',
    macroName: 'govieFooter',
    html,
  });

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
