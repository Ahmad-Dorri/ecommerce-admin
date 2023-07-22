import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const session = await getServerSession();
        const userId = session?.user?.name;
        const body = await req.json();
        const { name, billboardId } = body;


        if (!userId) {
            return new NextResponse('user not found', { status: 401 })
        }

        if (!name) {
            return new NextResponse('name is required', { status: 400 })
        }

        if (!billboardId) {
            return new NextResponse('billboard ID is required', { status: 400 })
        }

        if (!params.categoryId) {
            return new NextResponse('categoryId is required', { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst(
            {
                where: {
                    id: params.storeId,
                }
            }
        )

        if (!storeByUserId) {
            return new NextResponse('unauthorized', { status: 403 })
        }

        const category = await prismadb.category.updateMany({
            where: {
                id: params.categoryId,
                storeId: params.storeId,
            },
            data: {
                name,
                billboardId
            }
        })

        return NextResponse.json(category)

    } catch (error) {
        console.log('CATEGORY_PATCH', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, categoryId: string } }
) {
    try {
        const session = await getServerSession();
        const userId = session?.user?.name;



        if (!userId) {
            return new NextResponse('user not found', { status: 401 })
        }


        if (!params.categoryId) {
            return new NextResponse('categoryID is required', { status: 400 })
        }


        const storeByUserId = await prismadb.store.findFirst(
            {
                where: {
                    id: params.storeId,
                    userId
                }
            }
        )

        if (!storeByUserId) {
            return new NextResponse('unauthorized', { status: 403 })
        }

        const category = await prismadb.category.deleteMany({
            where: {
                id: params.categoryId,
                storeId: params.storeId
            }
        })

        return NextResponse.json(category)

    } catch (error) {
        console.log('CATEGORY_DELETE', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { categoryId: string } }
) {
    try {
        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            },
        })

        return NextResponse.json(category)

    } catch (error) {
        console.log('CATEGORY_GET', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}
