import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { HeroData } from "@/lib/types/config";

interface HeroProps {
  variant: "minimal" | "split" | "fullscreen";
  data: HeroData;
}

export function Hero({ variant, data }: HeroProps) {
  if (variant === "minimal") {
    return <HeroMinimal data={data} />;
  }
  if (variant === "split") {
    return <HeroSplit data={data} />;
  }
  return <HeroFullscreen data={data} />;
}

function HeroMinimal({ data }: { data: HeroData }) {
  return (
    <section className="relative overflow-hidden bg-mesh py-24 md:py-36">
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-balance">{data.heading}</h1>
          {data.subheading && (
            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl text-balance">
              {data.subheading}
            </p>
          )}
          {data.cta && (
            <Button asChild size="lg">
              <Link href={data.cta.href}>{data.cta.text}</Link>
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}

function HeroSplit({ data }: { data: HeroData }) {
  return (
    <section className="relative overflow-hidden bg-mesh py-20 md:py-28 lg:py-32">
      {/* Subtle dot overlay */}
      <div className="absolute inset-0 bg-dots opacity-50" />
      
      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-xl">
            <h1 className="mb-6 text-balance">{data.heading}</h1>
            {data.subheading && (
              <p className="mb-10 text-lg text-muted-foreground md:text-xl text-balance leading-relaxed">
                {data.subheading}
              </p>
            )}
            {data.cta && (
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={data.cta.href}>{data.cta.text}</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/services">Our Services</Link>
                </Button>
              </div>
            )}
          </div>
          {data.image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-primary/10">
              <Image
                src={data.image}
                alt={data.heading}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

function HeroFullscreen({ data }: { data: HeroData }) {
  return (
    <section className="relative flex min-h-[85vh] items-center">
      {data.image && (
        <>
          <Image
            src={data.image}
            alt={data.heading}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </>
      )}
      <Container className="relative z-10 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-balance drop-shadow-lg">{data.heading}</h1>
          {data.subheading && (
            <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl text-white/90 text-balance leading-relaxed">
              {data.subheading}
            </p>
          )}
          {data.cta && (
            <Button asChild size="xl" variant="secondary">
              <Link href={data.cta.href}>{data.cta.text}</Link>
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
