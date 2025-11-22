'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const MARQUEE_ITEMS = [
    "Rare Aroids",
    "•",
    "Monstera Thai Constellation",
    "•",
    "Philodendron Pink Princess",
    "•",
    "Anthurium Warocqueanum",
    "•",
    "Variegated Frydek",
    "•",
    "Luxury Planters",
    "•",
    "Biophilic Design",
    "•",
]

export function MarqueeSection() {
    return (
        <div className="w-full bg-jungle-800 py-6 overflow-hidden border-y border-white/5">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex space-x-12 items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                >
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex space-x-12 items-center">
                            {MARQUEE_ITEMS.map((item, index) => (
                                <span
                                    key={index}
                                    className={cn(
                                        "text-2xl md:text-4xl uppercase tracking-widest font-display",
                                        item === "•" ? "text-emerald-500" : "text-white/20"
                                    )}
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
