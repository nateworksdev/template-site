import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import {
  Hero,
  ServicesGrid,
  FeaturedService,
  Gallery,
  Reviews,
  Process,
  FAQ,
  CTA,
  InstantEstimator,
} from "@/components/sections";
import { siteConfig } from "@/config/site.config";
import type { HomeSection } from "@/lib/types/config";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        {siteConfig.pages.home.sections.map((section, index) => (
          <SectionRenderer key={index} section={section} />
        ))}
      </main>
      <Footer />
    </>
  );
}

function SectionRenderer({ section }: { section: HomeSection }) {
  switch (section.type) {
    case "hero":
      return <Hero variant={section.variant} data={section.data} />;
    case "services":
      return <ServicesGrid variant={section.variant} data={section.data} />;
    case "featured-service":
      return <FeaturedService data={section.data} />;
    case "gallery":
      return <Gallery variant={section.variant} data={section.data} />;
    case "reviews":
      return <Reviews variant={section.variant} data={section.data} />;
    case "process":
      return <Process data={section.data} />;
    case "faq":
      return <FAQ data={section.data} />;
    case "cta":
      return <CTA data={section.data} />;
    case "instant-estimator":
      return <InstantEstimator data={section.data} />;
    default:
      return null;
  }
}
