'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heading, Text } from '@/components/ui/typography'
import { GlassCard } from '@/components/ui/glass-card'
import { LuxuryButton } from '@/components/ui/luxury-button'
import { Minus, Plus, Heart, ShoppingCart, ZoomIn } from 'lucide-react'
import Image from 'next/image'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('medium')

  // TODO: Fetch product from DB
  const product = {
    name: 'Monstera Thai Constellation',
    price: 2500,
    description: 'The crown jewel of any collection. Each leaf is a unique masterpiece.',
    careLevel: 'Moderate',
    lightLevel: 'Bright Indirect',
    waterLevel: 'Medium',
    stock: 3,
    images: ['/images/monstera_thai_constellation_isolated.png'],
  }

  return (
    <div className="min-h-screen bg-jungle-900 pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden group">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
              <button className="absolute top-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <Heading as="h1" className="text-white mb-4">{product.name}</Heading>
              <p className="text-5xl font-display text-gold mb-6">R{product.price.toLocaleString()}</p>
              <Text className="text-gray-300">{product.description}</Text>
            </div>

            {/* Size Selector */}
            <div>
              <Text className="text-white mb-3 font-medium">Size</Text>
              <div className="grid grid-cols-3 gap-3">
                {['Small', 'Medium', 'Large'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size.toLowerCase())}
                    className={`p-4 rounded-lg border-2 transition-all ${selectedSize === size.toLowerCase()
                      ? 'border-emerald-500 bg-emerald-500/20'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                  >
                    <span className="text-white font-medium">{size}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <Text className="text-white mb-3 font-medium">Quantity</Text>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Minus className="h-5 w-5 text-white" />
                </button>
                <span className="text-2xl font-display text-white w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Plus className="h-5 w-5 text-white" />
                </button>
                <Text className="text-gray-400 ml-4">Only {product.stock} left</Text>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <LuxuryButton size="xl" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </LuxuryButton>
              <button className="p-4 rounded-lg border-2 border-white/20 hover:border-emerald-500 hover:bg-emerald-500/20 transition-all">
                <Heart className="h-6 w-6 text-white" />
              </button>
            </div>

            {/* Care Info */}
            <GlassCard variant="dark" className="p-6">
              <Text className="text-white font-medium mb-4">Care Information</Text>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Care Level</span>
                  <span className="text-white font-medium">{product.careLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Light</span>
                  <span className="text-white font-medium">{product.lightLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Water</span>
                  <span className="text-white font-medium">{product.waterLevel}</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  )
}
