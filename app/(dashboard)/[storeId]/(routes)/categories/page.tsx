import prismadb from '@/lib/prismadb';
import CategoryClient from './components/category-client';
import { CategoryColumn } from './components/columns';

import { parseISO } from 'date-fns';
import { format } from 'date-fns-jalali';

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => {
    const myDate = parseISO(category.createdAt.toISOString());
    const perisanDate = format(myDate, 'yyyy/MM/dd');
    return {
      id: category.id,
      name: category.name,
      billboardLabel: category.billboard.label,
      createdAt: perisanDate,
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}
