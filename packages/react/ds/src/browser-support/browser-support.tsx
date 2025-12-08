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
    'microsoft edge': '>=136',
    opera: '>=109',
    'opera gx': '>=109',
    brave: '>=109',
    vivaldi: '>=109',
    'yandex browser': '>=109',
    yandex: '>=109',
    arc: '>=109',
  },
  mobile: {
    chrome: '>=138',
    firefox: '>=140',
    safari: '>=18',
    'mobile safari': '>=18',
    'samsung internet for android': '>=27',
    'microsoft edge': '>=138',
    opera: '>=138',
    'opera gx': '>=138',
    brave: '>=138',
    vivaldi: '>=138',
    'yandex browser': '>=138',
    yandex: '>=138',
    duckduckgo: '>=138',
    kiwi: '>=138',
    'uc browser': '>=138',
    ucbrowser: '>=138',
    qqbrowser: '>=138',
    qq: '>=138',
    baidu: '>=138',
    'coc coc': '>=138',
    coccoc: '>=138',
  },
  tablet: {
    chrome: '>=138',
    firefox: '>=140',
    safari: '>=18',
    'mobile safari': '>=18',
    'samsung internet for android': '>=27',
    'microsoft edge': '>=138',
    opera: '>=138',
    'opera gx': '>=138',
    brave: '>=138',
    vivaldi: '>=138',
    'yandex browser': '>=138',
    yandex: '>=138',
    duckduckgo: '>=138',
    kiwi: '>=138',
    'uc browser': '>=138',
    ucbrowser: '>=138',
    qqbrowser: '>=138',
    qq: '>=138',
    baidu: '>=138',
    'coc coc': '>=138',
    coccoc: '>=138',
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
