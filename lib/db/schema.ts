import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Users
export const users = sqliteTable('users', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// Categories / Collections
export const categories = sqliteTable('categories', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    image: text('image'),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// Products
export const products = sqliteTable('products', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description').notNull(),
    basePrice: real('base_price').notNull(),
    isOnSale: integer('is_on_sale', { mode: 'boolean' }).default(false),
    salePrice: real('sale_price'),
    categoryId: text('category_id').references(() => categories.id),
    careLevel: text('care_level'), // Easy, Moderate, Expert
    lightLevel: text('light_level'), // Low, Medium, Bright
    waterLevel: text('water_level'), // Low, Medium, High
    isPetSafe: integer('is_pet_safe', { mode: 'boolean' }).default(false),
    isRare: integer('is_rare', { mode: 'boolean' }).default(false),
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// Product Images
export const productImages = sqliteTable('product_images', {
    id: text('id').primaryKey(),
    productId: text('product_id').notNull().references(() => products.id),
    url: text('url').notNull(),
    altText: text('alt_text'),
    isPrimary: integer('is_primary', { mode: 'boolean' }).default(false),
    sortOrder: integer('sort_order').default(0),
});

// Product Variants (Size, Pot Option)
export const productVariants = sqliteTable('product_variants', {
    id: text('id').primaryKey(),
    productId: text('product_id').notNull().references(() => products.id),
    name: text('name').notNull(), // e.g., "Small - Nursery Pot", "Large - Brass Planter"
    size: text('size'), // Small, Medium, Large, XL
    potType: text('pot_type'), // Nursery, Ceramic, Brass, Terracotta
    priceAdjustment: real('price_adjustment').default(0),
    stock: integer('stock').notNull().default(0),
    sku: text('sku'),
});

// Orders
export const orders = sqliteTable('orders', {
    id: text('id').primaryKey(),
    customerName: text('customer_name').notNull(),
    customerEmail: text('customer_email').notNull(),
    totalAmount: real('total_amount').notNull(),
    status: text('status').default('pending'), // pending, paid, shipped, delivered, cancelled
    stripePaymentIntentId: text('stripe_payment_intent_id'),
    shippingAddress: text('shipping_address'), // JSON string
    createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// Order Items
export const orderItems = sqliteTable('order_items', {
    id: text('id').primaryKey(),
    orderId: text('order_id').notNull().references(() => orders.id),
    productId: text('product_id').notNull().references(() => products.id),
    variantId: text('variant_id').references(() => productVariants.id),
    quantity: integer('quantity').notNull(),
    priceAtPurchase: real('price_at_purchase').notNull(),
});
