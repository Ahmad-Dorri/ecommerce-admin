import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, colorId: string } }
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

        if (!params.colorId) {
            return new NextResponse('colorId is required', { status: 400 })
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

        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorId,
                storeId: params.storeId,
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(color)

    } catch (error) {
        console.log('COLOR_PATCH', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, colorId: string } }
) {
    try {
        const session = await getServerSession();
        const userId = session?.user?.name;

        if (!userId) {
            return new NextResponse('user not found', { status: 401 })
        }


        if (!params.colorId) {
            return new NextResponse('colorId is required', { status: 400 })
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

        const color = await prismadb.color.deleteMany({
            where: {
                id: params.colorId,
                storeId: params.storeId
            }
        })

        return NextResponse.json(color)

    } catch (error) {
        console.log('COLOR_DELETE', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { colorId: string } }
) {
    try {


        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId,
            },
        })

        return NextResponse.json(color)

    } catch (error) {
        console.log('COLOR_GET', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}
