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
    <section className="container py-16 md:py-24">
      <h2 className="mb-4 text-center">{data.heading}</h2>
      {data.subheading && (
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
          {data.subheading}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function GalleryBeforeAfter({ data }: { data: GalleryData }) {
  return (
    <section className="container py-16 md:py-24">
      <h2 className="mb-4 text-center">{data.heading}</h2>
      {data.subheading && (
        <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground">
          {data.subheading}
        </p>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        {data.images.map((image, index) => (
          <div key={index} className="space-y-2">
            {image.before && (
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Before
                </p>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <img
                    src={image.before}
                    alt={`Before: ${image.alt}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            )}
            <div>
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                After
              </p>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
