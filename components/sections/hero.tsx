import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
    <section className="container py-20 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-6">{data.heading}</h1>
        {data.subheading && (
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            {data.subheading}
          </p>
        )}
        {data.cta && (
          <Button asChild size="lg">
            <Link href={data.cta.href}>{data.cta.text}</Link>
          </Button>
        )}
      </div>
    </section>
  );
}

function HeroSplit({ data }: { data: HeroData }) {
  return (
    <section className="container py-12 md:py-24">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <h1 className="mb-6">{data.heading}</h1>
          {data.subheading && (
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              {data.subheading}
            </p>
          )}
          {data.cta && (
            <Button asChild size="lg">
              <Link href={data.cta.href}>{data.cta.text}</Link>
            </Button>
          )}
        </div>
        {data.image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src={data.image}
              alt={data.heading}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
        )}
      </div>
    </section>
  );
}

function HeroFullscreen({ data }: { data: HeroData }) {
  return (
    <section className="relative flex min-h-[80vh] items-center">
      {data.image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${data.image})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </>
      )}
      <div className="container relative z-10 text-center text-white">
        <h1 className="mb-6">{data.heading}</h1>
        {data.subheading && (
          <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">
            {data.subheading}
          </p>
        )}
        {data.cta && (
          <Button asChild size="lg" variant="secondary">
            <Link href={data.cta.href}>{data.cta.text}</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
