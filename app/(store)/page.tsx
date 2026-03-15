import { BRANDS, CITIES, type Product } from "@/constants";
import { HomePageContent } from "@/components/home/home-page-content";
import { getPool } from "@/lib/db";

function normalizeProduct(row: any): Product {
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

export default async function HomePage() {
  let products: Product[] = [];
  try {
    const pool = getPool();
    const result = await pool.query("SELECT * FROM products ORDER BY id ASC");
    products = result.rows.map(normalizeProduct);
  } catch (e) {
    console.error("Failed to fetch products from DB:", e);
  }

  return (
    <HomePageContent products={products} brands={BRANDS} cities={CITIES} />
  );
}
