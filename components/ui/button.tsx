import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

/**
 * Button component with Ibelick-inspired styling
 * - Subtle gradient borders on hover
 * - Smooth scale/glow transitions
 * - Premium focus states
 */

const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-lg text-sm font-medium",
    "transition-all duration-200 ease-out",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
    "shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          "shadow-sm shadow-primary/20",
          "hover:shadow-md hover:shadow-primary/30",
          "hover:bg-primary/90",
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground",
          "shadow-sm",
          "hover:bg-secondary/80",
          "hover:shadow-md",
        ].join(" "),
        outline: [
          "border-2 border-border bg-transparent",
          "hover:border-primary/50 hover:bg-primary/5",
          "hover:text-primary",
        ].join(" "),
        ghost: [
          "bg-transparent",
          "hover:bg-muted hover:text-foreground",
        ].join(" "),
        destructive: [
          "bg-destructive text-white",
          "shadow-sm shadow-destructive/20",
          "hover:bg-destructive/90 hover:shadow-md hover:shadow-destructive/30",
        ].join(" "),
        link: [
          "text-primary underline-offset-4",
          "hover:underline",
        ].join(" "),
        // Premium variant with gradient border effect
        premium: [
          "bg-background text-foreground",
          "border border-transparent",
          "shadow-sm",
          "before:absolute before:inset-0 before:rounded-lg before:p-[1px]",
          "before:bg-gradient-to-br before:from-primary/50 before:via-accent/30 before:to-primary/50",
          "before:-z-10 before:opacity-0",
          "before:transition-opacity before:duration-300",
          "hover:before:opacity-100",
          "hover:shadow-lg hover:shadow-primary/10",
        ].join(" "),
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "size-10",
        "icon-sm": "size-9",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot.Root : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
