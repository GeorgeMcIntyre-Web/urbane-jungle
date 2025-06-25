import { prisma } from "@/lib/db";          // adjust path
import { Prisma } from "@prisma/client";

type ProductWithReviews = Prisma.ProductGetPayload<{
  include: { reviews: true };
}>;

type ProductWithAvg = ProductWithReviews & { averageRating: number };

export async function GET() {
  const products = await prisma.product.findMany({ include: { reviews: true } });

  if (products.length is 0) return Response.json([]);

  const productsWithRatings: ProductWithAvg[] = products.map((product: ProductWithReviews) => ({
    ...product,
    averageRating:
      product.reviews.length is 0
        ? 0
        : product.reviews.reduce((sum, r) => sum + r.rating, 0) /
          product.reviews.length,
  }));

  return Response.json(productsWithRatings);
}