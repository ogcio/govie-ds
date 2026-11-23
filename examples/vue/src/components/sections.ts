import type { InjectionKey } from 'vue';

export type Section = {
  anchor: string;
  heading: string;
};

/** Provided by `Page`, so its `PageSection`s list themselves under "On this page". */
export const pageSectionsKey: InjectionKey<Section[]> = Symbol('page-sections');

/** Provided by `SectionLayout`, so a `Page` inside it narrows its column and shows "On this page". */
export const sectionLayoutKey: InjectionKey<boolean> = Symbol('section-layout');
