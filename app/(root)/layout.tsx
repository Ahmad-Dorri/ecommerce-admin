import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const userId = session?.user?.name;
  if (!userId) {
    redirect('/login');
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }
  return <>{children}</>;
}
