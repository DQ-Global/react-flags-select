export type Countries = Record<string, string>;
export type CountryCodes = Array<string>;
export type CustomLabels = Record<string, string | CustomLabel>;
export type CustomLabel = { primary: string; secondary?: string };
export type OnSelect = (countryCode: string) => void;

/**
 * List of ISO2 country codes to show at the top of the dropdown
 */
export type PreferredCountries = string[];
