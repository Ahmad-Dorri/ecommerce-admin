import prismadb from '@/lib/prismadb';
import BillboardClient from './components/billboard-client';
import { BillboardColumn } from './components/columns';

import { parseISO } from 'date-fns';
import { format } from 'date-fns-jalali';

export default async function BillboardsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((billboard) => {
    const myDate = parseISO(billboard.createdAt.toISOString());
    const perisanDate = format(myDate, 'yyyy/MM/dd');
    return {
      id: billboard.id,
      label: billboard.label,
      imageUrl: billboard.imageUrl,
      createdAt: perisanDate,
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
}
