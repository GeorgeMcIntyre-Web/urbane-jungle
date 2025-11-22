'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { LuxuryButton } from '@/components/ui/luxury-button'
import { Heading, Text } from '@/components/ui/typography'
import { GlassCard } from '@/components/ui/glass-card'
import { Input } from '@/components/ui/input'
import { useCart } from '@/contexts/cart-context'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

function CheckoutForm() {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!stripe || !elements) return

        setLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/order-success`,
            },
        })

        if (error) {
            console.error(error)
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <GlassCard variant="dark" className="p-6">
                <PaymentElement />
            </GlassCard>
            <LuxuryButton type="submit" size="xl" className="w-full" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Place Order'}
            </LuxuryButton>
        </form>
    )
}

export default function CheckoutPage() {
    const { items, itemCount } = useCart()
    const [clientSecret] = useState('') // TODO: Get from API

    return (
        <div className="min-h-screen bg-jungle-900 pt-32 pb-24">
            <div className="container mx-auto px-4 max-w-6xl">
                <Heading as="h1" className="text-white mb-12 text-center">Checkout</Heading>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="space-y-6">
                        {/* Shipping */}
                        <GlassCard variant="dark" className="p-6">
                            <Text className="text-white font-medium mb-4">Shipping Information</Text>
                            <div className="space-y-4">
                                <Input placeholder="Full Name" className="bg-white/10 border-white/20 text-white" />
                                <Input placeholder="Email" type="email" className="bg-white/10 border-white/20 text-white" />
                                <Input placeholder="Address" className="bg-white/10 border-white/20 text-white" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="City" className="bg-white/10 border-white/20 text-white" />
                                    <Input placeholder="Postal Code" className="bg-white/10 border-white/20 text-white" />
                                </div>
                            </div>
                        </GlassCard>

                        {/* Payment */}
                        {clientSecret && (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm />
                            </Elements>
                        )}
                    </div>

                    {/* Summary */}
                    <div>
                        <GlassCard variant="dark" className="p-6 sticky top-32">
                            <Text className="text-white font-medium mb-6">Order Summary</Text>
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={`${item.productId}-${item.variantId}`} className="flex justify-between">
                                        <span className="text-gray-400">Product × {item.quantity}</span>
                                        <span className="text-white">R0</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-white/10 pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span className="text-white">R0</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Shipping</span>
                                    <span className="text-white">R250</span>
                                </div>
                                <div className="flex justify-between text-xl font-display border-t border-white/10 pt-4 mt-4">
                                    <span className="text-white">Total</span>
                                    <span className="text-gold">R250</span>
                                </div>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </div>
        </div>
    )
}
