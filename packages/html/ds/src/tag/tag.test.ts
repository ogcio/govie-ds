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
      type: TagType.blue,
    });
    const tagElement = screen.getByText('This is a tag');
    expect(tagElement).toBeTruthy();
    expect(tagElement.tagName).toBe('STRONG');
  });

  // Mapping of tag types to their expected classes
  const tagTypeClasses = {
    [TagType.blue]: {
      background: 'gi-bg-blue-50',
      border: 'gi-border-blue-100',
      text: 'gi-text-blue-700',
    },
    [TagType.gray]: {
      background: 'gi-bg-gray-50',
      border: 'gi-border-gray-200',
      text: 'gi-text-gray-700',
    },
    [TagType.green]: {
      background: 'gi-bg-green-50',
      border: 'gi-border-green-100',
      text: 'gi-text-green-700',
    },
    [TagType.yellow]: {
      background: 'gi-bg-yellow-50',
      border: 'gi-border-yellow-300',
      text: 'gi-text-yellow-700',
    },
    [TagType.red]: {
      background: 'gi-bg-red-50',
      border: 'gi-border-red-100',
      text: 'gi-text-red-700',
    },
  };

  describe.each(Object.entries(tagTypeClasses))(
    'should have the correct classes for %s',
    (type, { background, border, text }) => {
      it(`${type} tag`, () => {
        const screen = renderTag({
          text: `${type.charAt(0).toUpperCase() + type.slice(1)} tag`,
          type,
        });
        const tagElement = screen.getByText(
          `${type.charAt(0).toUpperCase() + type.slice(1)} tag`,
        );

        expect(tagElement.classList.contains(background)).toBe(true);
        expect(tagElement.classList.contains(border)).toBe(true);
        expect(tagElement.classList.contains(text)).toBe(true);
      });
    },
  );

  it('should pass axe accessibility tests', async () => {
    const screen = renderTag({
      text: 'Accessible tag',
      type: TagType.blue,
    });

    await screen.axe();
  });
});
