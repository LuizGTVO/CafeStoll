import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { supabaseAdmin } from '@/lib/supabase';

// DELETE /api/products/[id]
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: 'Produto excluído com sucesso!' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Erro ao excluir produto' }, { status: 500 });
  }
}

// PUT /api/products/[id]
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const price = Number(formData.get('price'));
    const categoryId = formData.get('categoryId') as string;
    const isFeatured = formData.get('isFeatured') === 'true';
    const imageFile = formData.get('image') as File | null;
    let imageUrl = formData.get('imageUrl') as string || '';

    const prepTime = formData.get('prepTime') as string || null;
    const portion = formData.get('portion') as string || null;

    let ingredients: string[] = [];
    const ingredientsRaw = formData.get('ingredients') as string;
    if (ingredientsRaw) {
      try {
        ingredients = JSON.parse(ingredientsRaw);
      } catch {
        ingredients = ingredientsRaw.split(',').map(i => i.trim()).filter(Boolean);
      }
    }

    let allergens: string[] = [];
    const allergensRaw = formData.get('allergens') as string;
    if (allergensRaw) {
      try {
        allergens = JSON.parse(allergensRaw);
      } catch {
        allergens = allergensRaw.split(',').map(a => a.trim()).filter(Boolean);
      }
    }

    if (!name || !slug || !description || !price || !categoryId) {
      return NextResponse.json({ error: 'Campos obrigatórios ausentes' }, { status: 400 });
    }

    // Check if a new file is uploaded
    if (imageFile && imageFile.size > 0) {
      const BUCKET = 'cafestoll-images';
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const ext = imageFile.name.split('.').pop() || 'jpg';
      const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;

      const { data: buckets } = await supabaseAdmin.storage.listBuckets();
      if (!buckets?.some(b => b.name === BUCKET)) {
        await supabaseAdmin.storage.createBucket(BUCKET, { public: true });
      }

      const { error: uploadError } = await supabaseAdmin.storage
        .from(BUCKET)
        .upload(uniqueName, buffer, { contentType: imageFile.type, upsert: false });

      if (!uploadError) {
        const { data: { publicUrl } } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(uniqueName);
        imageUrl = publicUrl;
      }
    }

    // If we don't have a new upload, make sure we keep the old image URL
    if (!imageUrl) {
      const existingProduct = await prisma.product.findUnique({ where: { id } });
      if (existingProduct) {
        imageUrl = existingProduct.imageUrl;
      }
    }

    if (!imageUrl) {
      return NextResponse.json({ error: 'Uma imagem ou link de imagem é obrigatória' }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        price,
        imageUrl,
        categoryId,
        isFeatured,
        prepTime,
        portion,
        ingredients,
        allergens
      },
    });

    return NextResponse.json({ message: 'Produto atualizado com sucesso!', product }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: error.message || 'Erro ao atualizar produto' }, { status: 500 });
  }
}
