'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ShoppingCart, User, Search, Menu, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { NavigationMenu } from '@/components/layout/navigation-menu'
import { CartSheet } from '@/components/cart/cart-sheet'
import { SearchDialog } from '@/components/search/search-dialog'
import { UserMenu } from '@/components/layout/user-menu'
import { MobileMenu } from '@/components/layout/mobile-menu'
import { useCart } from '@/hooks/use-cart'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function Header() {
  const { data: session } = useSession()
  const { itemCount } = useCart()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "bg-jungle-900/80 backdrop-blur-md border-b border-white/10 py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Leaf className="h-8 w-8 text-emerald-500 transition-transform duration-500 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-emerald-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl text-white tracking-wider">URBANE JUNGLE</span>
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-light hidden sm:block">Premium Biophilic Living</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavigationMenu />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex text-white hover:text-emerald-400 hover:bg-white/5"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* User Menu */}
            {session ? (
              <UserMenu />
            ) : (
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm" className="text-white hover:text-emerald-400 hover:bg-white/5">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Sign In</span>
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:text-emerald-400 hover:bg-white/5"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-emerald-600 text-white border-none animate-pulse-gold"
                >
                  {itemCount}
                </Badge>
              )}
              <span className="sr-only">Shopping cart</span>
            </Button>

            {/* Mobile Menu */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white hover:text-emerald-400"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} />

      {/* Cart Sheet */}
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  )
}
