import { Pool } from "pg";

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  return pool;
}

export type ProductRow = {
  id: number;
  name: string;
  brand: string;
  price: string;
  original_price: string | null;
  discount_tag: string | null;
  highlight: boolean;
  category_id: number;
  unit: string;
  stock: "available" | "low" | "out";
  created_at: string;
  updated_at: string;
};
