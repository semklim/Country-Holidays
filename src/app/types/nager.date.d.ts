interface APIVersion {
  name: string | null;
  version: string | null;
}

type AvailableCountries = Array<Country>;

type Country = {
  countryCode: string;
  name: string;
};

interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Border[] | null;
}

type Border = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Border[] | null;
};

type LongWeekend = Array<Weekend>;

type Weekend = {
  startDate: string;
  endDate: string;
  dayCount: number;
  needBridgeDay: boolean;
};

type PublicHolidays = Array<Holiday>;

type Holiday = {
  /** The date */
  date: string;
  /** Local name */
  localName: string;
  /** English name */
  name: string;
  /** ISO 3166-1 alpha-2 */
  countryCode: string;
  /** Is this public holiday every year on the same date */
  fixed: boolean;
  /** Is this public holiday in every county (federal state) */
  global: boolean;
  /** ISO-3166-2 - Federal states */
  counties: string[] | null;
  /** The launch year of the public holiday */
  launchYear: number | null;
  /** A list of types the public holiday it is valid */
  types: HolidayTypes[] | null;
};

// export enum HolidayTypes {
//   /** Public */
//   /** Bank (Bank holiday, banks and offices are closed) */
//   /** School (School holiday, schools are closed) */
//   /** Authorities (Authorities are closed) */
//   /** Optional (Majority of people take a day off) */
//   /** Observance (Optional festivity, no paid day off) */
// }

/**
- Public
- Bank (Bank holiday, banks and offices are closed)
- School (School holiday, schools are closed)
- Authorities (Authorities are closed)
- Optional (Majority of people take a day off)
- Observance (Optional festivity, no paid day off)
 */
type HolidayTypes = 'Public' | 'Bank' | 'School' | 'Authorities' | 'Optional' | 'Observance';

/**The upcoming public holidays for the next 365 days for the given country */
type NextPublicHolidays = PublicHolidays;

/**The upcoming public holidays for the next 365 days for the given country */
type NextPublicHolidaysWorldwide = PublicHolidays;
