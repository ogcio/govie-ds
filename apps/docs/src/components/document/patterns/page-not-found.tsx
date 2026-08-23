import { Heading, Paragraph } from '@ogcio/design-system-react';
import {
  HeaderLogo,
  Header,
  HeaderSection,
} from '@ogcio/design-system-react/next';
import { LogoGoldGreen, LogoWhite } from '@ogcio/design-system-react/logos';
import {
  Footer,
  FooterSection,
  FooterLogo,
  Link,
} from '@ogcio/design-system-react/next';

export function PageNotFound() {
  return (
    <>
      <Header>
        <HeaderSection>
          <HeaderLogo>
            <Link href="/" appearance="light">
              <LogoWhite />
            </Link>
          </HeaderLogo>
        </HeaderSection>
      </Header>
      <main>
        <Heading as="h2">Page not found</Heading>
        <Paragraph>
          If you typed the web address, check it is correct.
        </Paragraph>
        <Paragraph>
          If you pasted the web address, check you copied the entire address.
        </Paragraph>
        <Paragraph>
          If the web address is correct or you selected a link or button,
          contact the{' '}
          <Link variant="inline" href="#">
            service
          </Link>
          Helpline if you need to speak to someone about your [service].
        </Paragraph>
      </main>
      <Footer>
        <FooterSection>
          <FooterLogo>
            <LogoGoldGreen size={181} />
          </FooterLogo>
        </FooterSection>
      </Footer>
    </>
  );
}
