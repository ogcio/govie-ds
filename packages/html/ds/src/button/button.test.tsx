import { composeStories } from '@storybook/react-vite';
import * as stories from './button.stories.js';

const { Primary } = composeStories(stories);

describe('button', () => {
  it('Button snapshot', async () => {
    await Primary.run();
    expect(document.body.firstChild).toMatchSnapshot();
  });
});
