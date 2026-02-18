import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as LucideIcons from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ServiceEstimator } from "@/components/service-estimator";
import { siteConfig } from "@/config/site.config";

export function generateStaticParams() {
  return siteConfig.services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);

  if (!service) {
    return {};
  }

  return {
    title: service.name,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = siteConfig.services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon
    ? (LucideIcons[
        service.icon as keyof typeof LucideIcons
      ] as React.FC<{ className?: string }>)
    : null;

  return (
    <>
      <Nav />
      <main id="main-content">
        {service.image && (
          <section className="relative h-[40vh] overflow-hidden">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50" />
          </section>
        )}

        <section className="py-16 md:py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr,380px]">
              {/* Main Content */}
              <div>
                {Icon && (
                  <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-4 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                )}
                <h1 className="mb-4 text-balance">{service.name}</h1>
                <p className="mb-8 text-xl text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {service.longDescription && (
                  <div className="prose prose-neutral dark:prose-invert mb-8 max-w-none">
                    <p className="leading-relaxed">{service.longDescription}</p>
                  </div>
                )}

                {service.pricing && (
                  <div className="mb-8 rounded-xl border bg-muted/30 p-6">
                    <h3 className="mb-2 text-lg font-semibold">Pricing</h3>
                    <p className="text-muted-foreground">
                      {service.pricing.type === "starting" &&
                        `Starting at $${service.pricing.value}`}
                      {service.pricing.type === "fixed" &&
                        `$${service.pricing.value}`}
                      {service.pricing.type === "quote" &&
                        "Contact us for a custom quote"}
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-4 sm:flex-row lg:hidden">
                  <Button asChild size="lg">
                    <Link href="/contact">Get Free Estimate</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <a href={`tel:${siteConfig.contact.phone.replace(/\D/g, "")}`}>
                      Call {siteConfig.contact.phone}
                    </a>
                  </Button>
                </div>
              </div>

              {/* Estimator Sidebar */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <ServiceEstimator
                  serviceId={service.id}
                  serviceName={service.name}
                  basePriceRange={
                    service.pricing?.type === "starting" && service.pricing.value
                      ? { min: service.pricing.value, max: service.pricing.value * 2.5 }
                      : service.pricing?.type === "quote"
                      ? { min: 200, max: 2000 }
                      : undefined
                  }
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-muted/30 py-16 md:py-20">
          <Container>
            <h2 className="mb-10 text-center text-balance">Other Services</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {siteConfig.services
                .filter((s) => s.id !== service.id)
                .slice(0, 3)
                .map((otherService) => {
                  const OtherIcon = otherService.icon
                    ? (LucideIcons[
                        otherService.icon as keyof typeof LucideIcons
                      ] as React.FC<{ className?: string }>)
                    : null;

                  return (
                    <Link
                      key={otherService.id}
                      href={`/services/${otherService.slug}`}
                      className="group rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/20"
                    >
                      {OtherIcon && (
                        <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <OtherIcon className="h-6 w-6" />
                        </div>
                      )}
                      <h3 className="mb-2 text-lg font-semibold">
                        {otherService.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {otherService.description}
                      </p>
                    </Link>
                  );
                })}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
