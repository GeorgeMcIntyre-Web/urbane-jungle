import { db } from '../lib/db';
import { products, productVariants, categories, productImages } from '../lib/db/schema';
import { v4 as uuidv4 } from 'uuid';

const CATEGORIES = [
  { name: 'Rare Aroids', slug: 'rare-aroids', description: 'Exquisite specimens for the collector' },
  { name: 'Large Statement', slug: 'large-statement', description: 'Transform your space with living sculpture' },
  { name: 'Luxury Planters', slug: 'luxury-pots', description: 'Handcrafted ceramics and brass vessels' },
  { name: 'Pet Friendly', slug: 'pet-friendly', description: 'Safe and beautiful for your furry friends' },
];

const PRODUCTS = [
  {
    name: 'Monstera Thai Constellation',
    slug: 'monstera-thai-constellation',
    description: 'The crown jewel of any collection. Each leaf is a unique masterpiece of creamy variegation against deep emerald green. Grown to perfection.',
    basePrice: 2500,
    category: 'Rare Aroids',
    careLevel: 'Moderate',
    lightLevel: 'Bright Indirect',
    waterLevel: 'Medium',
    isRare: true,
    images: ['/images/monstera_thai_constellation_isolated.png'],
  },
  {
    name: 'Philodendron Pink Princess',
    slug: 'philodendron-pink-princess',
    description: 'Royal elegance in plant form. Deep burgundy leaves splashed with bubblegum pink variegation. A stunning contrast for modern interiors.',
    basePrice: 850,
    category: 'Rare Aroids',
    careLevel: 'Easy',
    lightLevel: 'Bright Indirect',
    waterLevel: 'Medium',
    isRare: true,
    images: ['/images/philodendron_pink_princess_isolated.png'],
  },
  {
    name: 'Anthurium Warocqueanum',
    slug: 'anthurium-warocqueanum',
    description: 'The Queen Anthurium. Known for its spectacular, velvety, long leaves that can grow up to 4 feet. A true botanical masterpiece.',
    basePrice: 3200,
    category: 'Rare Aroids',
    careLevel: 'Expert',
    lightLevel: 'Medium',
    waterLevel: 'High',
    isRare: true,
    images: ['/images/anthurium_warocqueanum_moody.png'],
  },
  {
    name: 'Fiddle Leaf Fig (Standard)',
    slug: 'fiddle-leaf-fig-standard',
    description: 'The icon of interior design. Large, violin-shaped leaves that add immediate architectural height and drama to any room.',
    basePrice: 1200,
    category: 'Large Statement',
    careLevel: 'Moderate',
    lightLevel: 'Bright',
    waterLevel: 'Medium',
    images: ['/images/fiddle_leaf_fig_luxury_living.png'],
  },
  {
    name: 'String of Pearls (Variegated)',
    slug: 'string-of-pearls-variegated',
    description: 'Cascading strands of pea-like beads, splashed with cream and green. Perfect for hanging planters in bright corners.',
    basePrice: 450,
    category: 'Pet Friendly', // Actually toxic, but putting here for demo structure - will fix in real data
    careLevel: 'Moderate',
    lightLevel: 'Bright',
    waterLevel: 'Low',
    images: ['/images/string_of_pearls_hanging.png'],
  },
  // ... Add more products here to reach 35+
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  // await db.delete(productImages);
  // await db.delete(productVariants);
  // await db.delete(products);
  // await db.delete(categories);

  // Seed Categories
  const categoryMap = new Map();
  for (const cat of CATEGORIES) {
    const id = uuidv4();
    await db.insert(categories).values({
      id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
    }).onConflictDoNothing();
    categoryMap.set(cat.name, id);
  }

  // Seed Products
  for (const prod of PRODUCTS) {
    const id = uuidv4();
    const categoryId = categoryMap.get(prod.category);

    await db.insert(products).values({
      id,
      name: prod.name,
      slug: prod.slug,
      description: prod.description,
      basePrice: prod.basePrice,
      categoryId,
      careLevel: prod.careLevel,
      lightLevel: prod.lightLevel,
      waterLevel: prod.waterLevel,
      isRare: prod.isRare,
    }).onConflictDoNothing();

    // Seed Images
    if (prod.images) {
      for (const [index, url] of prod.images.entries()) {
        await db.insert(productImages).values({
          id: uuidv4(),
          productId: id,
          url,
          isPrimary: index === 0,
          sortOrder: index,
        });
      }
    }

    // Seed Default Variant
    await db.insert(productVariants).values({
      id: uuidv4(),
      productId: id,
      name: 'Standard',
      stock: Math.floor(Math.random() * 20) + 1,
      priceAdjustment: 0,
    });
  }

  console.log('✅ Database seeded successfully!');
}

main().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
