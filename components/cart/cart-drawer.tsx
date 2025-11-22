'use client'

import { useState } from 'react'
import { X, Minus, Plus, ShoppingCart } from 'lucide-react'
import { LuxuryButton } from '@/components/ui/luxury-button'
import { GlassCard } from '@/components/ui/glass-card'
import { Heading, Text } from '@/components/ui/typography'
import { useCart } from '@/contexts/cart-context'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { items, removeItem, updateQuantity, itemCount } = useCart()

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-jungle-900 shadow-2xl z-50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10">
                            <div className="flex justify-between items-center">
                                <Heading as="h2" className="text-white">Your Cart ({itemCount})</Heading>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <X className="h-6 w-6 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingCart className="h-16 w-16 text-white/20 mx-auto mb-4" />
                                    <Text className="text-gray-400 mb-6">Your urban jungle awaits...</Text>
                                    <LuxuryButton onClick={onClose}>Continue Shopping</LuxuryButton>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <GlassCard key={`${item.productId}-${item.variantId}`} variant="dark" className="p-4">
                                        <div className="flex gap-4">
                                            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                                <div className="w-full h-full bg-white/10" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-medium mb-2">Product Name</h4>
                                                <p className="text-gold mb-3">R2,500</p>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1), item.variantId)}
                                                        className="p-1 rounded bg-white/10 hover:bg-white/20"
                                                    >
                                                        <Minus className="h-4 w-4 text-white" />
                                                    </button>
                                                    <span className="text-white w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                                                        className="p-1 rounded bg-white/10 hover:bg-white/20"
                                                    >
                                                        <Plus className="h-4 w-4 text-white" />
                                                    </button>
                                                    <button
                                                        onClick={() => removeItem(item.productId, item.variantId)}
                                                        className="ml-auto text-red-400 hover:text-red-300 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </GlassCard>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 space-y-4">
                                <div className="flex justify-between text-xl">
                                    <span className="text-white font-medium">Total</span>
                                    <span className="text-gold font-display">R0</span>
                                </div>
                                <LuxuryButton size="xl" className="w-full">
                                    Proceed to Checkout
                                </LuxuryButton>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
