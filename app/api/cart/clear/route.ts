
export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { db } from '@/lib/db'
import { cartItems, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function POST() {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userResult = await db.select().from(users).where(eq(users.email, session.user.email)).limit(1)
    const user = userResult[0]

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    await db.delete(cartItems).where(eq(cartItems.userId, user.id))

    return NextResponse.json({ message: 'Cart cleared' })
  } catch (error) {
    console.error('Clear cart error:', error)
    return NextResponse.json(
      { error: 'Failed to clear cart' },
      { status: 500 }
    )
  }
}
