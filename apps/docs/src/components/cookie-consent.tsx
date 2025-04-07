'use client';
import {
  Button,
  Container,
  CookieBanner,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerWrapper,
  Heading,
  Link,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalWrapper,
  Paragraph,
  Stack,
} from '@govie-ds/react';
import { useEffect, useState } from 'react';
import { getConsentStatus, setConsentStatus } from '../utils/cookieConsent';

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

  const acceptEssential = (): void => {
    setConsentStatus('essential');
    setShowConsent(false);
  };

  const declineAll = (): void => {
    setConsentStatus('none');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    // <DrawerWrapper isOpen={showConsent} onClose={declineAll} position="bottom">
    //   <DrawerBody>
    //     <div className="mx-auto px-10">
    //       <Heading as="h3">Cookie Consent</Heading>

    //       <div className="gi-mt-4">
    //         We use some essential cookies to make this service work. We’d also
    //         like to use analytics cookies so we can understand how you use the
    //         service and make improvements.
    //       </div>

    //       <Stack
    //         direction="row"
    //         itemsAlignment="end"
    //         itemsDistribution="end"
    //         gap={4}
    //         className="gi-mt-4"
    //       >
    //         <Button key="decline" variant="primary" onClick={declineAll}>
    //           Reject
    //         </Button>
    //         <Button key="accept" variant="primary" onClick={acceptAll}>
    //           Accept
    //         </Button>
    //       </Stack>
    //     </div>
    //   </DrawerBody>
    // </DrawerWrapper>
    <ModalWrapper isOpen={showConsent} onClose={declineAll}>
      <ModalTitle key="title">Cookie Consent</ModalTitle>
      <ModalBody key="body">
        <Paragraph>
          We use some essential cookies to make this service work. We’d also
          like to use analytics cookies so we can understand how you use the
          service and make improvements.
        </Paragraph>
      </ModalBody>
      <ModalFooter key="footer">
        <Button key="decline" variant="primary" onClick={declineAll}>
          Reject
        </Button>
        <Button key="accept" variant="primary" onClick={acceptAll}>
          Accept
        </Button>
      </ModalFooter>
    </ModalWrapper>
  );
}
