import prismadb from '@/lib/prismadb';
import SizeClient from './components/size-client';
import { SizesColumn } from './components/columns';

import { parseISO } from 'date-fns';
import { format } from 'date-fns-jalali';

export default async function SizesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedSizes: SizesColumn[] = sizes.map((size) => {
    const myDate = parseISO(size.createdAt.toISOString());
    const perisanDate = format(myDate, 'yyyy/MM/dd');
    return {
      id: size.id,
      name: size.name,
      value: size.value,
      createdAt: perisanDate,
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <SizeClient data={formattedSizes} />
      </div>
    </div>
  );
}
