import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const iconContainerVariants = cva(
  "flex items-center justify-center rounded-2xl transition-all duration-300",
  {
    variants: {
      variant: {
        primary: "bg-primary-50 text-primary-600",
        secondary: "bg-secondary-50 text-secondary-600",
        neutral: "bg-neutral-100 text-neutral-600",
        info: "bg-blue-50 text-blue-600",
        warning: "bg-amber-50 text-amber-600",
        success: "bg-primary-50 text-primary-600",
      },
      size: {
        sm: "w-12 h-12",
        md: "w-16 h-16",
        lg: "w-20 h-20",
        xl: "w-24 h-24",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface IconContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconContainerVariants> {}

const IconContainer = React.forwardRef<HTMLDivElement, IconContainerProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <div
        className={cn(iconContainerVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
IconContainer.displayName = "IconContainer";

export { IconContainer, iconContainerVariants };
