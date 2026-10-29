import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  GiBox,
  GiContainer,
  GiGrid,
  GiH1Directive,
  GiH2Directive,
  GiH3Directive,
  GiInsetTextDirective,
  GiLinkButtonDirective,
  GiLinkDirective,
  GiParagraphDirective,
  GiStack,
  GiStackDirective,
  GiTextDirective,
} from '@ogcio/design-system-angular';
import {
  AccessibilityIcon,
  AppsIcon,
  ArrowRightIcon,
  CandlestickChartIcon,
  CheckCircleIcon,
  SpaceDashboardIcon,
  SwapVerticalIcon,
} from '@ogcio/design-system-angular/icons';

type Benefit = {
  id: string;
  icon: 'efficiency' | 'consistency' | 'accessibility' | 'performance' | 'responsive' | 'compliance';
  title: string;
  text: string;
};

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    GiBox,
    GiContainer,
    GiGrid,
    GiStack,
    GiStackDirective,
    GiH1Directive,
    GiH2Directive,
    GiH3Directive,
    GiParagraphDirective,
    GiTextDirective,
    GiLinkDirective,
    GiLinkButtonDirective,
    GiInsetTextDirective,
    SpaceDashboardIcon,
    AppsIcon,
    AccessibilityIcon,
    CandlestickChartIcon,
    SwapVerticalIcon,
    CheckCircleIcon,
    ArrowRightIcon,
  ],
  templateUrl: './home.html',
})
export class Home {
  protected readonly benefits: Benefit[] = [
    {
      id: 'efficiency',
      icon: 'efficiency',
      title: 'Efficiency',
      text: 'Start from a complete suite of components, patterns and guidelines instead of rebuilding the basics.',
    },
    {
      id: 'consistency',
      icon: 'consistency',
      title: 'Consistency',
      text: 'Give people the same experience on every government website, so what they learn once works everywhere.',
    },
    {
      id: 'accessibility',
      icon: 'accessibility',
      title: 'Accessibility',
      text: 'Meet WCAG 2.1 AA with components that are built and tested for people of all abilities.',
    },
    {
      id: 'performance',
      icon: 'performance',
      title: 'Performance',
      text: 'Deliver fast pages with optimised components and assets, even on slower connections.',
    },
    {
      id: 'responsive',
      icon: 'responsive',
      title: 'Responsive',
      text: 'Serve people on phones, tablets and desktops with layouts that adapt to every screen.',
    },
    {
      id: 'compliance',
      icon: 'compliance',
      title: 'Compliance',
      text: 'Stay aligned with government standards on identity and accessibility.',
    },
  ];

  protected readonly facts = [
    { value: '1', label: 'shared identity for government websites' },
    { value: '4', label: 'component libraries: HTML, React, Angular and Vue' },
    { value: 'AA', label: 'WCAG 2.1 accessibility as the baseline' },
    { value: '2', label: 'official languages, Irish and English, plus any other locale' },
  ];
}
