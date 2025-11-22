'use client'

import Link from 'next/link'
import Image from 'next/image'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Heading, Text } from '@/components/ui/typography'

const categories = [
  {
    name: 'Rare Aroids',
    href: '/collections/rare-aroids',
    image: 'https://images.unsplash.com/photo-1593696954577-ab3d39317b97?q=80&w=1000&auto=format&fit=crop',
    description: 'Exquisite specimens for the collector',
  },
  {
    name: 'Large Statement',
    href: '/collections/large-statement',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1000&auto=format&fit=crop',
    description: 'Transform your space with living sculpture',
  },
  {
    name: 'Luxury Planters',
    href: '/collections/luxury-pots',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1000&auto=format&fit=crop',
    description: 'Handcrafted ceramics and brass vessels',
  },
  {
    name: 'Pet Friendly',
    href: '/collections/pet-friendly',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1000&auto=format&fit=crop',
    description: 'Safe and beautiful for your furry friends',
  }
]

export function FeaturedCategories() {
  return (
    <section className="py-24 bg-jungle-50 dark:bg-jungle-900 relative overflow-hidden">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-[0.02] bg-[url('/leaf-pattern.png')] bg-repeat" /> */}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <Heading as="h2">Curated Collections</Heading>
          <Text className="max-w-2xl mx-auto text-lg">
            Explore our carefully selected range of premium botanicals and accessories,
            designed to elevate your interior landscape.
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={category.href}>
                <GlassCard className="h-full group cursor-pointer overflow-hidden" hoverEffect={true}>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-emerald-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {category.description}
                      </p>
                      <div className="flex items-center text-gold text-sm font-medium uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                        View Collection <ArrowRight className="ml-2 h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
