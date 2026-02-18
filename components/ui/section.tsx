import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionVariant = 
  | "default" 
  | "surface" 
  | "surface2" 
  | "surface3" 
  | "brandBand";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant;
  /** Use full width (no container) */
  fullWidth?: boolean;
  /** Use narrow container for text-heavy content */
  narrow?: boolean;
  /** Custom padding override */
  padding?: "none" | "sm" | "md" | "lg" | "xl";
}

const variantStyles: Record<SectionVariant, string> = {
  default: "bg-background",
  surface: "bg-surface",
  surface2: "bg-surface-2",
  surface3: "bg-surface-3",
  brandBand: "bg-brand-dark text-brand-dark-foreground",
};

const paddingStyles = {
  none: "",
  sm: "py-12 md:py-16",
  md: "py-16 md:py-20",
  lg: "py-20 md:py-28",
  xl: "py-24 md:py-32",
};

export function Section({
  variant = "default",
  fullWidth = false,
  narrow = false,
  padding = "lg",
  className,
  children,
  ...props
}: SectionProps) {
  const isBrandBand = variant === "brandBand";
  
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {/* Ibelick-style dot pattern for brandBand */}
      {isBrandBand && (
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)] [background-size:28px_28px]" />
        </div>
      )}
      
      <div className="relative z-10">
        {fullWidth ? (
          children
        ) : (
          <Container narrow={narrow}>{children}</Container>
        )}
      </div>
    </section>
  );
}
