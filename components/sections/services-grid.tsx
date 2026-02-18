import Link from "next/link";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <section className="container py-16 md:py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4">{data.heading}</h2>
        {data.subheading && (
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
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
              className="group relative overflow-hidden rounded-lg border bg-card p-6 transition-all hover:shadow-lg"
            >
              {Icon && (
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
              )}
              <h3 className="mb-2 text-xl font-semibold">{service.name}</h3>
              <p className="mb-4 text-muted-foreground">{service.description}</p>
              {service.pricing && (
                <p className="text-sm font-medium">
                  {service.pricing.type === "starting" &&
                    `Starting at $${service.pricing.value}`}
                  {service.pricing.type === "fixed" &&
                    `$${service.pricing.value}`}
                  {service.pricing.type === "quote" && "Request Quote"}
                </p>
              )}
              <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                Learn More
                <LucideIcons.ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {!data.showAll && (
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
