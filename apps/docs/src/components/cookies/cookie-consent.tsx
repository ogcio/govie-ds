'use client';
import {
  Button,
  CookieBanner,
  Heading,
  Link,
  Paragraph,
} from '@govie-ds/react';
import { useEffect, useState } from 'react';
import { getConsentStatus, setConsentStatus } from '../../utils/cookieConsent';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already provided consent
    const consentStatus = getConsentStatus();
    if (consentStatus === null) {
      // If no consent has been given yet, show the banner
      setShowConsent(true);
    }
  }, []);

  const acceptAll = (): void => {
    setConsentStatus('all');
    setShowConsent(false);
  };

  const declineAll = (): void => {
    setConsentStatus('none');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <CookieBanner
      showConsent={showConsent}
      accept={
        <Button variant="primary" onClick={acceptAll}>
          Accept all cookies
        </Button>
      }
      reject={
        <Button variant="primary" onClick={declineAll}>
          Necessary cookies only
        </Button>
      }
    >
      <>
        <Heading as="h3">A notice about cookies</Heading>
        <Paragraph className="my-4">
          This website uses cookies to collect information about how you use
          this site. This information is used to make the website work as well
          as possible. More details available in our{' '}
          <Link href="/cookies-policy/">cookie and privacy policies</Link>.
        </Paragraph>
      </>
    </CookieBanner>
  );
}
