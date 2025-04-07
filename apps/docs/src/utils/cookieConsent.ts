export type ConsentStatus = 'all' | 'essential' | 'none' | null;
export type CookieCategory = 'essential' | 'analytics' | 'marketing';

export interface ConsentChangeEvent extends CustomEvent {
  detail: {
    status: ConsentStatus;
  };
}

// Function to get consent from cookies
export function getConsentStatus(): ConsentStatus {
  // For SSR, check if window exists
  if (typeof window === 'undefined') return null;

  // First check localStorage
  const localStorageConsent = localStorage.getItem(
    'cookieConsent',
  ) as ConsentStatus;
  if (localStorageConsent) {
    return localStorageConsent;
  }

  // Then check cookies
  const match = document.cookie.match(/(^|;)\s*cookieConsent=([^;]+)/);
  return match ? (match[2] as ConsentStatus) : null;
}

// Function to set consent in both cookie and localStorage
export function setConsentStatus(status: ConsentStatus): void {
  // Ensure status is one of the allowed values
  if (status !== null && !['all', 'essential', 'none'].includes(status)) {
    throw new Error('Invalid consent status');
  }

  // Set in localStorage for easy JS access
  localStorage.setItem('cookieConsent', status as string);

  // Set in cookie for server-side access
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `cookieConsent=${status}; max-age=${oneYear}; path=/; SameSite=Strict`;

  // Dispatch a custom event so other components can react
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('consentStatusChanged', {
        detail: { status },
      }),
    );
  }
}

// Function to check if specific cookie category is allowed
export function isConsentGiven(category: CookieCategory): boolean {
  const status = getConsentStatus();

  switch (category) {
    case 'essential':
      // Essential cookies are always allowed
      return true;
    case 'analytics':
      // Analytics cookies are only allowed if consent is 'all'
      return status === 'all';
    case 'marketing':
      // Marketing cookies are only allowed if consent is 'all'
      return status === 'all';
    default:
      return false;
  }
}
