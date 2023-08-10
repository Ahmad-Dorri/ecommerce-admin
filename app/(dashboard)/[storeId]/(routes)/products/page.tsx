import { parseISO } from 'date-fns';
import { format } from 'date-fns-jalali';

import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';
import ProductClient from './components/product-client';
import { ProductColumn } from './components/columns';
import Loading from './loading';

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      images: true,
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedProducts: ProductColumn[] = products.map((product) => {
    const myDate = parseISO(product.createdAt.toISOString());
    const perisanDate = format(myDate, 'yyyy/MM/dd');
    return {
      id: product.id,
      name: product.name,
      isFeatured: product.isFeatured,
      isArchived: product.isArchived,
      price: formatter.format(product.price.toNumber()),
      category: product.category.name,
      color: product.color,
      size: product.size.name,
      createdAt: perisanDate,
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
}
