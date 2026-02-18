import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { ServicesGridData } from "@/lib/types/config";
import { siteConfig } from "@/config/site.config";

interface ServicesGridProps {
  variant: "grid" | "cards";
  data: ServicesGridData;
}

export function ServicesGrid({ variant, data }: ServicesGridProps) {
  const services = data.showAll
    ? siteConfig.services
    : siteConfig.services.filter((s) => s.featured);

  const gridCols = variant === "grid" ? "md:grid-cols-3" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-balance">{data.heading}</h2>
          {data.subheading && (
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-balance">
              {data.subheading}
            </p>
          )}
        </div>

        <div className={`grid gap-6 ${gridCols}`}>
          {services.map((service) => {
            const Icon = service.icon
              ? (LucideIcons[
                  service.icon as keyof typeof LucideIcons
                ] as React.FC<{ className?: string }>)
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
                {service.pricing && (
                  <p className="text-sm font-medium text-primary">
                    {service.pricing.type === "starting" &&
                      `Starting at $${service.pricing.value}`}
                    {service.pricing.type === "fixed" &&
                      `$${service.pricing.value}`}
                    {service.pricing.type === "quote" && "Request Quote"}
                  </p>
                )}
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-primary">
                  Learn More
                  <LucideIcons.ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>

        {!data.showAll && (
          <div className="mt-14 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
