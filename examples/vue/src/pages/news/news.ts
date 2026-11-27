type NewsSection = {
  anchor: string;
  heading: string;
  paragraphs?: string[];
  list?: string[];
  link?: { url: string; label: string };
};

export type NewsItem = {
  url: string;
  /** ISO date, e.g. `2026-08-28`. */
  date: string;
  heading: string;
  lead: string;
  sections: NewsSection[];
};

/** Newest first. */
export const news: NewsItem[] = [
  {
    url: '/news/native-vue-breadcrumbs-and-pagination',
    date: '2026-11-25',
    heading: 'This website now runs on native Vue breadcrumbs and pagination',
    lead: 'The trail above each page and the pages of this news list are now built with the newest components in Design System Vue.',
    sections: [
      {
        anchor: 'what-changed',
        heading: 'What changed',
        paragraphs: [
          'Breadcrumbs, pagination, the page layout and the footer joined the Vue library this month. We moved our own website onto them on the same day.',
          'Every link works with Vue Router, so moving between pages, or between the pages of this list, never reloads the site.',
        ],
      },
    ],
  },
  {
    url: '/news/storybook-for-every-library',
    date: '2026-11-20',
    heading: 'A Storybook for every component library',
    lead: 'Teams can now try every component in React, Angular and Vue before they write a line of code.',
    sections: [
      {
        anchor: 'try-before-you-build',
        heading: 'Try before you build',
        paragraphs: [
          "Each library has its own Storybook, where teams can change a component's settings, see the result straight away and copy the code into their service.",
          'Designers use it too: it is the quickest way to check how a component looks on a phone or with a long piece of text.',
        ],
      },
    ],
  },
  {
    url: '/news/buttons-links-and-headings-go-native-in-vue',
    date: '2026-11-17',
    heading: 'Buttons, links and headings go native in Vue',
    lead: 'Vue developers can now style and wire up Design System components exactly as they would any other element in a template.',
    sections: [
      {
        anchor: 'write-vue',
        heading: 'Write Vue the way you already do',
        paragraphs: [
          'Components take the standard class and style attributes and ordinary Vue event listeners. There are no framework-specific settings to learn.',
          'The government header moved across in the same release, so a complete page frame now takes a handful of components.',
        ],
      },
    ],
  },
  {
    url: '/news/header-navigation-rebuild',
    date: '2026-11-03',
    heading: 'Navigation in the government header gets a rebuild',
    lead: 'Each link in the header is now its own component, which makes it easy to show visitors where they are on a site.',
    sections: [
      {
        anchor: 'where-am-i',
        heading: 'Where am I?',
        paragraphs: [
          'Sites can mark the current section, so the header shows visitors which part of the site they are in. Screen readers announce it too.',
          'Look at the header of this page: the News link stays marked on every news article.',
        ],
      },
    ],
  },
  {
    url: '/news/irish-language-checks',
    date: '2026-10-28',
    heading: 'Every component tested with Irish-language content',
    lead: 'We put every component through its paces with Irish text, from long compound words to the síneadh fada.',
    sections: [
      {
        anchor: 'longer-words',
        heading: 'Longer words, same layout',
        paragraphs: [
          'Irish words are often longer than their English equivalents, and layouts built only for English can break on small screens.',
          'The checks found two places where text overflowed on a phone. Both are fixed, and Irish content is now part of every review.',
        ],
      },
    ],
  },
  {
    url: '/news/storybook-examples-double-as-tests',
    date: '2026-10-20',
    heading: 'Every example in our Storybook now doubles as a test',
    lead: 'The interactive examples in the Vue Storybook now run as automated tests every time the code changes.',
    sections: [
      {
        anchor: 'why-it-matters',
        heading: 'Why it matters',
        paragraphs: [
          'When an example shows a button being pressed or a link being followed, the same steps now run automatically.',
          "A change that breaks how a component behaves is caught before it reaches any department's website.",
        ],
      },
    ],
  },
  {
    url: '/news/new-website-on-the-design-system',
    date: '2026-10-14',
    heading: 'Department of Engagement launches its new website on the Design System',
    lead: 'Our new website is built entirely with the Vue component library of the Government of Ireland Design System.',
    sections: [
      {
        anchor: 'new-website',
        heading: 'A website that looks like government',
        paragraphs: [
          'The Department of Engagement has launched its new website, built from the ground up on the Government of Ireland Design System.',
          'The header, navigation, typography, layout and footer all come from the Vue component library. Visitors who know other government websites will feel at home straight away.',
        ],
      },
      {
        anchor: 'what-changed',
        heading: 'What has changed',
        list: [
          'The familiar government header and footer on every page',
          'Section navigation and breadcrumbs that show where you are',
          'Pages that adapt to phones, tablets and desktops',
          'Accessible components tested against WCAG 2.1 AA',
        ],
      },
    ],
  },
  {
    url: '/news/one-breadcrumb-trail-for-every-framework',
    date: '2026-10-06',
    heading: 'One breadcrumb trail for React, Angular and Vue',
    lead: 'Breadcrumbs are now written once and generated for every framework the Design System supports.',
    sections: [
      {
        anchor: 'written-once',
        heading: 'Written once, shipped everywhere',
        paragraphs: [
          'A fix or an improvement now reaches React, Angular and Vue teams on the same day.',
          'The trail looks and behaves the same whichever framework a team builds with, so people moving between government websites never have to relearn it.',
        ],
      },
    ],
  },
  {
    url: '/news/angular-library-joins-the-design-system',
    date: '2026-09-30',
    heading: 'Angular component library joins HTML, React and Vue',
    lead: 'Teams that build with Angular can now use the same components as every other department, straight from the public library.',
    sections: [
      {
        anchor: 'announcement',
        heading: 'Four frameworks, one design',
        paragraphs: [
          'Departments that build enterprise applications in Angular can now use the Design System directly in their code. The Angular library shares design tokens and styles with the HTML, React and Vue libraries, so every service looks the same whichever framework it uses.',
        ],
      },
      {
        anchor: 'getting-started',
        heading: 'Getting started',
        paragraphs: [
          'The library covers layout, typography, actions, header, footer and navigation. More components are being added.',
        ],
        link: { url: '/design-system/frameworks', label: 'See the tools and frameworks' },
      },
    ],
  },
  {
    url: '/news/side-navigation-arrives',
    date: '2026-09-22',
    heading: 'Side navigation arrives for long guidance pages',
    lead: 'A new side navigation helps people find their way around sites with many pages, such as guidance and policy collections.',
    sections: [
      {
        anchor: 'finding-your-way',
        heading: 'Finding your way',
        paragraphs: [
          'Pages can be grouped under headings, and each item can carry a small action at its end.',
          'The current page stays highlighted, so people always know where they are in a long collection.',
        ],
      },
    ],
  },
  {
    url: '/news/accessibility-audits-for-every-department',
    date: '2026-09-12',
    heading: 'Accessibility audits now available to every department',
    lead: 'Any public body can now request a free accessibility audit of a service built on the Design System.',
    sections: [
      {
        anchor: 'audits',
        heading: 'Free audits for public bodies',
        paragraphs: [
          'Our Accessibility and Inclusion Unit now offers audits to every public body. Each audit combines automated checks, manual testing and sessions with people who use assistive technology.',
        ],
        link: { url: '/services/accessibility-audit', label: 'Read about accessibility audits' },
      },
    ],
  },
  {
    url: '/news/design-system-opens-to-vue-teams',
    date: '2026-09-08',
    heading: 'Design System opens its doors to Vue teams',
    lead: 'Teams that build with Vue can now use the Government of Ireland Design System, from the same shared components as React.',
    sections: [
      {
        anchor: 'in-the-box',
        heading: 'What is in the box',
        paragraphs: [
          'The first release ships the components, the styles, the web fonts and a Storybook where teams can try every component before they use it.',
        ],
      },
    ],
  },
  {
    url: '/news/onboarding-milestone',
    date: '2026-08-28',
    heading: 'Public bodies complete Design System onboarding',
    lead: 'A new group of public bodies has completed onboarding and released their first pages on the Design System.',
    sections: [
      {
        anchor: 'milestone',
        heading: 'A growing community',
        paragraphs: [
          'Teams from departments, agencies and local authorities have completed onboarding this quarter. Each released its first pages on the Design System within eight weeks.',
          'Every team that joins makes the system stronger: questions, feedback and component requests from delivery teams shape each new release.',
        ],
      },
    ],
  },
  {
    url: '/news/clearer-focus-outlines',
    date: '2026-08-14',
    heading: 'Clearer focus outlines for keyboard users',
    lead: 'Every interactive component now shows the same bold outline when people move through a page with the keyboard.',
    sections: [
      {
        anchor: 'one-outline',
        heading: 'One outline everywhere',
        paragraphs: [
          'The outline uses one shared colour across the Design System, so it stays visible on light and dark backgrounds alike.',
          'Try it on this page: press Tab and follow the outline from the skip link to the footer.',
        ],
      },
    ],
  },
  {
    url: '/news/design-review-open-call',
    date: '2026-07-22',
    heading: 'Open call: put your service forward for a design review',
    lead: 'We are inviting delivery teams to put their services forward for a service design review.',
    sections: [
      {
        anchor: 'open-call',
        heading: 'How to take part',
        paragraphs: [
          'Teams preparing to launch or rebuild a service can apply for a review by the Service Standards Office. Reviews take two weeks and finish with a written report and a follow-up session.',
        ],
        link: { url: '/services/design-review', label: 'Read about service design reviews' },
      },
    ],
  },
  {
    url: '/news/interns-build-a-service-in-a-week',
    date: '2026-07-08',
    heading: 'Summer interns build a working service in a week',
    lead: 'Four summer interns built a working prototype of a permit application in five days, using only the Design System.',
    sections: [
      {
        anchor: 'five-days',
        heading: 'Five days, one service',
        paragraphs: [
          'None of the interns had built a government service before. By Friday their prototype had a start page, a five-step form and a confirmation page, and it passed an accessibility check on the first run.',
          'Their verdict: most of the week went on the questions to ask, not on the code.',
        ],
      },
    ],
  },
];

export const newsDateFormat = new Intl.DateTimeFormat('en-IE', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});
