import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { FeaturedServiceData } from "@/lib/types/config";
import { siteConfig } from "@/config/site.config";

interface FeaturedServiceProps {
  data: FeaturedServiceData;
}

export function FeaturedService({ data }: FeaturedServiceProps) {
  const service = siteConfig.services.find((s) => s.id === data.serviceId);

  if (!service) return null;

  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {service.image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={service.image}
                alt={service.name}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div>
            <h2 className="mb-4">{data.heading || service.name}</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              {data.description || service.longDescription || service.description}
            </p>
            {data.cta && (
              <Button asChild size="lg">
                <Link href={data.cta.href}>{data.cta.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
