import * as React from "react"
import { cn } from "@/lib/utils"

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"
}

export function Heading({ className, as: Component = "h2", children, ...props }: TypographyProps) {
    return (
        <Component
            className={cn(
                "font-serif tracking-tight text-foreground",
                Component === "h1" && "text-4xl md:text-6xl lg:text-7xl font-bold leading-tight",
                Component === "h2" && "text-3xl md:text-4xl lg:text-5xl font-semibold",
                Component === "h3" && "text-2xl md:text-3xl font-medium",
                Component === "h4" && "text-xl md:text-2xl font-medium",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    )
}

export function Text({ className, as: Component = "p", children, ...props }: TypographyProps) {
    return (
        <Component
            className={cn(
                "font-sans text-muted-foreground leading-relaxed",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    )
}

export function DisplayText({ className, as: Component = "h1", children, ...props }: TypographyProps) {
    return (
        <Component
            className={cn(
                "font-display text-5xl md:text-7xl lg:text-9xl uppercase tracking-widest text-foreground",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    )
}
