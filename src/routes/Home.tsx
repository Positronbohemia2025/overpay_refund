import { Hero } from '../sections/Hero/Hero';
import { WhyThisExists } from '../sections/WhyThisExists/WhyThisExists';
import { HowItWorks } from '../sections/HowItWorks/HowItWorks';
import { WhoWeAreFunding } from '../sections/WhoWeAreFunding/WhoWeAreFunding';
import { ContractHandling } from '../sections/ContractHandling/ContractHandling';
import { ReportAndAfter } from '../sections/ReportAndAfter/ReportAndAfter';
import { Faq } from '../sections/Faq/Faq';
import { OffRamp } from '../sections/OffRamp/OffRamp';
import { SiteFooter } from '../sections/SiteFooter/SiteFooter';

/**
 * The landing page. Sections render in the canonical order required by FR-001:
 * Hero → WhyThisExists → HowItWorks → WhoWeAreFunding → ContractHandling →
 * ReportAndAfter → Faq → OffRamp → footer. The off-ramp (FR-053) is an
 * alternative for visitors not ready to upload — placed after Faq, before footer.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <WhyThisExists />
      <HowItWorks />
      <WhoWeAreFunding />
      <ContractHandling />
      <ReportAndAfter />
      <Faq />
      <OffRamp />
      <SiteFooter />
    </>
  );
}
