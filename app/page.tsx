import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { MarqueeSection } from '@/components/home/marquee-section'
import { FeaturedCategories } from '@/components/home/featured-categories'
import { ShopTheLook } from '@/components/home/shop-the-look'
import { FeaturedProducts } from '@/components/home/featured-products'
import { NewsletterSection } from '@/components/home/newsletter-section'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-jungle-50 dark:bg-jungle-900">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <MarqueeSection />
        <FeaturedCategories />
        <ShopTheLook />
        <FeaturedProducts />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
