import { expect, test } from '@playwright/test';

// This file is created by Storybook
// when we run `npm run build`
import storybook from '../storybook-static/index.json' with { type: 'json' };

// Only run tests on stories, not other documentation pages.
const stories = Object.values(storybook.entries).filter(
  (error) => error.type === 'story',
);

for (const story of stories) {
  test(`${story.title} ${story.name} should not have visual regressions`, async ({
    page,
  }, workerInfo) => {
    if (
      story.id.toLowerCase().includes('spinner') ||
      story.id.toLowerCase().includes('loading')
    ) {
      return;
    }

    const parameters = new URLSearchParams({
      id: story.id,
      viewMode: 'story',
    });

    await page.goto(`/iframe.html?${parameters.toString()}`, {
      waitUntil: 'domcontentloaded',
    });
    await page.waitForFunction(() => document.fonts.ready);
    await page.waitForSelector('#storybook-root');

    await expect(page).toHaveScreenshot(
      `${story.id}-${workerInfo.project.name}-${process.platform}.png`,
      {
        fullPage: true,
        animations: 'disabled',
      },
    );
  });
}
