import {
  Heading,
  Header,
  Link,
  Paragraph,
  Footer,
  HeaderSearch,
} from '@govie-ds/react';

export function PageNotFound() {
  return (
    <>
      <Header
        logo={{ href: '/' }}
        items={[
          {
            itemType: 'slot',
            details: {
              component: <HeaderSearch />,
              slotAppearance: 'dropdown',
            },
          },
        ]}
      />
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
          contact the <Link href="#">service</Link> Helpline if you need to
          speak to someone about your [service].
        </Paragraph>
      </main>
      <Footer />
    </>
  );
}
