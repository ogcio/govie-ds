'use client';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from '../alert/alert.js';
import { Link } from '../link/link.js';
import {
  getBrowserDisplayName,
  getBrowserInfo,
  isBrowserSupported,
} from './browser-detection.js';
import { useBrowserSupportContext } from './browser-support-context.js';
import type {
  BrowserInfo,
  BrowserSupportProps,
  SupportPolicy,
} from './types.js';

const SUPPORT_POLICY: SupportPolicy = {
  desktop: { chromium: 109, gecko: 128, webkit: 16 },
  mobile: { chromium: 114, gecko: 128, webkit: 16 },
};

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
  const { owner, claim, release } = useBrowserSupportContext();
  const tokenRef = useRef<symbol>(Symbol('browser-support-instance'));
  const token = tokenRef.current;

  useEffect(() => {
    claim(token);
    return () => {
      release(token);
    };
  }, [claim, release, token]);

  const isOwner = owner === token;

  useEffect(() => {
    if (!isOwner && isLoading) {
      setIsLoading(false);
      return;
    }

    const ac = new AbortController();

    getBrowserInfo()
      .then((info) => {
        if (ac.signal.aborted) {
          return;
        }
        setBrowserInfo(info as BrowserInfo);
        setIsLoading(false);
      })
      .catch((error) => {
        if (ac.signal.aborted) {
          return;
        }
        console.error('[BrowserSupport] Failed to detect browser:', error);
        setIsLoading(false);
      });

    return () => {
      ac.abort();
    };
  }, [isOwner, isLoading]);

  if (!isOwner || isLoading || browserInfo === null || isDismissed) {
    return null;
  }

  const supported = isBrowserSupported(browserInfo, SUPPORT_POLICY);

  if (supported && !forceShow) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);

    if (typeof onDismiss === 'function') {
      onDismiss();
    }

    release(token);
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
        {
          name: getBrowserDisplayName(browserInfo),
          version: browserInfo.version > 0 ? ` ${browserInfo.version}` : '',
        },
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
