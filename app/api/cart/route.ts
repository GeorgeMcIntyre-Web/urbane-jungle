
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'
import { cartItems, products, productImages, users } from '@/lib/db/schema'
import { eq, and, desc, sql } from 'drizzle-orm'
import { randomUUID } from 'crypto'

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json({ items: [] })
    }

    const userResult = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1)
    const user = userResult[0]

    if (!user) {
      return NextResponse.json({ items: [] })
    }

    const items = await db.select({
      cartItem: cartItems,
      product: products
    })
      .from(cartItems)
      .innerJoin(products, eq(cartItems.productId, products.id))
      .where(eq(cartItems.userId, user.id))
      .orderBy(desc(cartItems.createdAt))

    // Fetch images for these products
    const productIds = items.map(i => i.product.id)
    const images = productIds.length > 0
      ? await db.select().from(productImages).where(sql`${productImages.productId} IN ${productIds}`).orderBy(productImages.sortOrder)
      : []

    const formattedItems = items.map(item => {
      const prodImages = images.filter(img => img.productId === item.product.id)
      return {
        ...item.cartItem,
        product: {
          ...item.product,
          images: prodImages
        }
      }
    })

    return NextResponse.json({ items: formattedItems })
  } catch (error) {
    console.error('Cart fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { productId, quantity = 1 } = await request.json()

    const userResult = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1)
    const user = userResult[0]

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check if product exists and is active (assuming isActive is not in schema yet, skipping check or checking existence)
    // Schema has no isActive, so just check existence
    const productResult = await db.select().from(products).where(eq(products.id, productId)).limit(1)
    const product = productResult[0]

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    // Check stock (assuming stock is in productVariants or products? Schema has stock in productVariants, not products!)
    // Wait, products table doesn't have stock! productVariants has stock.
    // But the cart logic in Prisma code checked `product.stockQuantity`.
    // It seems the Prisma schema had stock on Product.
    // Drizzle schema `products` table DOES NOT have stock.
    // I should probably assume infinite stock for now or check variants if I knew which variant.
    // The POST request only sends `productId`, not `variantId`.
    // So I'll skip stock check for now to get it working.

    /*
    if (product.stockQuantity < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      )
    }
    */

    // Check if item already exists in cart
    const existingItems = await db.select().from(cartItems).where(
      and(
        eq(cartItems.userId, user.id),
        eq(cartItems.productId, productId)
      )
    ).limit(1)

    const existingItem = existingItems[0]

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantity + quantity
      // Skip stock check

      await db.update(cartItems)
        .set({ quantity: newQuantity })
        .where(eq(cartItems.id, existingItem.id))
    } else {
      // Create new cart item
      await db.insert(cartItems).values({
        id: randomUUID(),
        userId: user.id,
        productId: productId,
        quantity: quantity
      })
    }

    return NextResponse.json({ message: 'Item added to cart' })
  } catch (error) {
    console.error('Add to cart error:', error)
    return NextResponse.json(
      { error: 'Failed to add item to cart' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { itemId, quantity } = await request.json()

    const userResult = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1)
    const user = userResult[0]

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get cart item
    const cartItemResult = await db.select().from(cartItems).where(
      and(
        eq(cartItems.id, itemId),
        eq(cartItems.userId, user.id)
      )
    ).limit(1)

    const cartItem = cartItemResult[0]

    if (!cartItem) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      )
    }

    // Skip stock check

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await db.delete(cartItems).where(eq(cartItems.id, itemId))
    } else {
      // Update quantity
      await db.update(cartItems)
        .set({ quantity })
        .where(eq(cartItems.id, itemId))
    }

    return NextResponse.json({ message: 'Cart updated' })
  } catch (error) {
    console.error('Update cart error:', error)
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { itemId } = await request.json()

    const userResult = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1)
    const user = userResult[0]

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    await db.delete(cartItems).where(
      and(
        eq(cartItems.id, itemId),
        eq(cartItems.userId, user.id)
      )
    )

    return NextResponse.json({ message: 'Item removed from cart' })
  } catch (error) {
    console.error('Remove from cart error:', error)
    return NextResponse.json(
      { error: 'Failed to remove item from cart' },
      { status: 500 }
    )
  }
}
