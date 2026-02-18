import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { CTAData } from "@/lib/types/config";

interface CTAProps {
  data: CTAData;
}

export function CTA({ data }: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground md:py-28">
      {/* Layered background effects */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:32px_32px]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-white/5" />
      
      <Container className="relative z-10 text-center">
        <h2 className="mb-5 text-balance">{data.heading}</h2>
        {data.subheading && (
          <p className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/85 text-balance leading-relaxed">
            {data.subheading}
          </p>
        )}
        <Button asChild size="lg" variant="secondary" className="shadow-xl">
          <Link href={data.buttonHref}>{data.buttonText}</Link>
        </Button>
      </Container>
    </section>
  );
}
