import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
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
      return new NextResponse('user not found', { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse('productId is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        // userId
      },
    });

    if (!storeByUserId) {
      return new NextResponse('unauthorized', { status: 403 });
    }

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        isFeatured,
        isArchived,
        categoryId,
        colorId,
        sizeId,
        storeId: params.storeId,
        images: {
          deleteMany: {},
        },
      },
    });

    const product = await prismadb.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('PRODUCT_PATCH', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const session = await getServerSession();
    const userId = session?.user?.name;

    if (!userId) {
      return new NextResponse('user not found', { status: 401 });
    }

    if (!params.productId) {
      return new NextResponse('productId is required', { status: 400 });
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('PRODUCT_DELETE', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log('PRODUCT_GET', error);
    return new NextResponse('Internal error 500', { status: 500 });
  }
}
