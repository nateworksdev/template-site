import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Use narrower width for text-heavy content */
  narrow?: boolean;
}

export function Container({
  className,
  narrow = false,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        narrow ? "max-w-4xl" : "max-w-6xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
