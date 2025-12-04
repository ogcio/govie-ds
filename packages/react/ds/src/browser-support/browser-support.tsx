'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from '../alert/alert.js';
import { Link } from '../link/link.js';
import { getBrowserInfo, isBrowserSupported } from './browser-detection.js';
import type {
  BrowserInfo,
  BrowserSupportProps,
  SupportPolicy,
} from './types.js';

const SUPPORT_POLICY: SupportPolicy = { chromium: 109, gecko: 128, webkit: 16 };

export const BrowserSupport = ({
  onDismiss,
  forceShow = false,
  className,
  ...props
}: BrowserSupportProps) => {
  const { t } = useTranslation();
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
      return;
    }

    getBrowserInfo()
      .then((info) => {
        setBrowserInfo(info as BrowserInfo);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('[BrowserSupport] Failed to detect browser:', error);
        setIsLoading(false);
      });
  }, [isLoading]);

  if (isLoading || !browserInfo || isDismissed) {
    return null;
  }

  const supported = isBrowserSupported(browserInfo, SUPPORT_POLICY);

  if (supported && !forceShow) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <Alert
      variant="warning"
      title={t('Limited browser support detected')}
      dismissible
      onClose={handleDismiss}
      className={clsx('!gi-max-w-full', className)}
      {...props}
    >
      {t(
        'This browser is not officially supported. Please update or switch to a supported browser for the best experience.',
      )}
      <Link
        href="https://ds.services.gov.ie/get-started/developers/supported-browsers/"
        target="_blank"
        rel="noreferrer"
      >
        {t('View supported browsers')}
      </Link>
    </Alert>
  );
};
