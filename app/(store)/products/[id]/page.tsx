import { notFound } from "next/navigation";
import Link from "next/link";
import { getPool } from "@/lib/db";
import { CATEGORIES } from "@/constants";
import type { Product } from "@/constants";
import { ProductDetailClient } from "./product-detail-client";

function normalizeProduct(row: any): Product & { imageUrl?: string } {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    price: parseFloat(row.price),
    originalPrice: row.original_price ? parseFloat(row.original_price) : undefined,
    discountTag: row.discount_tag ?? undefined,
    highlight: row.highlight,
    categoryId: row.category_id,
    unit: row.unit,
    stock: row.stock,
    imageUrl: row.image_url ?? undefined,
  };
}

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);
  if (isNaN(id)) notFound();

  let product: (Product & { imageUrl?: string }) | null = null;
  let relatedProducts: Product[] = [];

  try {
    const pool = getPool();
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0) notFound();
    product = normalizeProduct(result.rows[0]);

    const related = await pool.query(
      "SELECT * FROM products WHERE category_id = $1 AND id != $2 ORDER BY id ASC LIMIT 4",
      [product.categoryId, id]
    );
    relatedProducts = related.rows.map(normalizeProduct);
  } catch (e) {
    console.error("Failed to fetch product:", e);
    notFound();
  }

  const category = CATEGORIES.find((c) => c.id === product!.categoryId);

  return <ProductDetailClient product={product!} category={category} relatedProducts={relatedProducts} />;
}
