import Link from 'next/link'
import { Leaf, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function Footer() {
  return (
    <footer className="bg-jungle-900 border-t border-white/10 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <Leaf className="h-6 w-6 text-emerald-500 group-hover:rotate-12 transition-transform" />
              <span className="font-display font-bold text-xl tracking-widest">URBANE JUNGLE</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Elevating urban living through biophilic design. We curate the world's most exquisite plants for the modern home.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-emerald-400 hover:bg-white/5 rounded-full">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-emerald-400 hover:bg-white/5 rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-emerald-400 hover:bg-white/5 rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-semibold text-gold-light">Collections</h4>
            <div className="space-y-3 text-sm">
              <Link href="/collections/rare-aroids" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Rare Aroids
              </Link>
              <Link href="/collections/large-statement" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Large Statement Plants
              </Link>
              <Link href="/collections/pet-friendly" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Pet Friendly
              </Link>
              <Link href="/collections/luxury-pots" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Luxury Planters
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-semibold text-gold-light">Concierge</h4>
            <div className="space-y-3 text-sm">
              <Link href="/shipping" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                White Glove Delivery
              </Link>
              <Link href="/guarantee" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                30-Day Guarantee
              </Link>
              <Link href="/care-guides" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Care Guides
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-emerald-400 transition-colors">
                Contact Concierge
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-serif text-lg font-semibold text-gold-light">Visit Us</h4>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-emerald-500 mt-0.5" />
                <span>123 Botanical Way<br />Sandton, Johannesburg</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-emerald-500" />
                <span>+27 10 555 0123</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-emerald-500" />
                <span>concierge@urbanejungle.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Urbane Jungle. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
