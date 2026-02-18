import Image from "next/image";
import { Container } from "@/components/ui/container";
import type { GalleryData } from "@/lib/types/config";

interface GalleryProps {
  variant: "masonry" | "before-after";
  data: GalleryData;
}

export function Gallery({ variant, data }: GalleryProps) {
  if (variant === "before-after") {
    return <GalleryBeforeAfter data={data} />;
  }

  return <GalleryMasonry data={data} />;
}

function GalleryMasonry({ data }: { data: GalleryData }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <h2 className="mb-4 text-center text-balance">{data.heading}</h2>
        {data.subheading && (
          <p className="mx-auto mb-14 max-w-2xl text-center text-lg text-muted-foreground text-balance">
            {data.subheading}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function GalleryBeforeAfter({ data }: { data: GalleryData }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <h2 className="mb-4 text-center text-balance">{data.heading}</h2>
        {data.subheading && (
          <p className="mx-auto mb-14 max-w-2xl text-center text-lg text-muted-foreground text-balance">
            {data.subheading}
          </p>
        )}

        <div className="grid gap-8 md:grid-cols-2">
          {data.images.map((image, index) => (
            <div key={index} className="space-y-3">
              {image.before && (
                <div>
                  <p className="mb-2 text-sm font-medium text-muted-foreground">
                    Before
                  </p>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image
                      src={image.before}
                      alt={`Before: ${image.alt}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              )}
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  After
                </p>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
