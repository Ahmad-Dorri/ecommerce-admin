import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const session = await getServerSession();
        const userId = session?.user?.name;
        const body = await req.json();
        const { imageUrl, label } = body;



        if (!userId) {
            return new NextResponse('user not found', { status: 401 })
        }

        if (!label) {
            return new NextResponse('label is required', { status: 400 })
        }
        if (!imageUrl) {
            return new NextResponse('image url is required', { status: 400 })
        }

        if (!params.billboardId) {
            return new NextResponse('billboardId is required', { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst(
            {
                where: {
                    id: params.storeId,
                    // userId
                }
            }
        )

        if (!storeByUserId) {
            return new NextResponse('unauthorized', { status: 403 })
        }

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId,
                storeId: params.storeId,
            },
            data: {
                imageUrl,
                label
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('BILLBOARD_PATCH', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const session = await getServerSession();
        const userId = session?.user?.name;



        if (!userId) {
            return new NextResponse('user not found', { status: 401 })
        }


        if (!params.billboardId) {
            return new NextResponse('billboardId is required', { status: 400 })
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

        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId,
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('BILLBOARD_DELETE', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {


        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
            },
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('BILLBOARD_GET', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}
