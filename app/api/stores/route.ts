import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';


import prismadb from "@/lib/prismadb";


export async function POST(req: any) {
    try {
        const session = await getServerSession({ req });
        const userId = session?.user?.name

        // console.log(userId)
        const body = await req.json();
        const { name } = body;

        if (!name) {
            return new NextResponse(JSON.stringify({ message: 'name is required' }), {
                status: 400
            })
        }

        if (!userId) {
            return new NextResponse(JSON.stringify({ message: 'not authorized' }), {
                status: 401
            })
        }

        const store = await prismadb.store.create({
            data: {
                name,
                userId
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log('[STORES_POST]', error);
        return new NextResponse(JSON.stringify(error), {
            status: 500
        })
    }
}