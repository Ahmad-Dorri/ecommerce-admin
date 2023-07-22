import prismadb from '@/lib/prismadb';
import ColorClient from './components/color-client';
import { ColorsColumn } from './components/columns';

import { parseISO } from 'date-fns';
import { format } from 'date-fns-jalali';

export default async function ColorsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedColors: ColorsColumn[] = colors.map((color) => {
    const myDate = parseISO(color.createdAt.toISOString());
    const perisanDate = format(myDate, 'yyyy/MM/dd');
    return {
      id: color.id,
      name: color.name,
      value: color.value,
      createdAt: perisanDate,
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
}
