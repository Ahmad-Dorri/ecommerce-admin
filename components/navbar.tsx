import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import MainNav from '@/components/main-nav';
import StoreSwitcher from '@/components/store-switcher';
import prismadb from '@/lib/prismadb';
import { ToggleTheme } from '@/components/toggle-theme';

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
        <div className="flex flex-row-reverse items-center gap-4 lg:flex-row lg:gap-0">
          <StoreSwitcher items={stores} />
          <MainNav className="mx-6" />
        </div>
        <ToggleTheme />
      </div>
    </div>
  );
}
