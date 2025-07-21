'use client';
import React from 'react';
import { ButtonProps } from '../button/types.js';
import { Container } from '../container/container.js';
import { LinkProps } from '../link/link.js';

export type CookieBannerProps = {
  showConsent: boolean;
  children: React.ReactNode;
  accept: React.ReactElement<ButtonProps>;
  reject: React.ReactElement<ButtonProps>;
  cookieLink?: React.ReactElement<LinkProps>;
  dataTestid?: string;
};

export const CookieBanner = ({
  showConsent = true,
  children,
  accept,
  reject,
  cookieLink,
  dataTestid,
}: CookieBannerProps) => {
  return (
    <>
      {showConsent && (
        <div
          className="gi-cookie-banner-container"
          role="dialog"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-description"
          data-testid={dataTestid}
        >
          <div className="gi-py-5">
            <Container>
              <div id="cookie-banner-description">{children}</div>
              <div className="gi-cookie-banner-buttons">
                {accept && accept}
                {reject && reject}
                {cookieLink && cookieLink}
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};
