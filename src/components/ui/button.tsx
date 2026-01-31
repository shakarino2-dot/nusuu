import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-widest border-b-4 active:border-b-0 active:translate-y-1",
    {
        variants: {
            variant: {
                default: "bg-green-500 text-white border-green-700 hover:bg-green-400",
                destructive:
                    "bg-red-500 text-white border-red-700 hover:bg-red-400",
                outline:
                    "border-2 border-slate-200 bg-transparent hover:bg-slate-100 hover:text-slate-900 border-b-4 text-slate-500",
                secondary:
                    "bg-blue-500 text-white border-blue-700 hover:bg-blue-400",
                ghost: "bg-transparent border-transparent text-slate-500 hover:bg-slate-100 border-b-0 active:translate-y-0",
                link: "text-primary underline-offset-4 hover:underline border-b-0 active:translate-y-0",
            },
            size: {
                default: "h-12 px-6 py-2",
                sm: "h-10 rounded-lg px-4",
                lg: "h-14 rounded-2xl px-10 text-lg",
                icon: "h-10 w-10",
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
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
