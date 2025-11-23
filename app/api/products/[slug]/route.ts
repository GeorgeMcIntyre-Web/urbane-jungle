export const dynamic = 'force-dynamic'

import { db } from "@/lib/db"
import { products, categories, productImages } from "@/lib/db/schema"
import { eq, sql } from "drizzle-orm"
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const result = await db.select({
      product: products,
      category: categories
    })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.slug, slug))
      .limit(1)

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    const { product, category } = result[0]

    // Fetch images
    const images = await db.select()
      .from(productImages)
      .where(eq(productImages.productId, product.id))
      .orderBy(productImages.sortOrder)

    return NextResponse.json({
      ...product,
      category,
      images,
      reviews: [], // Not implemented
      averageRating: 0,
      reviewCount: 0
    })
  } catch (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}