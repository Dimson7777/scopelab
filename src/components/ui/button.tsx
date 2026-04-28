import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium tracking-tight ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-primary to-[hsl(258_85%_58%)] text-primary-foreground shadow-[0_1px_0_0_hsl(0_0%_100%/0.18)_inset,0_8px_20px_-6px_hsl(258_90%_40%/0.6)] hover:shadow-[0_1px_0_0_hsl(0_0%_100%/0.18)_inset,0_10px_28px_-6px_hsl(258_90%_50%/0.7)] hover:-translate-y-px",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border border-border bg-card/50 text-foreground hover:bg-card hover:border-primary/40 hover:text-foreground backdrop-blur-sm",
        secondary:
          "bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80 hover:border-border",
        ghost:
          "text-muted-foreground hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        hero:
          "bg-gradient-to-r from-primary via-primary-glow to-accent text-primary-foreground font-semibold shadow-[0_1px_0_0_hsl(0_0%_100%/0.2)_inset,0_12px_32px_-8px_hsl(258_90%_50%/0.7)] hover:shadow-[0_1px_0_0_hsl(0_0%_100%/0.2)_inset,0_16px_40px_-8px_hsl(258_90%_55%/0.85)] hover:-translate-y-0.5 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-[background-position,box-shadow,transform] duration-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-xl px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
