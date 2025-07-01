import en from '@/assets/locales/en.json';
import sv from '@/assets/locales/sv.json';

type Locale = 'en' | 'sv';

type TranslationObject = {
  [key: string]: TranslationObject | string;
};

const strings = { en, sv };

/**
 * Get the translated string for a given key in the current locale
 * @param key Keypath in dot notation, e.g. `contact.emailAddress`
 * @returns The translated string, or the key if no translation was found
 */
export default function t(key: string): string {
  const locale = (import.meta.env.PUBLIC_LOCALE as Locale) || 'en';
  const keypath = key.split('.');
  let result: TranslationObject | string = strings[locale];

  // Drill down the locale object to find the translated string
  for (const subkey of keypath) {
    if (typeof result !== 'object') {
      console.warn(`Missing '${locale}' subkey '${subkey}'`);
      return key;
    }
    result = result[subkey];
  }

  if (typeof result !== 'string') {
    console.warn(`No '${locale}' translation of '${key}'`);
    return key;
  }

  return result;
}
