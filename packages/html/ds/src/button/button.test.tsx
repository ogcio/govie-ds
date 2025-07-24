import { composeStories } from '@storybook/react-vite';
import * as stories from './button.stories.js';

const composedStories = composeStories(stories);

describe('button', () => {
  for (const key of Object.keys(composedStories).sort() as Array<
    keyof typeof composedStories
  >) {
    it(`Snapshot - ${key}`, async () => {
      await composedStories[key].run();
      expect(document.body.firstChild).toMatchSnapshot();
    });
  }
});
