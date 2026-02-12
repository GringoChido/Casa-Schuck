/**
 * Cloudbeds Deep Link Generator
 *
 * Constructs reservation URLs for the Cloudbeds booking engine.
 * Uses environment variable for the Property ID (to be provided later).
 */

const CLOUDBEDS_BASE = 'https://hotels.cloudbeds.com/reservation';

interface DeepLinkParams {
  checkin?: string;   // YYYY-MM-DD
  checkout?: string;  // YYYY-MM-DD
  roomTypeId?: string;
  adults?: number;
  children?: number;
  currency?: string;
  language?: string;
}

export function getPropertyId(): string {
  return process.env.NEXT_PUBLIC_CLOUDBEDS_PROPERTY_ID || 'PROPERTY_ID_PLACEHOLDER';
}

export function buildDeepLink(params: DeepLinkParams = {}): string {
  const propertyId = getPropertyId();
  const url = new URL(`${CLOUDBEDS_BASE}/${propertyId}`);

  if (params.checkin) url.searchParams.set('checkin', params.checkin);
  if (params.checkout) url.searchParams.set('checkout', params.checkout);
  if (params.adults) url.searchParams.set('adults', String(params.adults));
  if (params.children) url.searchParams.set('children', String(params.children));
  if (params.currency) url.searchParams.set('currency', params.currency);
  if (params.language) url.searchParams.set('language', params.language);

  let href = url.toString();

  if (params.roomTypeId) {
    href += `#room_type=${params.roomTypeId}`;
  }

  return href;
}

/**
 * Format a date as YYYY-MM-DD for Cloudbeds
 */
export function formatDateForCloudbeds(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Get default check-in (today) and check-out (tomorrow) dates
 */
export function getDefaultDates(): { checkin: string; checkout: string } {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return {
    checkin: formatDateForCloudbeds(today),
    checkout: formatDateForCloudbeds(tomorrow),
  };
}
