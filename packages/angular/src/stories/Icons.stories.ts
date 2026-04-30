import _ from 'lodash';
import type { Meta, StoryObj } from '@storybook/angular';
import { iconsMeta, Default as iconsDefault, iconList } from '../atoms/storybook/Icons.meta';

const meta: Meta = {
  ...iconsMeta,
  title: 'Foundation/Icons',
};

export default meta;

const navigationMatchers = ['Arrow', 'FirstPage', 'LastPage', 'SwapVertical'];
const socialIconNames = new Set(['Bluesky', 'Facebook', 'Instagram', 'Linkedin', 'Threads', 'Tiktok', 'X', 'Youtube']);

type SortedIcons = {
  Base: typeof iconList;
  Navigation: typeof iconList;
  Social: typeof iconList;
};

function buildSortedIcons(): SortedIcons {
  return iconList.reduce(
    (acc, icon) => {
      if (navigationMatchers.some((matcher) => icon.name.includes(matcher))) {
        acc.Navigation.push(icon);
      } else if (socialIconNames.has(icon.name)) {
        acc.Social.push(icon);
      } else {
        acc.Base.push(icon);
      }
      return acc;
    },
    {
      Base: [],
      Navigation: [],
      Social: [],
    } as SortedIcons,
  );
}

function iconItemTemplate({ name, selector }: (typeof iconList)[number]) {
  return `
      <div class="gi-w-32 gi-flex gi-flex-col gi-items-center gi-gap-2">
        <${selector}
          [size]="size"
          [color]="color"
          [label]="label"
          [className]="className"
          dataTestId="${selector}"
        ></${selector}>
        <span class="gi-text-xs gi-text-center gi-whitespace-nowrap">${name}</span>
      </div>`;
}

function sectionsTemplate(sortedIcons: SortedIcons): string {
  return Object.entries(sortedIcons)
    .map(
      ([key, icons]) => `
    <div class="gi-flex gi-flex-col gi-gap-8">
      <h2 class="gi-text-lg gi-font-bold gi-mb-8 gi-underline gi-text-center">${key}</h2>
      <div class="gi-flex gi-flex-wrap gi-gap-8">
        ${_.map(icons, iconItemTemplate).join('')}
      </div>
    </div>`,
    )
    .join('');
}

export const Default: StoryObj = {
  ...iconsDefault,
  render: (props) => {
    const sortedIcons = buildSortedIcons();
    return {
      props,
      moduleMetadata: {
        imports: _.map(iconList, 'Component'),
      },
      template: `
    <div class="gi-flex gi-flex-col gi-gap-8">
      ${sectionsTemplate(sortedIcons)}
    </div>
    `,
    };
  },
};
