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
  return (
    <section
      className={cn(
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {fullWidth ? (
        children
      ) : (
        <Container narrow={narrow}>{children}</Container>
      )}
    </section>
  );
}
