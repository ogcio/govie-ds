'use client';
import Bowser from 'bowser';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from '../alert/alert.js';
import { BROWSER_POLICY, DS_HOST } from '../constants.js';
import { Link } from '../link/link.js';

export type BrowserSupportProps = {
  onClose?: () => void;
  className?: string;
} & ComponentPropsWithoutRef<'div'>;

export const BrowserSupport = ({
  className,
  ...props
}: BrowserSupportProps) => {
  const { t } = useTranslation();

  const isSupported = useMemo(
    () => Bowser.getParser(navigator.userAgent).satisfies(BROWSER_POLICY),
    [],
  );

  if (isSupported) {
    return null;
  }

  return (
    <Alert
      {...props}
      variant="warning"
      title={t('Limited browser support detected')}
      dismissible
      className={clsx('gi-min-w-full', className)}
    >
      {t(
        'This browser is not officially supported. Please update or switch to a supported browser for the best experience.',
      )}
      <Link
        href={`${DS_HOST}/get-started/developers/supported-browsers/`}
        target="_blank"
        rel="noreferrer"
      >
        {t('View supported browsers')}
      </Link>
    </Alert>
  );
};
