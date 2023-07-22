import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        const session = await getServerSession();
        const userId = session?.user?.name;
        const body = await req.json();
        const { name, value } = body;



        if (!userId) {
            return new NextResponse('user not found', { status: 401 })
        }

        if (!name) {
            return new NextResponse('name is required', { status: 400 })
        }
        if (!value) {
            return new NextResponse('value is required', { status: 400 })
        }

        if (!params.sizeId) {
            return new NextResponse('sizeId is required', { status: 400 })
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

        const size = await prismadb.size.updateMany({
            where: {
                id: params.sizeId,
                storeId: params.storeId,
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(size)

    } catch (error) {
        console.log('SIZE_PATCH', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {
        const session = await getServerSession();
        const userId = session?.user?.name;

        if (!userId) {
            return new NextResponse('user not found', { status: 401 })
        }


        if (!params.sizeId) {
            return new NextResponse('sizeId is required', { status: 400 })
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

        const size = await prismadb.size.deleteMany({
            where: {
                id: params.sizeId,
                storeId: params.storeId
            }
        })

        return NextResponse.json(size)

    } catch (error) {
        console.log('SIZE_DELETE', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { sizeId: string } }
) {
    try {


        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId,
            },
        })

        return NextResponse.json(size)

    } catch (error) {
        console.log('SIZE_GET', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}
