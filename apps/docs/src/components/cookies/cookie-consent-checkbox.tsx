'use client';
import { InputCheckbox } from '@ogcio/design-system-react';
import {
  CookieCategory,
  isConsentGiven,
  setConsentStatus,
} from '../../utils/cookieConsent';

export default function CookieConsentCheckbox({
  category,
}: {
  category: CookieCategory;
}) {
  const checked = isConsentGiven(category);

  return (
    <InputCheckbox
      defaultChecked={checked}
      onChange={(e) => {
        const status = e.target.checked ? 'all' : 'none';
        setConsentStatus(status);
      }}
      label="Allow"
    />
  );
}
