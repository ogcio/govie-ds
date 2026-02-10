import { expect, test } from '@playwright/test';

// This file is created by Storybook
// when we run `npm run build`
import storybook from '../storybook-static/index.json' with { type: 'json' };

// Only run tests on stories, not other documentation pages.
const stories = Object.values(storybook.entries)
  .filter((error) => error.type === 'story')
  .filter((story) => story.tags?.includes('skip-playwright') === false)
  .filter((story) => story.id.includes('loading') === false)
  .filter((story) => story.id.includes('spinner') === false);

for (const story of stories) {
  test(`${story.title} ${story.name} should not have visual regressions`, async ({
    page,
  }, workerInfo) => {
    const parameters = new URLSearchParams({
      id: story.id,
      viewMode: 'story',
    });

    await page.goto(`/iframe.html?${parameters.toString()}`, {
      waitUntil: 'domcontentloaded',
    });
    await Promise.race([
      page.evaluate(() => document.fonts.ready),
      page.waitForTimeout(5000),
    ]);
    await page.waitForSelector('#storybook-root');
    await page.waitForLoadState('networkidle');

    // Give the browser a couple of frames to apply styles/layout after fonts/assets
    await page.evaluate(() => new Promise(
      resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))),
    );
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot(`${story.id}.png`, {
      fullPage: true,
      animations: 'disabled',
      // maxDiffPixelRatio: 0.01,
      threshold: 0.4,
    });
  });
}
