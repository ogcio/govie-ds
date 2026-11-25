import { createRouter, createWebHistory } from 'vue-router';
import SectionLayout from './components/SectionLayout.vue';
import AboutOverview from './pages/about/AboutOverview.vue';
import Accessibility from './pages/help/Accessibility.vue';
import AccessibilityAudit from './pages/services/AccessibilityAudit.vue';
import AccessibilityAuditsForEveryDepartment from './pages/news/AccessibilityAuditsForEveryDepartment.vue';
import Adoption from './pages/design-system/Adoption.vue';
import AngularLibraryJoinsTheDesignSystem from './pages/news/AngularLibraryJoinsTheDesignSystem.vue';
import Benefits from './pages/design-system/Benefits.vue';
import Contact from './pages/Contact.vue';
import Cookies from './pages/help/Cookies.vue';
import DesignReview from './pages/services/DesignReview.vue';
import DesignReviewOpenCall from './pages/news/DesignReviewOpenCall.vue';
import DesignSystemOverview from './pages/design-system/DesignSystemOverview.vue';
import Frameworks from './pages/design-system/Frameworks.vue';
import Gaeilge from './pages/Gaeilge.vue';
import HelpOverview from './pages/help/HelpOverview.vue';
import Home from './pages/Home.vue';
import NewsList from './pages/news/NewsList.vue';
import NewWebsiteOnTheDesignSystem from './pages/news/NewWebsiteOnTheDesignSystem.vue';
import NotFound from './pages/NotFound.vue';
import Onboarding from './pages/services/Onboarding.vue';
import OnboardingMilestone from './pages/news/OnboardingMilestone.vue';
import Principles from './pages/design-system/Principles.vue';
import Privacy from './pages/help/Privacy.vue';
import ServicesOverview from './pages/services/ServicesOverview.vue';
import Strategy from './pages/about/Strategy.vue';
import Structure from './pages/about/Structure.vue';
import Support from './pages/services/Support.vue';
import Training from './pages/services/Training.vue';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
  }
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  sensitive: true,
  routes: [
    { path: '/', component: Home, meta: { title: 'Home' } },
    { path: '/news', component: NewsList, meta: { title: 'News' } },
    {
      path: '/news/new-website-on-the-design-system',
      component: NewWebsiteOnTheDesignSystem,
      meta: { title: 'Department of Engagement launches its new website on the Design System' },
    },
    {
      path: '/news/angular-library-joins-the-design-system',
      component: AngularLibraryJoinsTheDesignSystem,
      meta: { title: 'Angular component library joins HTML, React and Vue' },
    },
    {
      path: '/news/accessibility-audits-for-every-department',
      component: AccessibilityAuditsForEveryDepartment,
      meta: { title: 'Accessibility audits now available to every department' },
    },
    {
      path: '/news/onboarding-milestone',
      component: OnboardingMilestone,
      meta: { title: 'Public bodies complete Design System onboarding' },
    },
    {
      path: '/news/design-review-open-call',
      component: DesignReviewOpenCall,
      meta: { title: 'Open call: put your service forward for a design review' },
    },
    {
      path: '/design-system',
      component: SectionLayout,
      props: { heading: 'Design System', url: '/design-system' },
      children: [
        { path: '', component: DesignSystemOverview, meta: { title: 'Design System' } },
        { path: 'principles', component: Principles, meta: { title: 'Principles' } },
        { path: 'benefits', component: Benefits, meta: { title: 'Benefits' } },
        { path: 'frameworks', component: Frameworks, meta: { title: 'Tools and frameworks' } },
        { path: 'adoption', component: Adoption, meta: { title: 'Adoption' } },
      ],
    },
    {
      path: '/services',
      component: SectionLayout,
      props: { heading: 'Services', url: '/services' },
      children: [
        { path: '', component: ServicesOverview, meta: { title: 'Services' } },
        { path: 'onboarding', component: Onboarding, meta: { title: 'Onboarding' } },
        { path: 'design-review', component: DesignReview, meta: { title: 'Design reviews' } },
        { path: 'accessibility-audit', component: AccessibilityAudit, meta: { title: 'Accessibility audits' } },
        { path: 'training', component: Training, meta: { title: 'Training' } },
        { path: 'support', component: Support, meta: { title: 'Support' } },
      ],
    },
    {
      path: '/about',
      component: SectionLayout,
      props: { heading: 'About us', url: '/about' },
      children: [
        { path: '', component: AboutOverview, meta: { title: 'About us' } },
        { path: 'strategy', component: Strategy, meta: { title: 'Strategy' } },
        { path: 'structure', component: Structure, meta: { title: 'Structure' } },
      ],
    },
    {
      path: '/help',
      component: SectionLayout,
      props: { heading: 'Help', url: '/help' },
      children: [
        { path: '', component: HelpOverview, meta: { title: 'Help' } },
        { path: 'accessibility', component: Accessibility, meta: { title: 'Accessibility statement' } },
        { path: 'privacy', component: Privacy, meta: { title: 'Privacy notice' } },
        { path: 'cookies', component: Cookies, meta: { title: 'Cookies' } },
      ],
    },
    { path: '/contact', component: Contact, meta: { title: 'Contact' } },
    { path: '/gaeilge', component: Gaeilge, meta: { title: 'Gaeilge' } },
    { path: '/:pathMatch(.*)*', component: NotFound, meta: { title: 'Page not found' } },
  ],
  scrollBehavior: (to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (!to.hash) {
      return { top: 0 };
    }
    // Move focus to the anchor as well, so keyboard and screen reader users continue from there.
    document.querySelector<HTMLElement>(`#${CSS.escape(to.hash.slice(1))}`)?.focus({ preventScroll: true });
    return { el: to.hash };
  },
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} - Department of Engagement` : 'Department of Engagement';
});
