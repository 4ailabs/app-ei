import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DA7756]/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#DA7756] text-white hover:bg-[#C4684A] rounded-full shadow-sm hover:shadow-md active:scale-[0.98]",
        destructive: "bg-red-500 text-white hover:bg-red-600 rounded-xl",
        outline: "border-2 border-[#E5E4E0] bg-white hover:border-[#DA7756] hover:bg-[#FAF9F7] text-[#1A1915] rounded-full",
        secondary: "bg-[#F5F4F0] text-[#1A1915] hover:bg-[#E5E4E0] rounded-full",
        ghost: "hover:bg-[#F5F4F0] text-[#706F6C] hover:text-[#1A1915] rounded-full",
        link: "text-[#DA7756] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
