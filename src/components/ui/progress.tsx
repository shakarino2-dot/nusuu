import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    value: number
    max?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    ({ className, value, max = 100, ...props }, ref) => {
        const percentage = Math.min(100, Math.max(0, (value / max) * 100))

        return (
            <div
                ref={ref}
                className={cn(
                    "relative h-4 w-full overflow-hidden rounded-full bg-slate-200",
                    className
                )}
                {...props}
            >
                <div
                    className="h-full w-full flex-1 bg-green-500 transition-all duration-500 ease-in-out"
                    style={{ transform: `translateX(-${100 - percentage}%)` }}
                />
                {/* Shine effect */}
                <div
                    className="absolute top-1 left-2 right-2 h-1 bg-white/20 rounded-full"
                />
            </div>
        )
    }
)
Progress.displayName = "Progress"

export { Progress }
