import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface ImageBandData {
  image: string;
  heading?: string;
  subheading?: string;
  cta?: {
    text: string;
    href: string;
  };
  overlay?: "light" | "dark" | "gradient";
  height?: "sm" | "md" | "lg";
}

interface ImageBandProps {
  data: ImageBandData;
}

const heightStyles = {
  sm: "min-h-[30vh]",
  md: "min-h-[45vh]",
  lg: "min-h-[60vh]",
};

const overlayStyles = {
  light: "bg-white/30",
  dark: "bg-black/50",
  gradient: "bg-gradient-to-b from-black/60 via-black/40 to-black/60",
};

export function ImageBand({ data }: ImageBandProps) {
  const height = data.height || "md";
  const overlay = data.overlay || "gradient";
  const hasContent = data.heading || data.subheading || data.cta;

  return (
    <section className={`relative ${heightStyles[height]} flex items-center`}>
      <Image
        src={data.image}
        alt={data.heading || ""}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className={`absolute inset-0 ${overlayStyles[overlay]}`} />
      
      {hasContent && (
        <Container className="relative z-10 text-center text-white">
          <div className="mx-auto max-w-3xl">
            {data.heading && (
              <h2 className="mb-4 text-3xl font-bold text-balance drop-shadow-lg sm:text-4xl lg:text-5xl">
                {data.heading}
              </h2>
            )}
            {data.subheading && (
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90 text-balance">
                {data.subheading}
              </p>
            )}
            {data.cta && (
              <Button asChild size="lg" variant="secondary" className="shadow-xl">
                <Link href={data.cta.href}>{data.cta.text}</Link>
              </Button>
            )}
          </div>
        </Container>
      )}
    </section>
  );
}
