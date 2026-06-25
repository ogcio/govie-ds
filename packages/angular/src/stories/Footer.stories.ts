import type { StoryObj } from '@storybook/angular';
import { Default as footerMeta } from '@/atoms/storybook/Footer.meta';
import { Footer, FooterSection, FooterLogo } from '@/atoms';
import { LogoGoldGreen } from '@/atoms/icons/logos';

export const Default: StoryObj = {
  ...footerMeta,
  render: (props) => ({
    props,
    moduleMetadata: { imports: [Footer, FooterSection, FooterLogo, LogoGoldGreen] },
    template: `
        <gi-footer
          [ariaLabel]="ariaLabel"
          [id]="id"
          [dataTestId]="dataTestId"
        >
          <gi-footer-section
            [variant]="sectionVariant"
            [dataTestId]="sectionDataTestId"
          >
            <gi-footer-logo [dataTestId]="logoDataTestId">
              <gi-logo-gold-green label="Gov.ie Logo"></gi-logo-gold-green>
            </gi-footer-logo>
          </gi-footer-section>
  
          @if (showUtilitySection) {
            <gi-footer-section variant="utility" [dataTestId]="utilitySectionDataTestId">
              © 2025 Government of Ireland
            </gi-footer-section>
          }
        </gi-footer>
      `,
  }),
};
