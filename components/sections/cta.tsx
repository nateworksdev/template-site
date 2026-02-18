import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { CTAData } from "@/lib/types/config";

interface CTAProps {
  data: CTAData;
}

export function CTA({ data }: CTAProps) {
  return (
    <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground md:py-24">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:24px_24px]" />
      </div>
      
      <div className="container relative z-10 text-center">
        <h2 className="mb-4">{data.heading}</h2>
        {data.subheading && (
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            {data.subheading}
          </p>
        )}
        <Button asChild size="lg" variant="secondary" className="shadow-lg">
          <Link href={data.buttonHref}>{data.buttonText}</Link>
        </Button>
      </div>
    </section>
  );
}
