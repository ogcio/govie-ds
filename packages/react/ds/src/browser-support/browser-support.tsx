'use client';
import Bowser from 'bowser';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { Alert } from '../alert/alert.js';
import { Link } from '../link/link.js';

export type BrowserSupportProps = {
  onDismiss?: () => void;
  forceShow?: boolean;
  className?: string;
};

const POLICY = {
  desktop: {
    chrome: '>=109',
    firefox: '>=128',
    safari: '>=18',
    edge: '>=136',
    chromium: '>=109',
    opera: '>=109',
    vivaldi: '>=109',
    yandex: '>=109',
    uc: '>=109',
    qq: '>=109',
  },

  mobile: {
    chrome: '>=138',
    firefox: '>=140',
    safari: '>=18',
    'mobile safari': '>=18',
    samsung_internet: '>=27',
    edge: '>=138',
    chromium: '>=138',
    opera: '>=138',
    vivaldi: '>=138',
    yandex: '>=138',
    uc: '>=138',
    qq: '>=138',
  },
  tablet: {
    chrome: '>=138',
    firefox: '>=140',
    safari: '>=18',
    'mobile safari': '>=18',
    samsung_internet: '>=27',
    edge: '>=138',
    chromium: '>=138',
    opera: '>=138',
    vivaldi: '>=138',
    yandex: '>=138',
    uc: '>=138',
    qq: '>=138',
  },
} as const;

export const BrowserSupport = ({
  onDismiss,
  forceShow = false,
  className,
  ...props
}: BrowserSupportProps) => {
  const { t } = useTranslation();
  const bowser = Bowser.getParser(navigator.userAgent);
  const isSupported = bowser.satisfies(POLICY);

  if (isSupported && !forceShow) {
    return null;
  }

  const handleDismiss = () => {
    onDismiss?.();
  };

  return (
    <Alert
      variant="warning"
      title={t('Limited browser support detected')}
      dismissible
      onClose={handleDismiss}
      className={clsx('gi-min-w-full', className)}
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
