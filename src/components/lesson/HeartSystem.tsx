import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeartSystemProps {
    hearts: number
    maxHearts?: number
}

export function HeartSystem({ hearts, maxHearts = 3 }: HeartSystemProps) {
    return (
        <div className="flex items-center gap-2">
            {[...Array(maxHearts)].map((_, i) => (
                <Heart
                    key={i}
                    className={cn(
                        "w-6 h-6 transition-all duration-300",
                        i < hearts ? "fill-red-500 text-red-500" : "fill-slate-200 text-slate-200"
                    )}
                />
            ))}
            <span className="ml-2 font-bold text-red-500">{hearts}</span>
        </div>
    )
}
