import { Heading, Header, Link, Paragraph } from '@govie-ds/react';
import { Footer } from '@/components/footer/footer';

export function ServiceUnavailable() {
  return (
    <>
      <Header searchUrl="/seach_page" logoLink="/" />
      <main>
        <Heading as="h2">Sorry, the service is unavailable</Heading>
        <Paragraph>You will be able to use the service later.</Paragraph>
        <Paragraph>
          We saved your answers. They will be available for 30 days
        </Paragraph>
        <Paragraph>
          <Link href="#">Contact the [service] Helpline</Link> if you need to
          make changes to your claim or speak to someone about your [service].
        </Paragraph>
      </main>
      <Footer />
    </>
  );
}
