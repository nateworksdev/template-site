import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { FeaturedServiceData } from "@/lib/types/config";
import { siteConfig } from "@/config/site.config";

interface FeaturedServiceProps {
  data: FeaturedServiceData;
}

export function FeaturedService({ data }: FeaturedServiceProps) {
  const service = siteConfig.services.find((s) => s.id === data.serviceId);

  if (!service) return null;

  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {service.image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
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
      </Container>
    </section>
  );
}
