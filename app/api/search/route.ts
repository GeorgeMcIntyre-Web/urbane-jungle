
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { products, categories, productImages } from '@/lib/db/schema'
import { eq, or, like, sql, and } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ products: [] })
    }

    const searchPattern = `%${query}%`

    const results = await db.select({
      product: products,
      categoryName: categories.name
    })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(
        or(
          like(products.name, searchPattern),
          like(products.description, searchPattern),
          like(categories.name, searchPattern)
        )
      )
      .limit(10)

    // Fetch primary images
    const productIds = results.map(r => r.product.id)
    const images = productIds.length > 0
      ? await db.select().from(productImages)
        .where(and(
          sql`${productImages.productId} IN ${productIds}`,
          eq(productImages.isPrimary, true)
        ))
      : []

    const formattedProducts = results.map(r => {
      const primaryImage = images.find(img => img.productId === r.product.id)
      return {
        ...r.product,
        category: { name: r.categoryName },
        images: primaryImage ? [primaryImage] : []
      }
    })

    return NextResponse.json({ products: formattedProducts })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    )
  }
}
