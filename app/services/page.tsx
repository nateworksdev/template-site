import Link from "next/link";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site.config";

export default function ServicesPage() {
  const { heading, subheading } = siteConfig.pages.services;

  return (
    <>
      <Nav />
      <main>
        <section className="bg-muted/50 py-16">
          <div className="container text-center">
            <h1 className="mb-4">{heading}</h1>
            {subheading && (
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                {subheading}
              </p>
            )}
          </div>
        </section>

        <section className="container py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {siteConfig.services.map((service) => {
              const Icon = service.icon
                ? (LucideIcons[
                    service.icon as keyof typeof LucideIcons
                  ] as React.FC<{ className?: string }>)
                : null;

              return (
                <div
                  key={service.id}
                  className="flex flex-col overflow-hidden rounded-lg border bg-card"
                >
                  {service.image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {Icon && (
                      <div className="mb-4 inline-flex w-fit rounded-lg bg-primary/10 p-3 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                    )}
                    <h3 className="mb-2 text-xl font-semibold">
                      {service.name}
                    </h3>
                    <p className="mb-4 flex-1 text-muted-foreground">
                      {service.description}
                    </p>
                    {service.pricing && (
                      <p className="mb-4 text-sm font-medium">
                        {service.pricing.type === "starting" &&
                          `Starting at $${service.pricing.value}`}
                        {service.pricing.type === "fixed" &&
                          `$${service.pricing.value}`}
                        {service.pricing.type === "quote" && "Request Quote"}
                      </p>
                    )}
                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/services/${service.slug}`}>
                        Learn More
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container text-center">
            <h2 className="mb-4">Need a Custom Solution?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
              Every project is unique. Contact us to discuss your specific needs.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
