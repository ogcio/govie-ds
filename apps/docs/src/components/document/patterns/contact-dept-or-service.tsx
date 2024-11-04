import { Heading, HeadingAs, Link, Paragraph } from '@govie-ds/react';

export function ContactDeptOrService() {
  return (
    <>
      <Heading as={HeadingAs.h2}>Get help with your application</Heading>
      <Heading as={HeadingAs.h3}>Telephone</Heading>
      <Paragraph>
        If you have a unique reference number, have it with you when you call.
      </Paragraph>
      <Paragraph>Telephone: 000 000000</Paragraph>
      <Paragraph>Textphone: 000 000000</Paragraph>
      <Paragraph>Monday to Friday, 8am to 6pm</Paragraph>
      <Paragraph>Saturday and Sunday, 10am to 4pm</Paragraph>
      <Paragraph>
        <Link href="#">Find out about call charges</Link>
      </Paragraph>

      <Heading as={HeadingAs.h3}>Email</Heading>
      <Paragraph>
        <Link href="#">name@example.com</Link>
      </Paragraph>
      <Paragraph>We aim to respond within 2 working days</Paragraph>

      <Heading as={HeadingAs.h3}>Webchat</Heading>
      <Paragraph>
        <Link href="#">Speak to an adviser now</Link>
      </Paragraph>
      <Paragraph>Current waiting time is 17 minutes</Paragraph>

      <Heading as={HeadingAs.h3}>Address</Heading>
      <Paragraph>Address Line 1</Paragraph>
      <Paragraph>Address Line 2</Paragraph>
      <Paragraph>City</Paragraph>
      <Paragraph>Eircode</Paragraph>

      <Heading as={HeadingAs.h3}>Address</Heading>
      <Paragraph>
        You can use Twitter to get general help. We cannot discuss specific
        cases or individual applications, so please do not any personal details.
      </Paragraph>
      <Paragraph>Twitter: @govdotie</Paragraph>
    </>
  );
}
