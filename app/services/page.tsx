import Link from "next/link";
import Image from "next/image";
import * as LucideIcons from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site.config";

export default function ServicesPage() {
  const { heading, subheading } = siteConfig.pages.services;

  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="bg-muted/30 py-20">
          <Container className="text-center">
            <h1 className="mb-4 text-balance">{heading}</h1>
            {subheading && (
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
                {subheading}
              </p>
            )}
          </Container>
        </section>

        <section className="py-20">
          <Container>
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
                    className="flex flex-col overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-lg"
                  >
                    {service.image && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
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
                      <p className="mb-4 flex-1 text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      {service.pricing && (
                        <p className="mb-4 text-sm font-semibold text-primary">
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
          </Container>
        </section>

        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
          <div className="absolute inset-0 opacity-[0.07]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:32px_32px]" />
          </div>
          <Container className="relative z-10 text-center">
            <h2 className="mb-4 text-balance">Need a Custom Solution?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/85 text-balance">
              Every project is unique. Contact us to discuss your specific needs.
            </p>
            <Button asChild size="lg" variant="secondary" className="shadow-xl">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
