'use client';
import React, { useState, cloneElement } from 'react';
import { ButtonProps } from '../button/types.js';
import { Container } from '../container/container.js';
import { translate as t } from '../i18n/utility.js';
import { LinkProps } from '../link/link.js';

export type CookieBannerProps = {
  children: React.ReactNode;
  accept: {
    children: React.ReactNode;
    triggerButton: React.ReactElement<ButtonProps>;
  };
  reject: {
    children: React.ReactNode;
    triggerButton: React.ReactElement<ButtonProps>;
  };
  dismissButton?: React.ReactElement<ButtonProps>;
  cookieLink?: React.ReactElement<LinkProps>;
  dataTestid?: string;
};

export const CookieBanner = ({
  children,
  accept,
  reject,
  cookieLink,
  dismissButton,
  dataTestid,
}: CookieBannerProps) => {
  const [status, setStatus] = useState<null | boolean | 'dismiss'>(null);
  const handleOpenBanner = () => setStatus(true);
  const handleCloseBanner = () => setStatus(false);
  const handleDismissBanner = () => setStatus('dismiss');

  return (
    <>
      {status === 'dismiss' ? null : (
        <div
          className="gi-cookie-banner-container"
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-description"
          data-testid={dataTestid}
        >
          <div className="gi-py-5">
            <Container>
              {/* default container of cookie banner */}
              {status === null && (
                <>
                  <div id="cookie-banner-description">{children}</div>
                  <div className="gi-cookie-banner-buttons">
                    {cloneElement(accept.triggerButton, {
                      'aria-label': t('cookieBanner.acceptCookies', {
                        defaultValue: 'Accept cookies',
                      }),
                      onClick: handleOpenBanner,
                    })}
                    {cloneElement(reject.triggerButton, {
                      'aria-label': t('cookieBanner.rejectCookies', {
                        defaultValue: 'Reject cookies',
                      }),
                      onClick: handleCloseBanner,
                    })}
                    {cookieLink && cookieLink}
                  </div>
                </>
              )}

              {/* accepted container of cookie banner */}
              {status === true && (
                <>
                  <div id="cookie-banner-description">{accept.children}</div>
                  {dismissButton && (
                    <>
                      {cloneElement(dismissButton, {
                        'aria-label': t('cookieBanner.dismissCookieBanner', {
                          defaultValue: 'Dismiss Cookie Banner',
                        }),
                        onClick: handleDismissBanner,
                      })}
                    </>
                  )}
                </>
              )}

              {/* rejected container of cookie banner */}
              {status === false && (
                <>
                  <div id="cookie-banner-description">{reject.children}</div>
                  {dismissButton && (
                    <>
                      {cloneElement(dismissButton, {
                        'aria-label': t('cookieBanner.dismissCookieBanner', {
                          defaultValue: 'Dismiss Cookie Banner',
                        }),
                        onClick: handleDismissBanner,
                      })}
                    </>
                  )}
                </>
              )}
            </Container>
          </div>
        </div>
      )}
    </>
  );
};
