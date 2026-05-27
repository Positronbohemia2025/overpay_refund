import { Hero } from '../sections/Hero/Hero';
import { HowItWorks } from '../sections/HowItWorks/HowItWorks';
import { WhoWeAreFunding } from '../sections/WhoWeAreFunding/WhoWeAreFunding';
import { ContractHandling } from '../sections/ContractHandling/ContractHandling';
import { SiteFooter } from '../sections/SiteFooter/SiteFooter';

/**
 * The landing page. Sections render in the canonical order required by FR-001.
 * US2 (§2 WhyThisExists, §6 ReportAndAfter) and US3 (§7 Faq, off-ramp) are
 * inserted at their canonical positions in T045 and T054.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <WhoWeAreFunding />
      <ContractHandling />
      <SiteFooter />
    </>
  );
}
