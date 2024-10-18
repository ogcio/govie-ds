'use client';
import React, { useState, cloneElement } from 'react';
import { ButtonProps } from '../button/types.js';
import { Container } from '../container/container.js';
import { LinkProps } from '../link/link.js';

type CookieBannerProps = {
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
};

export const CookieBanner = ({
  children,
  accept,
  reject,
  cookieLink,
  dismissButton,
}: CookieBannerProps) => {
  const [status, setStatus] = useState<null | boolean | 'dismiss'>(null);
  const handleOpenBanner = () => setStatus(true);
  const handleCloseBanner = () => setStatus(false);
  const handleDismissBanner = () => setStatus('dismiss');
  return (
    <>
      {status === 'dismiss' ? null : (
        <div className="gi-cookie-banner-container">
          <Container>
            {/* default container of cookie banner   */}
            {status === null && (
              <>
                {children}
                <div className="gi-cookie-banner-buttons">
                  {cloneElement(accept.triggerButton, {
                    onClick: handleOpenBanner,
                  })}
                  {cloneElement(reject.triggerButton, {
                    onClick: handleCloseBanner,
                  })}
                  {cookieLink && cookieLink}
                </div>
              </>
            )}

            {/* accepted container of cookie banner */}
            {status === true && (
              <>
                {accept.children}
                {dismissButton && (
                  <>
                    {cloneElement(dismissButton, {
                      onClick: handleDismissBanner,
                    })}
                  </>
                )}
              </>
            )}

            {/* rejected container of cookie banner */}
            {status === false && (
              <>
                {reject.children}
                {dismissButton && (
                  <>
                    {cloneElement(dismissButton, {
                      onClick: handleDismissBanner,
                    })}
                  </>
                )}
              </>
            )}
          </Container>
        </div>
      )}
    </>
  );
};
