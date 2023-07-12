import prismadb from '@/lib/prismadb';

interface DashboardProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: { id: params.storeId },
  });
  return (
    <div>
      <h1>داشبورد</h1>
      <p>فروشگاه: {store?.name}</p>
    </div>
  );
};
export default DashboardPage;
