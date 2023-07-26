import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getServerSession();
    const userId = session?.user?.name;

    const body = await req.json();
    const {
      name,
      price,
      isFeatured,
      isArchived,
      images,
      categoryId,
      colorId,
      sizeId,
    } = body;

    if (!name) {
      return new NextResponse(JSON.stringify({ message: 'name is required' }), {
        status: 400,
      });
    }

    if (!price) {
      return new NextResponse(
        JSON.stringify({ message: 'price is required' }),
        {
          status: 400,
        }
      );
    }
    if (images.length === 0 || !images) {
      return new NextResponse(
        JSON.stringify({ message: 'images is required' }),
        {
          status: 400,
        }
      );
    }
    if (!colorId) {
      return new NextResponse(
        JSON.stringify({ message: 'color is required' }),
        {
          status: 400,
        }
      );
    }
    if (!categoryId) {
      return new NextResponse(
        JSON.stringify({ message: 'category is required' }),
        {
          status: 400,
        }
      );
    }
    if (!sizeId) {
      return new NextResponse(JSON.stringify({ message: 'size is required' }), {
        status: 400,
      });
    }

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: 'not authorized' }), {
        status: 401,
      });
    }
    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ message: 'store id is required' }),
        {
          status: 401,
        }
      );
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse('unauthorized', { status: 403 });
    }

    const category = await prismadb.category.findFirst({
      where: {
        id: categoryId,
      },
    });
    const product = await prismadb.product.create({
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        isArchived,
        isFeatured,
        storeId: params.storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('categoryId') || undefined;
    const sizeId = searchParams.get('sizeId') || undefined;
    const colorId = searchParams.get('colorId') || undefined;
    const isFeatured = searchParams.get('isFeatured') || undefined;

    if (!params.storeId) {
      return new NextResponse(
        JSON.stringify({ message: 'store id is required' }),
        {
          status: 401,
        }
      );
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeId,
        categoryId,
        sizeId,
        colorId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[PRODUCTS_GET]', error);
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
}
