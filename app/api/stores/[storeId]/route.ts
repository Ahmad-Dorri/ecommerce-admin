import prismadb from "@/lib/prismadb";
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const session = await getServerSession();
        const userId = session?.user?.name;
        const body = await req.json();
        const { name } = body;



        if (!userId) {
            return new NextResponse('user not found', { status: 401 })
        }

        if (!name) {
            return new NextResponse('name is required', { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse('storeId is required', { status: 400 })
        }

        const store = await prismadb.store.updateMany({
            where: {
                userId,
                id: params.storeId
            },
            data: {
                name
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('STORE_PATCH', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const session = await getServerSession();
        const userId = session?.user?.name;



        if (!userId) {
            return new NextResponse('user not found', { status: 401 })
        }


        if (!params.storeId) {
            return new NextResponse('storeId is required', { status: 400 })
        }

        const store = await prismadb.store.deleteMany({
            where: {
                userId,
                id: params.storeId
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('STORE_DELETE', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}