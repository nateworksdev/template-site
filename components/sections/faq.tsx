import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import type { FAQData } from "@/lib/types/config";

interface FAQProps {
  data: FAQData;
}

export function FAQ({ data }: FAQProps) {
  return (
    <section className="py-20 md:py-28">
      <Container narrow>
        <h2 className="mb-14 text-center text-balance">{data.heading}</h2>

        <Accordion type="single" collapsible className="w-full">
          {data.items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/60">
              <AccordionTrigger className="text-left text-base font-medium hover:text-primary py-5">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
