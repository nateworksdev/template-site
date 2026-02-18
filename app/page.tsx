"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Star, Check, DollarSign } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Hero,
  ImageBand,
} from "@/components/sections";
import { siteConfig } from "@/config/site.config";
import type { 
  HomeSection,
  ServicesGridData, 
  FeaturedServiceData, 
  GalleryData, 
  ReviewsData, 
  ProcessData, 
  FAQData, 
  CTAData,
  InstantEstimatorData 
} from "@/lib/types/config";

// Define surface pattern for alternating backgrounds
const sectionSurfaces: Record<string, "default" | "surface" | "surface2" | "surface3" | "brandBand"> = {
  hero: "default", // Hero handles its own background
  services: "surface",
  "instant-estimator": "surface2",
  "featured-service": "default",
  process: "surface",
  reviews: "surface2",
  faq: "default",
  cta: "brandBand",
  gallery: "surface",
  "image-band": "default", // ImageBand handles its own background
};

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
  const variant = sectionSurfaces[section.type] || "default";
  
  // Hero and ImageBand handle their own full-bleed backgrounds
  if (section.type === "hero") {
    return <Hero variant={section.variant} data={section.data} />;
  }
  
  if (section.type === "image-band") {
    return <ImageBand data={section.data} />;
  }

  // CTA uses brandBand styling built into the Section
  if (section.type === "cta") {
    return (
      <Section variant="brandBand" padding="lg">
        <CTAContent data={section.data} />
      </Section>
    );
  }

  // All other sections use the Section wrapper
  return (
    <Section variant={variant} padding="lg">
      {section.type === "services" && (
        <ServicesGridContent data={section.data} />
      )}
      {section.type === "featured-service" && (
        <FeaturedServiceContent data={section.data} />
      )}
      {section.type === "gallery" && (
        <GalleryContent data={section.data} />
      )}
      {section.type === "reviews" && (
        <ReviewsContent data={section.data} />
      )}
      {section.type === "process" && (
        <ProcessContent data={section.data} />
      )}
      {section.type === "faq" && (
        <FAQContent data={section.data} />
      )}
      {section.type === "instant-estimator" && (
        <InstantEstimatorContent data={section.data} />
      )}
    </Section>
  );
}

// Content components that render without their own section wrapper

function ServicesGridContent({ data }: { data: ServicesGridData }) {
  const services = data.showAll
    ? siteConfig.services
    : siteConfig.services.filter((s) => s.featured);

  return (
    <>
      <div className="mb-14 text-center">
        <h2 className="mb-4 text-balance">{data.heading}</h2>
        {data.subheading && (
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
            {data.subheading}
          </p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = service.icon
            ? (LucideIcons[service.icon as keyof typeof LucideIcons] as React.FC<{ className?: string }>)
            : null;

          return (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
            >
              {Icon && (
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
              )}
              <h3 className="mb-2 text-xl font-semibold">{service.name}</h3>
              <p className="mb-4 text-muted-foreground leading-relaxed">{service.description}</p>
              <div className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

function FeaturedServiceContent({ data }: { data: FeaturedServiceData }) {
  const service = siteConfig.services.find((s) => s.id === data.serviceId);
  if (!service) return null;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      {service.image && (
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
          <Image src={service.image} alt={service.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
      )}
      <div className="max-w-lg">
        <h2 className="mb-5 text-balance">{data.heading || service.name}</h2>
        <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
          {data.description || service.longDescription || service.description}
        </p>
        {data.cta && (
          <Button asChild size="lg">
            <Link href={data.cta.href}>{data.cta.text}</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

function GalleryContent({ data }: { data: GalleryData }) {
  return (
    <>
      <h2 className="mb-4 text-center text-balance">{data.heading}</h2>
      {data.subheading && (
        <p className="mx-auto mb-14 max-w-2xl text-center text-lg text-muted-foreground text-balance">
          {data.subheading}
        </p>
      )}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.images.map((image, index) => (
          <div key={index} className="relative aspect-square overflow-hidden rounded-xl">
            <Image src={image.src} alt={image.alt} fill className="object-cover transition-transform duration-300 hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" />
          </div>
        ))}
      </div>
    </>
  );
}

function ReviewsContent({ data }: { data: ReviewsData }) {
  return (
    <>
      <h2 className="mb-14 text-center text-balance">{data.heading}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.reviews.map((review, index) => (
          <div key={index} className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="mb-4 flex gap-0.5">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <p className="mb-5 text-muted-foreground leading-relaxed">&ldquo;{review.text}&rdquo;</p>
            <div className="flex items-center justify-between text-sm">
              <p className="font-semibold">{review.author}</p>
              {review.source && <span className="capitalize text-muted-foreground text-xs">via {review.source}</span>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ProcessContent({ data }: { data: ProcessData }) {
  return (
    <>
      <h2 className="mb-14 text-center text-balance">{data.heading}</h2>
      <div className="grid gap-12 md:grid-cols-3 md:gap-8">
        {data.steps.map((step, index) => (
          <div key={index} className="relative text-center">
            {index < data.steps.length - 1 && (
              <div className="absolute left-[calc(50%+2rem)] top-6 hidden h-0.5 w-[calc(100%-4rem)] bg-border md:block" />
            )}
            <div className="relative z-10 mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20">
              {index + 1}
            </div>
            <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function FAQContent({ data }: { data: FAQData }) {
  return (
    <Container narrow>
      <h2 className="mb-14 text-center text-balance">{data.heading}</h2>
      <Accordion type="single" collapsible className="w-full">
        {data.items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/60">
            <AccordionTrigger className="text-left text-base font-medium hover:text-primary py-5">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  );
}

function CTAContent({ data }: { data: CTAData }) {
  return (
    <div className="text-center">
      <h2 className="mb-5 text-balance">{data.heading}</h2>
      {data.subheading && (
        <p className="mx-auto mb-10 max-w-2xl text-lg opacity-85 text-balance leading-relaxed">
          {data.subheading}
        </p>
      )}
      <Button asChild size="lg" variant="secondary" className="shadow-xl">
        <Link href={data.buttonHref}>{data.buttonText}</Link>
      </Button>
    </div>
  );
}

// Instant Estimator inline content
const serviceOptions = [
  { id: "trimming", label: "Tree Trimming", baseMin: 150, baseMax: 500 },
  { id: "removal", label: "Tree Removal", baseMin: 400, baseMax: 2500 },
  { id: "stump", label: "Stump Grinding", baseMin: 100, baseMax: 400 },
  { id: "emergency", label: "Emergency Service", baseMin: 500, baseMax: 3000 },
];

function InstantEstimatorContent({ data }: { data: InstantEstimatorData }) {
  return (
    <>
      <div className="mb-14 text-center">
        <h2 className="mb-4 text-balance">{data.heading}</h2>
        {data.subheading && (
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
            {data.subheading}
          </p>
        )}
      </div>
      <InstantEstimatorWidget />
    </>
  );
}

function InstantEstimatorWidget() {
  const [selectedService, setSelectedService] = useState(serviceOptions[0].id);
  const [treeSize, setTreeSize] = useState([50]);
  const [quantity, setQuantity] = useState([1]);
  const [step, setStep] = useState<"estimate" | "contact" | "done">("estimate");
  const [contactInfo, setContactInfo] = useState({ name: "", phone: "", email: "" });

  const service = serviceOptions.find((s) => s.id === selectedService)!;
  
  const estimate = useMemo(() => {
    const sizeMultiplier = 0.5 + (treeSize[0] / 100) * 1.5;
    const quantityMultiplier = quantity[0];
    const min = Math.round(service.baseMin * sizeMultiplier * quantityMultiplier);
    const max = Math.round(service.baseMax * sizeMultiplier * quantityMultiplier);
    return { min, max };
  }, [service, treeSize, quantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("done");
  };

  if (step === "done") {
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-8 w-8" />
        </div>
        <h3 className="mb-4 text-2xl font-semibold">Thank You!</h3>
        <p className="text-muted-foreground">We&apos;ll contact you within 24 hours with a detailed quote.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-8 lg:grid-cols-[1fr,320px]">
        <div className="rounded-2xl border bg-card p-6 shadow-lg md:p-8">
          {step === "estimate" ? (
            <div className="space-y-8">
              <div>
                <Label className="mb-4 block text-base font-semibold">What do you need?</Label>
                <div className="grid grid-cols-2 gap-3">
                  {serviceOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setSelectedService(option.id)}
                      className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                        selectedService === option.id
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <Label className="text-base font-semibold">Tree/Job Size</Label>
                  <span className="text-sm font-medium text-muted-foreground">
                    {treeSize[0] < 33 ? "Small" : treeSize[0] < 66 ? "Medium" : "Large"}
                  </span>
                </div>
                <Slider value={treeSize} onValueChange={setTreeSize} max={100} step={1} className="py-2" />
              </div>
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <Label className="text-base font-semibold">How many?</Label>
                  <span className="text-sm font-medium text-muted-foreground">{quantity[0]} {quantity[0] === 1 ? "tree" : "trees"}</span>
                </div>
                <Slider value={quantity} onValueChange={setQuantity} min={1} max={10} step={1} className="py-2" />
              </div>
              <Button onClick={() => setStep("contact")} size="lg" className="w-full">
                Get My Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="mb-2 text-xl font-semibold">Almost there!</h3>
                <p className="text-sm text-muted-foreground">Enter your details for a detailed quote.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="est-name">Name</Label>
                  <Input id="est-name" required value={contactInfo.name} onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })} placeholder="John Smith" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="est-phone">Phone</Label>
                  <Input id="est-phone" type="tel" required value={contactInfo.phone} onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })} placeholder="(555) 123-4567" className="mt-1.5" />
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep("estimate")}>Back</Button>
                <Button type="submit" className="flex-1">Request Quote</Button>
              </div>
            </form>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex-1 rounded-2xl bg-primary p-6 text-primary-foreground shadow-xl shadow-primary/20">
            <div className="mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              <span className="text-sm font-medium uppercase tracking-wide opacity-80">Estimated Range</span>
            </div>
            <div className="mb-2">
              <span className="text-4xl font-bold">${estimate.min.toLocaleString()}</span>
              <span className="mx-2 text-2xl opacity-60">–</span>
              <span className="text-4xl font-bold">${estimate.max.toLocaleString()}</span>
            </div>
            <p className="mb-6 text-sm opacity-70">Final price based on site inspection</p>
            <div className="space-y-2 border-t border-primary-foreground/20 pt-4 text-sm">
              <div className="flex justify-between"><span className="opacity-70">Service</span><span className="font-medium">{service.label}</span></div>
              <div className="flex justify-between"><span className="opacity-70">Size</span><span className="font-medium">{treeSize[0] < 33 ? "Small" : treeSize[0] < 66 ? "Medium" : "Large"}</span></div>
              <div className="flex justify-between"><span className="opacity-70">Quantity</span><span className="font-medium">{quantity[0]}</span></div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>✓ Licensed & Insured</span>
            <span>✓ Free Estimates</span>
          </div>
        </div>
      </div>
    </div>
  );
}
