import { Star } from "lucide-react";
import type { ReviewsData } from "@/lib/types/config";

interface ReviewsProps {
  variant: "carousel" | "grid";
  data: ReviewsData;
}

export function Reviews({ variant, data }: ReviewsProps) {
  return (
    <section className="bg-muted/50 py-16 md:py-24">
      <div className="container">
        <h2 className="mb-12 text-center">{data.heading}</h2>

        <div
          className={
            variant === "grid"
              ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              : "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          }
        >
          {data.reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mb-4 text-muted-foreground">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center justify-between text-sm">
                <p className="font-medium">{review.author}</p>
                {review.source && (
                  <span className="capitalize text-muted-foreground">
                    {review.source}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
