import type { Meta, StoryObj } from '@storybook/react-vite';
import Footer from '@/atoms/Footer';
import FooterSection, { FooterSectionVariant } from '@/atoms/FooterSection';
import FooterLogo from '@/atoms/FooterLogo';
import { LogoGoldGreen } from '@/atoms/icons/logos';
import { footerMeta, Default as defaultStory } from '@/atoms/storybook/Footer.meta';

const meta: Meta = {
  ...footerMeta,
  title: 'Layout/Footer2',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  ...defaultStory,
  render: ({
    ariaLabel,
    ariaLabelledBy,
    className,
    id,
    dataTestId,
    sectionVariant,
    sectionClassName,
    sectionId,
    sectionDataTestId,
    logoClassName,
    logoId,
    logoDataTestId,
    showUtilitySection,
    utilitySectionDataTestId,
  }) => (
    <Footer ariaLabel={ariaLabel} ariaLabelledBy={ariaLabelledBy} className={className} id={id} dataTestId={dataTestId}>
      <FooterSection
        variant={sectionVariant}
        className={sectionClassName}
        id={sectionId}
        dataTestId={sectionDataTestId}
      >
        {/* primary slot content */}
        <FooterLogo className={logoClassName} id={logoId} dataTestId={logoDataTestId}>
          <LogoGoldGreen label="Gov.ie Logo" />
        </FooterLogo>
      </FooterSection>

      {showUtilitySection && (
        <FooterSection variant={FooterSectionVariant.UTILITY} dataTestId={utilitySectionDataTestId}>
          © 2025 Government of Ireland
        </FooterSection>
      )}
    </Footer>
  ),
};
