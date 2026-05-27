/**
 * i18next initialization (T013 / research §3).
 * Romanian is the default and the fallback. Resources are bundled per section as
 * JSON namespaces under locales/ro/. Adding a language means adding a sibling
 * folder and registering the locale in locales.ts (then a native-speaker review
 * flips reviewedByNativeSpeaker to true — FR-054).
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LOCALE } from './locales';

import roCommon from './locales/ro/common.json';
import roHero from './locales/ro/hero.json';
import roHowItWorks from './locales/ro/howItWorks.json';
import roWho from './locales/ro/who.json';
import roContract from './locales/ro/contract.json';
import roFooter from './locales/ro/footer.json';
import roWhy from './locales/ro/why.json';
import roReport from './locales/ro/report.json';
import roFaq from './locales/ro/faq.json';
import roOfframp from './locales/ro/offramp.json';
import roUpload from './locales/ro/upload.json';

export const NAMESPACES = [
  'common',
  'hero',
  'howItWorks',
  'who',
  'contract',
  'footer',
  'why',
  'report',
  'faq',
  'offramp',
  'upload',
] as const;

export const resources = {
  ro: {
    common: roCommon,
    hero: roHero,
    howItWorks: roHowItWorks,
    who: roWho,
    contract: roContract,
    footer: roFooter,
    why: roWhy,
    report: roReport,
    faq: roFaq,
    offramp: roOfframp,
    upload: roUpload,
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  ns: NAMESPACES,
  defaultNS: 'common',
  interpolation: { escapeValue: false }, // React already escapes
  returnNull: false,
});

export default i18n;
