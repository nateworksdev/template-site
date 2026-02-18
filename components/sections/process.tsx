import * as LucideIcons from "lucide-react";
import type { ProcessData } from "@/lib/types/config";

interface ProcessProps {
  data: ProcessData;
}

export function Process({ data }: ProcessProps) {
  return (
    <section className="container py-16 md:py-24">
      <h2 className="mb-12 text-center">{data.heading}</h2>

      <div className="grid gap-8 md:grid-cols-3">
        {data.steps.map((step, index) => {
          const Icon = step.icon
            ? (LucideIcons[
                step.icon as keyof typeof LucideIcons
              ] as React.FC<{ className?: string }>)
            : null;

          return (
            <div key={index} className="relative text-center">
              {/* Step number */}
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                {index + 1}
              </div>

              {Icon && (
                <div className="mb-4">
                  <Icon className="mx-auto h-12 w-12 text-primary" />
                </div>
              )}

              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>

              {/* Connector line (not on last item) */}
              {index < data.steps.length - 1 && (
                <div className="absolute left-1/2 top-6 hidden h-0.5 w-full bg-muted md:block" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
