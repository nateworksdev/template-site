import Link from "next/link";
import { notFound } from "next/navigation";
import * as LucideIcons from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
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
      <main>
        {service.image && (
          <section className="relative h-[40vh] overflow-hidden">
            <img
              src={service.image}
              alt={service.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </section>
        )}

        <section className="container py-16">
          <div className="mx-auto max-w-3xl">
            {Icon && (
              <div className="mb-6 inline-flex rounded-lg bg-primary/10 p-4 text-primary">
                <Icon className="h-8 w-8" />
              </div>
            )}
            <h1 className="mb-4">{service.name}</h1>
            <p className="mb-8 text-xl text-muted-foreground">
              {service.description}
            </p>

            {service.longDescription && (
              <div className="prose prose-neutral dark:prose-invert mb-8">
                <p>{service.longDescription}</p>
              </div>
            )}

            {service.pricing && (
              <div className="mb-8 rounded-lg border bg-muted/50 p-6">
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

            <div className="flex flex-col gap-4 sm:flex-row">
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
        </section>

        <section className="bg-muted/50 py-16">
          <div className="container">
            <h2 className="mb-8 text-center">Other Services</h2>
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
                      className="group rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
                    >
                      {OtherIcon && (
                        <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                          <OtherIcon className="h-6 w-6" />
                        </div>
                      )}
                      <h3 className="mb-2 text-lg font-semibold">
                        {otherService.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {otherService.description}
                      </p>
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
