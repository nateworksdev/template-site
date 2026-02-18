import { Container } from "@/components/ui/container";
import type { ProcessData } from "@/lib/types/config";

interface ProcessProps {
  data: ProcessData;
}

export function Process({ data }: ProcessProps) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <h2 className="mb-14 text-center text-balance">{data.heading}</h2>

        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {data.steps.map((step, index) => {
            // Icon support available but not currently rendered
            // const Icon = step.icon ? LucideIcons[step.icon] : null;

            return (
              <div key={index} className="relative text-center">
                {/* Connector line (between items) */}
                {index < data.steps.length - 1 && (
                  <div className="absolute left-[calc(50%+2rem)] top-6 hidden h-0.5 w-[calc(100%-4rem)] bg-border md:block" />
                )}
                
                {/* Step number */}
                <div className="relative z-10 mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground shadow-lg shadow-primary/20">
                  {index + 1}
                </div>

                <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
