import { Header } from '../sections/Header/Header';
import { Hero } from '../sections/Hero/Hero';
import { FeatureCards } from '../sections/FeatureCards/FeatureCards';
import { Estimator } from '../sections/Estimator/Estimator';
import { SiteFooter } from '../sections/SiteFooter/SiteFooter';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <FeatureCards />
      <Estimator />
      <SiteFooter />
    </>
  );
}
