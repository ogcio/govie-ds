import { Button, Heading, HeadingAs, Link, Paragraph } from '@govie-ds/react';
import React from 'react';

export const cookieBannerProps = {
  children: (
    <>
      <Heading as={HeadingAs.h3}>Title</Heading>
      <Paragraph>
        We use some essential cookies to make this service work.
        <br />
        <br />
        We’d also like to use analytics cookies so we can understand how you use
        the service and make improvements.
      </Paragraph>
    </>
  ),
  accept: {
    children: (
      <>
        <Heading as={HeadingAs.h3}>Accepted Title</Heading>
        <Paragraph>
          You’ve accepted analytics cookies. You can change your cookie settings
          at any time.
        </Paragraph>
      </>
    ),
    triggerButton: <Button>Accept cookies</Button>,
  },
  reject: {
    children: (
      <>
        <Heading as={HeadingAs.h3}>Rejected Title</Heading>
        <Paragraph>
          You’ve rejected analytics cookies. You can change your cookie settings
          at any time.
        </Paragraph>
      </>
    ),
    triggerButton: <Button>Reject cookies</Button>,
  },
  cookieLink: <Link href="#">See Cookies</Link>,
  dismissButton: <Button>Hide this message</Button>,
};
