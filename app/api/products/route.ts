import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  try {
    const pool = getPool();
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id ASC"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ error: "Erro ao buscar produtos" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      brand,
      price,
      original_price,
      discount_tag,
      highlight,
      category_id,
      unit,
      stock,
    } = body;

    if (!name || !brand || !price || !category_id || !unit) {
      return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
    }

    const pool = getPool();
    const { image_url } = body;
    const result = await pool.query(
      `INSERT INTO products (name, brand, price, original_price, discount_tag, highlight, category_id, unit, stock, image_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [
        name,
        brand,
        parseFloat(price),
        original_price ? parseFloat(original_price) : null,
        discount_tag || null,
        highlight ?? false,
        parseInt(category_id),
        unit,
        stock || "available",
        image_url || null,
      ]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 });
  }
}
