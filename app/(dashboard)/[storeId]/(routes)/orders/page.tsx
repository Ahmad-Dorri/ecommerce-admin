import prismadb from '@/lib/prismadb';
import OrderClient from './components/order-client';
import { OrderColumn } from './components/columns';

import { parseISO } from 'date-fns';
import { format } from 'date-fns-jalali';
import { formatter } from '@/lib/utils';

export default async function OrdersPage({
  params,
}: {
  params: { storeId: string };
}) {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => {
    const myDate = parseISO(order.createdAt.toISOString());
    const perisanDate = format(myDate, 'yyyy/MM/dd');
    return {
      id: order.id,
      phone: order.phone,
      address: order.address,
      totalPrice:
        formatter.format(
          order.orderItems
            .map((orderItem) => orderItem.product.price.toNumber())
            .reduce((acc, cur) => acc + cur, 0)
        ) + ' ریال ',
      products: order.orderItems.map((order) => order.product.name).join(', '),
      createdAt: perisanDate,
      isPaid: order.isPaid,
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-6 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}
