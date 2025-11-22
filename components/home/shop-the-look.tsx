'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heading, Text } from '@/components/ui/typography'
import { GlassCard } from '@/components/ui/glass-card'
import { useState } from 'react'

const HOTSPOTS = [
    { x: 30, y: 40, product: "Monstera Deliciosa", price: "$120" },
    { x: 60, y: 65, product: "Fiddle Leaf Fig", price: "$180" },
    { x: 80, y: 30, product: "Brass Mister", price: "$45" },
]

export function ShopTheLook() {
    const [activeHotspot, setActiveHotspot] = useState<number | null>(null)

    return (
        <section className="py-24 bg-jungle-900 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative aspect-[4/5] rounded-2xl overflow-hidden group"
                    >
                        <Image
                            src="/images/luxury-penthouse.png"
                            alt="Luxury Penthouse Living Room"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20" />

                        {HOTSPOTS.map((hotspot, index) => (
                            <div
                                key={index}
                                className="absolute"
                                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                            >
                                <button
                                    className="relative w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/50 text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300 z-20"
                                    onClick={() => setActiveHotspot(activeHotspot === index ? null : index)}
                                >
                                    <svg className={`h-4 w-4 transition-transform duration-300 ${activeHotspot === index ? 'rotate-45' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                                <div className="absolute inset-0 rounded-full bg-white/30 animate-ping z-10" />

                                {activeHotspot === index && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className="absolute left-10 top-0 z-30 w-48"
                                    >
                                        <GlassCard className="p-3" variant="dark">
                                            <p className="text-white font-serif font-medium">{hotspot.product}</p>
                                            <p className="text-gold text-sm">{hotspot.price}</p>
                                            <button className="mt-2 text-xs uppercase tracking-wider text-white/70 hover:text-emerald-400 transition-colors">
                                                View Product →
                                            </button>
                                        </GlassCard>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <Heading as="h2" className="text-white">Shop the Look</Heading>
                        <Text className="text-gray-400 text-lg">
                            Recreate this sanctuary of calm. Our design experts have curated this collection to bring the tranquility of nature into your modern living space.
                        </Text>

                        <div className="grid grid-cols-2 gap-4">
                            <GlassCard className="p-6 text-center cursor-pointer hover:bg-white/5 transition-colors" variant="dark">
                                <div className="text-3xl font-display text-gold mb-2">01</div>
                                <div className="text-white font-medium">The Statement Piece</div>
                            </GlassCard>
                            <GlassCard className="p-6 text-center cursor-pointer hover:bg-white/5 transition-colors" variant="dark">
                                <div className="text-3xl font-display text-gold mb-2">02</div>
                                <div className="text-white font-medium">The Accents</div>
                            </GlassCard>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
