import prismadb from '@/lib/prismadb';

const getSalesCount = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
  });
  const totalSales = paidOrders.length;

  return totalSales;
};
export default getSalesCount;
