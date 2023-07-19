import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';


import prismadb from "@/lib/prismadb";


export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const session = await getServerSession();
        const userId = session?.user?.name



        // console.log(userId)
        const body = await req.json();
        const { label, imageUrl } = body;

        if (!label) {
            return new NextResponse(JSON.stringify({ message: 'label is required' }), {
                status: 400
            })
        }

        if (!imageUrl) {
            return new NextResponse(JSON.stringify({ message: 'imageUrl is required' }), {
                status: 400
            })
        }

        if (!userId) {
            return new NextResponse(JSON.stringify({ message: 'not authorized' }), {
                status: 401
            })
        }
        if (!params.storeId) {
            return new NextResponse(JSON.stringify({ message: 'store id is required' }), {
                status: 401
            })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            }
        })

        if (!storeByUserId) {
            return new NextResponse('unauthorized', { status: 403 })
        }

        const billboard = await prismadb.billboard.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log('[BILLBOARDS_POST]', error);
        return new NextResponse(JSON.stringify(error), {
            status: 500
        })
    }
}


export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        if (!params.storeId) {
            return new NextResponse(JSON.stringify({ message: 'store id is required' }), {
                status: 401
            })
        }

        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId
            }

        })

        return NextResponse.json(billboards)

    } catch (error) {
        console.log('[BILLBOARDS_GET]', error);
        return new NextResponse(JSON.stringify(error), {
            status: 500
        })
    }
}