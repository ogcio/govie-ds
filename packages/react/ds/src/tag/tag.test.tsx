import { render, cleanup } from '../test-utils.js';
import { TagProps, Tag, TagTypeEnum, type TagType } from './tag.js';

describe('govieTag', () => {
  afterEach(cleanup);
  const renderTag = (props: TagProps) => render(<Tag {...props} />);

  it('should render a tag with the correct content', () => {
    const screen = renderTag({
      text: 'This is a tag',
      type: TagTypeEnum.default,
    });
    const tagElement = screen.getByText('This is a tag');
    expect(tagElement).toBeTruthy();
    expect(tagElement.tagName).toBe('STRONG');
  });

  const tagTypeClasses = {
    [TagTypeEnum.info]: 'gi-tag-info',
    [TagTypeEnum.default]: 'gi-tag-default',
    [TagTypeEnum.success]: 'gi-tag-success',
    [TagTypeEnum.warning]: 'gi-tag-warning',
    [TagTypeEnum.error]: 'gi-tag-error',
  };

  describe.each(Object.entries(tagTypeClasses))(
    'should have the correct class for %s',
    (type, expectedClass) => {
      it(`${type} tag`, () => {
        const screen = renderTag({
          text: `${type.charAt(0).toUpperCase() + type.slice(1)} tag`,
          type: type as TagType,
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
      type: TagTypeEnum.info,
    });

    await screen.axe();
  });
});
