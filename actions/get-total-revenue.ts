import prismadb from '@/lib/prismadb';
const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders
    .map((orders) =>
      orders.orderItems.map((item) => Number(item.product.price))
    )
    .reduce((a, b) => a.concat(b), [])
    .reduce((acc: number, cur: number) => acc + cur, 0);

  return totalRevenue;
};
export default getTotalRevenue;
