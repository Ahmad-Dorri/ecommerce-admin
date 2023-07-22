import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';


import prismadb from "@/lib/prismadb";


export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {
        const session = await getServerSession();
        const userId = session?.user?.name

        const body = await req.json();
        const { name, billboardId } = body;

        if (!name) {
            return new NextResponse(JSON.stringify({ message: 'name is required' }), {
                status: 400
            })
        }


        if (!userId) {
            return new NextResponse(JSON.stringify({ message: 'not authenticated' }), {
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

        const category = await prismadb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId,
            }
        })

        return NextResponse.json(category)

    } catch (error) {
        console.log('[CATEGORIES_POST]', error);
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

        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId,
            }

        })

        return NextResponse.json(categories)

    } catch (error) {
        console.log('[CATEGORIES_GET]', error);
        return new NextResponse(JSON.stringify(error), {
            status: 500
        })
    }
}