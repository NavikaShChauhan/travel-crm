/**
 * Master Destinations Database
 * Contains countries, cities, and popular regions for CRM dropdowns & filters.
 */

export const DESTINATIONS_DATABASE = [
  { country: 'India', city: 'Shimla', label: 'Shimla, Himachal Pradesh (India)' },
  { country: 'India', city: 'Manali', label: 'Manali, Himachal Pradesh (India)' },
  { country: 'India', city: 'Dharamshala', label: 'Dharamshala, Himachal Pradesh (India)' },
  { country: 'India', city: 'Srinagar', label: 'Srinagar, Jammu & Kashmir (India)' },
  { country: 'India', city: 'Gulmarg', label: 'Gulmarg, Jammu & Kashmir (India)' },
  { country: 'India', city: 'Pahalgam', label: 'Pahalgam, Jammu & Kashmir (India)' },
  { country: 'India', city: 'Kedarnath', label: 'Kedarnath, Uttarakhand (India)' },
  { country: 'India', city: 'Haridwar', label: 'Haridwar, Uttarakhand (India)' },
  { country: 'India', city: 'Goa', label: 'Goa (India)' },
  { country: 'India', city: 'Jaipur', label: 'Jaipur, Rajasthan (India)' },
  { country: 'India', city: 'Udaipur', label: 'Udaipur, Rajasthan (India)' },
  { country: 'Maldives', city: 'Male', label: 'Male Atoll (Maldives)' },
  { country: 'Maldives', city: 'Maafushi', label: 'Maafushi Island (Maldives)' },
  { country: 'Indonesia', city: 'Bali', label: 'Bali (Indonesia)' },
  { country: 'Indonesia', city: 'Ubud', label: 'Ubud, Bali (Indonesia)' },
  { country: 'Indonesia', city: 'Jakarta', label: 'Jakarta (Indonesia)' },
  { country: 'Switzerland', city: 'Interlaken', label: 'Interlaken (Switzerland)' },
  { country: 'Switzerland', city: 'Zurich', label: 'Zurich (Switzerland)' },
  { country: 'Switzerland', city: 'Lucerne', label: 'Lucerne (Switzerland)' },
  { country: 'UAE', city: 'Dubai', label: 'Dubai (UAE)' },
  { country: 'UAE', city: 'Abu Dhabi', label: 'Abu Dhabi (UAE)' },
  { country: 'Thailand', city: 'Phuket', label: 'Phuket (Thailand)' },
  { country: 'Thailand', city: 'Bangkok', label: 'Bangkok (Thailand)' },
  { country: 'Singapore', city: 'Singapore', label: 'Singapore City (Singapore)' },
];

export const getCountries = () => {
  return Array.from(new Set(DESTINATIONS_DATABASE.map((d) => d.country))).sort();
};

export const getCitiesByCountry = (country) => {
  if (!country || country === 'All') {
    return Array.from(new Set(DESTINATIONS_DATABASE.map((d) => d.city))).sort();
  }
  return DESTINATIONS_DATABASE
    .filter((d) => d.country.toLowerCase() === country.toLowerCase())
    .map((d) => d.city)
    .sort();
};

export const getDestinationOptions = () => {
  return DESTINATIONS_DATABASE.map((d) => ({
    value: `${d.city}, ${d.country}`,
    label: d.label,
    country: d.country,
    city: d.city,
  }));
};
