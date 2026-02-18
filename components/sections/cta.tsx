import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { CTAData } from "@/lib/types/config";

interface CTAProps {
  data: CTAData;
}

export function CTA({ data }: CTAProps) {
  return (
    <section className="bg-primary py-16 text-primary-foreground md:py-24">
      <div className="container text-center">
        <h2 className="mb-4">{data.heading}</h2>
        {data.subheading && (
          <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
            {data.subheading}
          </p>
        )}
        <Button asChild size="lg" variant="secondary">
          <Link href={data.buttonHref}>{data.buttonText}</Link>
        </Button>
      </div>
    </section>
  );
}
