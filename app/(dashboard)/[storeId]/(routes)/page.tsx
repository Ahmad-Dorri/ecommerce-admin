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
      <h1>Dashboard</h1>
      <p>{JSON.stringify(store)}</p>
    </div>
  );
};
export default DashboardPage;
