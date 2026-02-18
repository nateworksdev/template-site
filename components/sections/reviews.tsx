import { Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { ReviewsData } from "@/lib/types/config";

interface ReviewsProps {
  variant: "carousel" | "grid";
  data: ReviewsData;
}

export function Reviews({ data }: ReviewsProps) {
  // variant prop available for future carousel implementation
  return (
    <section className="bg-muted/40 py-20 md:py-28">
      <Container>
        <h2 className="mb-14 text-center text-balance">{data.heading}</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-accent text-accent"
                  />
                ))}
              </div>
              <p className="mb-5 text-muted-foreground leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center justify-between text-sm">
                <p className="font-semibold">{review.author}</p>
                {review.source && (
                  <span className="capitalize text-muted-foreground text-xs">
                    via {review.source}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
