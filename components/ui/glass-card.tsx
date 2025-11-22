import * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "dark" | "light"
    hoverEffect?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
    ({ className, variant = "default", hoverEffect = true, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative overflow-hidden rounded-xl border border-white/10 backdrop-blur-md transition-all duration-500",
                    variant === "default" && "bg-white/5 dark:bg-black/20",
                    variant === "dark" && "bg-black/40 border-white/5",
                    variant === "light" && "bg-white/60 border-white/20",
                    hoverEffect && "hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/10 hover:border-emerald-500/30 group",
                    className
                )}
                {...props}
            >
                {/* Noise texture overlay */}
                {/* <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')] bg-repeat mix-blend-overlay" /> */}

                {/* Inner glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent pointer-events-none" />

                <div className="relative z-10">
                    {children}
                </div>
            </div>
        )
    }
)
GlassCard.displayName = "GlassCard"

export { GlassCard }
