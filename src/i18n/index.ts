/**
 * i18next initialization.
 * Romanian is the default and the fallback. Resources are bundled per section as
 * JSON namespaces under locales/ro/. Adding a language means adding a sibling
 * folder and registering the locale in locales.ts (then a native-speaker review
 * flips reviewedByNativeSpeaker to true — FR-054).
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LOCALE } from './locales';

import roCommon from './locales/ro/common.json';
import roNav from './locales/ro/nav.json';
import roHero from './locales/ro/hero.json';
import roFeatures from './locales/ro/features.json';
import roEstimator from './locales/ro/estimator.json';
import roUpload from './locales/ro/upload.json';
import roFooter from './locales/ro/footer.json';

export const NAMESPACES = [
  'common',
  'nav',
  'hero',
  'features',
  'estimator',
  'upload',
  'footer',
] as const;

export const resources = {
  ro: {
    common: roCommon,
    nav: roNav,
    hero: roHero,
    features: roFeatures,
    estimator: roEstimator,
    upload: roUpload,
    footer: roFooter,
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  ns: NAMESPACES,
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
