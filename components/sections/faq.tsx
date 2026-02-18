import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQData } from "@/lib/types/config";

interface FAQProps {
  data: FAQData;
}

export function FAQ({ data }: FAQProps) {
  return (
    <section className="container py-16 md:py-24">
      <h2 className="mb-12 text-center">{data.heading}</h2>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {data.items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
