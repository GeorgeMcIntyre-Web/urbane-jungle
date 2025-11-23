
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { products, categories, productImages } from '@/lib/db/schema'
import { eq, desc, sql } from 'drizzle-orm'

export async function GET() {
  try {
    // Note: 'isFeatured' column is missing in schema, using 'isRare' as proxy for now
    // or just taking latest products

    const results = await db.select({
      product: products,
      category: categories
    })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      // .where(eq(products.isRare, true)) // Optional: filter by isRare
      .orderBy(desc(products.createdAt))
      .limit(8)

    // Fetch images for these products
    const productIds = results.map(r => r.product.id)
    const images = productIds.length > 0
      ? await db.select().from(productImages).where(sql`${productImages.productId} IN ${productIds}`).orderBy(productImages.sortOrder)
      : []

    const finalProducts = results.map(r => {
      const prodImages = images.filter(img => img.productId === r.product.id)
      return {
        ...r.product,
        category: r.category,
        images: prodImages,
        reviews: [],
        averageRating: 0,
        reviewCount: 0
      }
    })

    return NextResponse.json({
      products: finalProducts
    })
  } catch (error) {
    console.error('Featured products fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    )
  }
}
