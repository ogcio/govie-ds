import {
  Container,
  Header,
  HeaderSearch,
  Heading,
  Paragraph,
} from '@ogcio/design-system-react';
import {
  Footer,
  FooterSection,
  FooterLogo,
  Link,
} from '@ogcio/design-system-react/next';
import { LogoGoldGreen } from '@ogcio/design-system-react/logos';

export function ServiceUnavailable() {
  return (
    <>
      <Header
        logo={{ href: '/' }}
        items={[
          {
            itemType: 'slot',
            component: <HeaderSearch />,
            slotAppearance: 'dropdown',
          },
        ]}
      />
      <main>
        <Heading as="h2">Sorry, the service is unavailable</Heading>
        <Paragraph>You will be able to use the service later.</Paragraph>
        <Paragraph>
          We saved your answers. They will be available for 30 days
        </Paragraph>
        <Paragraph>
          <Link variant="inline" href="#">
            Contact the [service] Helpline
          </Link>{' '}
          if you need to make changes to your claim or speak to someone about
          your [service].
        </Paragraph>
      </main>
      <Footer>
        <FooterSection>
          <Container>
            <FooterLogo>
              <LogoGoldGreen size={181} />
            </FooterLogo>
          </Container>
        </FooterSection>
      </Footer>
    </>
  );
}
