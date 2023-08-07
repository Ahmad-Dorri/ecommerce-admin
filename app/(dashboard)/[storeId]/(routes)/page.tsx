import prismadb from '@/lib/prismadb';
import { NextPage } from 'next';
import { JSXElementConstructor } from 'react';

interface DashboardProps {
  params: { storeId: string };
}

export default async function DashboardPage({ params }: DashboardProps) {
  const store = await prismadb.store.findFirst({
    where: { id: params.storeId },
  });
  return (
    <div>
      <h1 className="text-3xl p-2 font-bold text-gray-900">داشبورد</h1>
      <p className="text-lg font-semibold p-4 text-gray-700">
        فروشگاه: {store?.name}
      </p>
    </div>
  );
}
