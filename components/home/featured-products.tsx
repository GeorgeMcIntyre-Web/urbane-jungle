'use client'

import Link from 'next/link'
import { LuxuryButton } from '@/components/ui/luxury-button'
import { Heading, Text } from '@/components/ui/typography'
import { motion } from 'framer-motion'

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-jungle-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Heading as="h2" className="text-white mb-4">Featured Collection</Heading>
          <Text className="text-gray-400 max-w-2xl mx-auto">
            Hand-picked favorites that are perfect for every plant lover
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/shop">
            <LuxuryButton size="xl" variant="luxury">
              Explore Full Collection
            </LuxuryButton>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
