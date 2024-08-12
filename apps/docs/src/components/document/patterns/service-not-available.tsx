'use client';
import { Heading, Header, Footer, Link, Paragraph } from '@govie-react/ds';

export function ServiceUnavailable() {
  return (
    <>
      <Header />
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
