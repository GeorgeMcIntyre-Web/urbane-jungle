'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heading, Text } from '@/components/ui/typography'
import { GlassCard } from '@/components/ui/glass-card'
import { LuxuryButton } from '@/components/ui/luxury-button'
import Link from 'next/link'

export default function ShopPage() {
    const [view, setView] = useState<'grid' | 'list'>('grid')

    return (
        <div className="min-h-screen bg-jungle-900 pt-32 pb-24">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <Heading as="h1" className="text-white mb-4">The Collection</Heading>
                    <Text className="text-gray-400 max-w-2xl mx-auto">
                        Premium botanical specimens, meticulously curated for the discerning collector.
                    </Text>
                </div>

                <div className="text-center py-24">
                    <Text className="text-gray-400 mb-8">Products coming soon. Database setup in progress.</Text>
                    <Link href="/">
                        <LuxuryButton variant="luxury">
                            Return Home
                        </LuxuryButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}
