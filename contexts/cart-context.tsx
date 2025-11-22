'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type CartItem = {
    productId: string
    variantId?: string
    quantity: number
}

type CartContextType = {
    items: CartItem[]
    addItem: (productId: string, variantId?: string, quantity?: number) => void
    removeItem: (productId: string, variantId?: string) => void
    updateQuantity: (productId: string, quantity: number, variantId?: string) => void
    clearCart: () => void
    itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])

    useEffect(() => {
        const saved = localStorage.getItem('cart')
        if (saved) {
            setItems(JSON.parse(saved))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items))
    }, [items])

    const addItem = (productId: string, variantId?: string, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(i => i.productId === productId && i.variantId === variantId)
            if (existing) {
                return prev.map(i =>
                    i.productId === productId && i.variantId === variantId
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                )
            }
            return [...prev, { productId, variantId, quantity }]
        })
    }

    const removeItem = (productId: string, variantId?: string) => {
        setItems(prev => prev.filter(i => !(i.productId === productId && i.variantId === variantId)))
    }

    const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
        setItems(prev =>
            prev.map(i =>
                i.productId === productId && i.variantId === variantId
                    ? { ...i, quantity }
                    : i
            )
        )
    }

    const clearCart = () => setItems([])

    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart must be used within CartProvider')
    }
    return context
}
