import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Formato inválido. Use JPG, PNG ou WebP." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const resized = await sharp(buffer)
      .resize(400, 300, { fit: "cover", position: "center" })
      .webp({ quality: 85 })
      .toBuffer();

    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.webp`;
    const uploadDir = join(process.cwd(), "public", "uploads");
    await writeFile(join(uploadDir, filename), resized);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Erro ao processar imagem" }, { status: 500 });
  }
}
