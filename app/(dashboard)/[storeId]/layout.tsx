import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import Navbar from '@/components/navbar';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await getServerSession();
  const userId = session?.user?.name;
  if (!userId) {
    redirect('/login');
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });
  if (!store) redirect('/');

  return (
    <>
      {/* @ts-ignore */}
      <Navbar />
      {children}
    </>
  );
}
