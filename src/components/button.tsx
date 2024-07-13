import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "rounded-lg px-5 font-medium flex items-center justify-center gap-2 transition-colors",
  variants: {
    variant: {
      primary: "bg-sky-300 text-sky-950 hover:bg-sky-400",
      secondary: "bg-zinc-800 text-zinc-200  hover:bg-zinc-700",
    },
    size: {
      default: "py-2",
      full: "w-full h-11",
    },
  },

  defaultVariants: {
    variant: "primary",
    size: "default",
  },
});

interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

export function Button({ children, variant, size, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonVariants({ variant, size })}>
      {children}
    </button>
  );
}
