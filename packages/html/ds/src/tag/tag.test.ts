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
      type: TagType.default,
    });
    const tagElement = screen.getByText('This is a tag');
    expect(tagElement).toBeTruthy();
    expect(tagElement.tagName).toBe('STRONG');
  });

  const tagTypeClasses = {
    [TagType.info]: 'gi-tag-info',
    [TagType.default]: 'gi-tag-default',
    [TagType.success]: 'gi-tag-success',
    [TagType.warning]: 'gi-tag-warning',
    [TagType.error]: 'gi-tag-error',
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

  it('should pass axe accessibility tests', async () => {
    const screen = renderTag({
      text: 'Accessible tag',
      type: TagType.info,
    });

    await screen.axe();
  });
});
