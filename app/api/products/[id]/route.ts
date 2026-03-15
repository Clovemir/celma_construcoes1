import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pool = getPool();
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      params.id,
    ]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json({ error: "Erro ao buscar produto" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { image_url } = body;
    const pool = getPool();
    const result = await pool.query(
      `UPDATE products
       SET name=$1, brand=$2, price=$3, original_price=$4, discount_tag=$5,
           highlight=$6, category_id=$7, unit=$8, stock=$9, image_url=$10, updated_at=NOW()
       WHERE id=$11
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
        params.id,
      ]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);
    return NextResponse.json({ error: "Erro ao atualizar produto" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pool = getPool();
    const result = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING id",
      [params.id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json({ error: "Erro ao excluir produto" }, { status: 500 });
  }
}
