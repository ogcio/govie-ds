import { render } from '../common/render';
import html from './tag.html?raw';
import { TagProps, TagType } from './tag.schema';

describe('govieTag', () => {
  const renderTag = render<TagProps>({
    componentName: 'tag',
    macroName: 'govieTag',
    html,
  });

  it('should render a tag with the correct content', () => {
    const screen = renderTag({
      text: 'This is a tag',
      type: TagType.Default,
    });
    const tagElement = screen.getByText('This is a tag');
    expect(tagElement).toBeTruthy();
    expect(tagElement.tagName).toBe('STRONG');
  });

  const tagTypeClasses = {
    [TagType.Info]: 'gi-tag-info',
    [TagType.Default]: 'gi-tag-default',
    [TagType.Success]: 'gi-tag-success',
    [TagType.Warning]: 'gi-tag-warning',
    [TagType.Error]: 'gi-tag-error',
  };

  describe.each(Object.entries(tagTypeClasses))(
    'should have the correct class for %s',
    (type, expectedClass) => {
      it(`${type} tag`, () => {
        const screen = renderTag({
          text: `${type.charAt(0).toUpperCase() + type.slice(1)} tag`,
          type,
        });
        const tagElement = screen.getByText(
          `${type.charAt(0).toUpperCase() + type.slice(1)} tag`,
        );
        expect(tagElement.classList.contains(expectedClass)).toBe(true);
      });
    },
  );

  it('should apply the correct ARIA attributes', () => {
    const screen = renderTag({
      text: 'Completed tag',
      type: TagType.Default,
      aria: { 'aria-label': 'Completed tag' },
    });

    const tagElement = screen.getByText('Completed tag');

    expect(tagElement).toHaveAttribute('aria-label', 'Completed tag');
  });

  it('should pass axe accessibility tests', async () => {
    const screen = renderTag({
      text: 'Accessible tag',
      type: TagType.Info,
    });

    await screen.axe();
  });
});
