import { Header } from '../sections/Header/Header';
import { Hero } from '../sections/Hero/Hero';
import { FeatureCards } from '../sections/FeatureCards/FeatureCards';
import { Estimator } from '../sections/Estimator/Estimator';
import { UploadSection } from '../sections/UploadSection/UploadSection';
import { SiteFooter } from '../sections/SiteFooter/SiteFooter';

/**
 * The landing page. Sections render in the order shown in the reference design:
 * Header → Hero → FeatureCards → Estimator → UploadSection → Footer.
 */
export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FeatureCards />
      <Estimator />
      <UploadSection />
      <SiteFooter />
    </>
  );
}
