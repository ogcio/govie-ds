import type { InjectionKey } from 'vue';

export type Section = {
  anchor: string;
  heading: string;
};

/** Provided by `Page`, so its `PageSection`s list themselves under "On this page". */
export const pageSectionsKey: InjectionKey<Section[]> = Symbol('page-sections');

export type SiteSection = {
  heading: string;
  url: string;
};

/** Provided by `SectionLayout`, so a `Page` inside it links the section in its breadcrumbs, narrows its column and shows "On this page". */
export const sectionLayoutKey: InjectionKey<SiteSection> = Symbol('section-layout');
