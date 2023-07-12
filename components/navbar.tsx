import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import MainNav from '@/components/main-nav';
import StoreSwitcher from '@/components/store-switcher';
import prismadb from '@/lib/prismadb';

export default async function Navbar() {
  const session = await getServerSession();
  const userId = session?.user?.name;
  if (!userId) {
    redirect('/login');
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex items-center h-16 px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">کاربر</div>
      </div>
    </div>
  );
}