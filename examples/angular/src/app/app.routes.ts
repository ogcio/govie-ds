import type { Routes } from '@angular/router';
import { Home } from './pages/home';
import { NewsList } from './pages/news/news-list';
import { NewWebsiteOnTheDesignSystem } from './pages/news/new-website-on-the-design-system';
import { AngularLibraryJoinsTheDesignSystem } from './pages/news/angular-library-joins-the-design-system';
import { AccessibilityAuditsForEveryDepartment } from './pages/news/accessibility-audits-for-every-department';
import { OnboardingMilestone } from './pages/news/onboarding-milestone';
import { DesignReviewOpenCall } from './pages/news/design-review-open-call';
import { NotFound } from './pages/not-found';
import { DesignSystemOverview } from './pages/design-system/design-system-overview';
import { Principles } from './pages/design-system/principles';
import { Benefits } from './pages/design-system/benefits';
import { Frameworks } from './pages/design-system/frameworks';
import { Adoption } from './pages/design-system/adoption';
import { DesignSystemLayout } from './pages/design-system/design-system-layout';
import { ServicesOverview } from './pages/services/services-overview';
import { Onboarding } from './pages/services/onboarding';
import { DesignReview } from './pages/services/design-review';
import { AccessibilityAudit } from './pages/services/accessibility-audit';
import { Training } from './pages/services/training';
import { Support } from './pages/services/support';
import { ServicesLayout } from './pages/services/services-layout';
import { AboutOverview } from './pages/about/about-overview';
import { Strategy } from './pages/about/strategy';
import { Structure } from './pages/about/structure';
import { AboutLayout } from './pages/about/about-layout';
import { HelpOverview } from './pages/help/help-overview';
import { Accessibility } from './pages/help/accessibility';
import { Privacy } from './pages/help/privacy';
import { Cookies } from './pages/help/cookies';
import { HelpLayout } from './pages/help/help-layout';
import { Contact } from './pages/contact';
import { Gaeilge } from './pages/gaeilge';

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'news', component: NewsList, title: 'News' },
  {
    path: 'news/new-website-on-the-design-system',
    component: NewWebsiteOnTheDesignSystem,
    title: 'Department of Engagement launches its new website on the Design System',
  },
  {
    path: 'news/angular-library-joins-the-design-system',
    component: AngularLibraryJoinsTheDesignSystem,
    title: 'Angular component library joins HTML, React and Vue',
  },
  {
    path: 'news/accessibility-audits-for-every-department',
    component: AccessibilityAuditsForEveryDepartment,
    title: 'Accessibility audits now available to every department',
  },
  {
    path: 'news/onboarding-milestone',
    component: OnboardingMilestone,
    title: 'Public bodies complete Design System onboarding',
  },
  {
    path: 'news/design-review-open-call',
    component: DesignReviewOpenCall,
    title: 'Open call: put your service forward for a design review',
  },
  {
    path: 'design-system',
    component: DesignSystemLayout,
    children: [
      { path: '', component: DesignSystemOverview, title: 'Design System' },
      { path: 'principles', component: Principles, title: 'Principles' },
      { path: 'benefits', component: Benefits, title: 'Benefits' },
      { path: 'frameworks', component: Frameworks, title: 'Tools and frameworks' },
      { path: 'adoption', component: Adoption, title: 'Adoption' },
    ],
  },
  {
    path: 'services',
    component: ServicesLayout,
    children: [
      { path: '', component: ServicesOverview, title: 'Services' },
      { path: 'onboarding', component: Onboarding, title: 'Onboarding' },
      { path: 'design-review', component: DesignReview, title: 'Design reviews' },
      { path: 'accessibility-audit', component: AccessibilityAudit, title: 'Accessibility audits' },
      { path: 'training', component: Training, title: 'Training' },
      { path: 'support', component: Support, title: 'Support' },
    ],
  },
  {
    path: 'about',
    component: AboutLayout,
    children: [
      { path: '', component: AboutOverview, title: 'About us' },
      { path: 'strategy', component: Strategy, title: 'Strategy' },
      { path: 'structure', component: Structure, title: 'Structure' },
    ],
  },
  {
    path: 'help',
    component: HelpLayout,
    children: [
      { path: '', component: HelpOverview, title: 'Help' },
      { path: 'accessibility', component: Accessibility, title: 'Accessibility statement' },
      { path: 'privacy', component: Privacy, title: 'Privacy notice' },
      { path: 'cookies', component: Cookies, title: 'Cookies' },
    ],
  },
  { path: 'contact', component: Contact, title: 'Contact' },
  { path: 'gaeilge', component: Gaeilge, title: 'Gaeilge' },
  { path: '**', component: NotFound, title: 'Page not found' },
];
