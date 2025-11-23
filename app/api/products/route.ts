
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { products, categories, productImages } from '@/lib/db/schema'
import { eq, and, gte, lte, like, desc, asc, sql } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const categorySlug = searchParams.get('category')
    const careLevel = searchParams.get('careLevel')
    const lightLevel = searchParams.get('lightRequirement') // Mapped from lightRequirement
    const isPetSafe = searchParams.get('isPetSafe')
    const size = searchParams.get('plantSize') // Mapped from plantSize
    const sortBy = searchParams.get('sortBy') || 'name'
    const sortOrder = searchParams.get('sortOrder') || 'asc'
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    const offset = (page - 1) * limit

    // Build filters
    const conditions = []

    // We handle category filtering by joining or subquery, but for now let's fetch and filter or use relational query
    // Drizzle relational query is best here

    const where: any = (table: any, { eq, and, gte, lte, inArray }: any) => {
      const filters = []

      if (categorySlug) {
        // This is tricky in relational query without joining. 
        // We might need to fetch category ID first or use a more complex query.
        // For simplicity, let's assume we can filter by category relation if we had it set up, 
        // but schema doesn't show explicit relations defined in `relations` function yet.
        // So we might need to use raw SQL or standard query builder.
      }

      if (careLevel) filters.push(eq(table.careLevel, careLevel))
      if (lightLevel) filters.push(eq(table.lightLevel, lightLevel))
      if (isPetSafe) filters.push(eq(table.isPetSafe, isPetSafe === 'true'))
      // if (size) filters.push(eq(table.size, size)) // Note: size is in productVariants, not products table in new schema? 
      // Wait, schema has `productVariants` with `size`. Products table doesn't have size.

      if (minPrice) filters.push(gte(table.basePrice, parseFloat(minPrice)))
      if (maxPrice) filters.push(lte(table.basePrice, parseFloat(maxPrice)))

      return and(...filters)
    }

    // Since schema definitions for relations are missing in schema.ts (we only defined tables),
    // db.query.products.findMany won't automatically know about 'category' or 'images' relations 
    // unless we define them using `relations`.

    // FALLBACK: Use standard Query Builder (db.select) which is safer given the current schema state.

    let baseQuery = db.select({
      product: products,
      category: categories,
      // We can't easily json_agg images in sqlite without some work, or we make separate queries.
      // For listing, maybe just fetch products and categories first.
    })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))

    // Apply filters
    const filters = []
    if (categorySlug) filters.push(eq(categories.slug, categorySlug))
    if (careLevel) filters.push(eq(products.careLevel, careLevel))
    if (lightLevel) filters.push(eq(products.lightLevel, lightLevel))
    if (isPetSafe) filters.push(eq(products.isPetSafe, isPetSafe === 'true'))
    if (minPrice) filters.push(gte(products.basePrice, parseFloat(minPrice)))
    if (maxPrice) filters.push(lte(products.basePrice, parseFloat(maxPrice)))

    if (filters.length > 0) {
      baseQuery = baseQuery.where(and(...filters)) as any
    }

    // Apply sorting
    if (sortBy === 'price') {
      baseQuery = baseQuery.orderBy(sortOrder === 'desc' ? desc(products.basePrice) : asc(products.basePrice)) as any
    } else if (sortBy === 'created') {
      baseQuery = baseQuery.orderBy(sortOrder === 'desc' ? desc(products.createdAt) : asc(products.createdAt)) as any
    } else {
      baseQuery = baseQuery.orderBy(sortOrder === 'desc' ? desc(products.name) : asc(products.name)) as any
    }

    // Pagination
    const results = await baseQuery.limit(limit).offset(offset)

    // Fetch images for these products
    const productIds = results.map(r => r.product.id)
    const images = productIds.length > 0
      ? await db.select().from(productImages).where(sql`${productImages.productId} IN ${productIds}`).orderBy(productImages.sortOrder)
      : []

    // Combine data
    const finalProducts = results.map(r => {
      const prodImages = images.filter(img => img.productId === r.product.id)
      return {
        ...r.product,
        category: r.category,
        images: prodImages,
        reviews: [], // Reviews not implemented yet
        averageRating: 0,
        reviewCount: 0
      }
    })

    // Get total count for pagination
    // This is a separate query
    const countQuery = db.select({ count: sql<number>`count(*)` })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))

    if (filters.length > 0) {
      // Re-apply filters for count
      // Note: This is a bit repetitive, ideally we'd build the conditions array once
      // But for now this works
      // We need to use the exact same where clause
      // Let's just run it.
      // Actually, we can't easily reuse the modified query object for count in Drizzle without cloning.
      // Let's just fetch all matching rows count.
      // For simplicity in this migration, let's just use the length of results if no pagination, 
      // but we have pagination.
      // We'll skip precise count with filters for this iteration to save complexity, 
      // or just run a simplified count query.
    }

    // Simplified total count (ignoring filters for a moment to ensure stability, or implement properly)
    // Let's implement properly
    let countBuilder = db.select({ count: sql<number>`count(*)` }).from(products).leftJoin(categories, eq(products.categoryId, categories.id))
    if (filters.length > 0) {
      countBuilder = countBuilder.where(and(...filters)) as any
    }
    const countResult = await countBuilder
    const total = countResult[0]?.count || 0

    return NextResponse.json({
      products: finalProducts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
