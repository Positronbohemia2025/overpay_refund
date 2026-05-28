/**
 * Entry point for the static (no-JS) build. The full React app keeps its
 * normal entry at src/main.tsx; this one renders only the JS-free subset of
 * the home page (Hero, FeatureCards, SiteFooter) and is consumed by
 * scripts/build-static.mjs via Vite SSR build.
 */
import './i18n';
import './styles/tokens.css';
import './styles/reset.css';
import './styles/fonts.css';
import './styles/global.css';

import { Hero } from './sections/Hero/Hero';
import { FeatureCards } from './sections/FeatureCards/FeatureCards';
import { SiteFooter } from './sections/SiteFooter/SiteFooter';

export default function StaticHome() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <FeatureCards />
      </main>
      <SiteFooter />
    </>
  );
}
