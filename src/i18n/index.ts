/**
 * i18next initialization. Romanian is the default and the fallback.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { DEFAULT_LOCALE } from './locales';

import roCommon from './locales/ro/common.json';
import roNav from './locales/ro/nav.json';
import roHero from './locales/ro/hero.json';
import roFeatures from './locales/ro/features.json';
import roEstimator from './locales/ro/estimator.json';
import roFooter from './locales/ro/footer.json';

export const NAMESPACES = [
  'common',
  'nav',
  'hero',
  'features',
  'estimator',
  'footer',
] as const;

export const resources = {
  ro: {
    common: roCommon,
    nav: roNav,
    hero: roHero,
    features: roFeatures,
    estimator: roEstimator,
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
