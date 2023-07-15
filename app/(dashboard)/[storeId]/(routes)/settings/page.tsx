import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import prismadb from '@/lib/prismadb';
import SettingsForm from './components/settings-form';

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const session = await getServerSession();
  const userId = session?.user?.name;
  if (!userId) {
    redirect('/login');
  }
  const store = await prismadb.store.findFirst({
    where: {
      userId,
      id: params.storeId,
    },
  });
  if (!store) {
    redirect('/');
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <SettingsForm userId={userId} initialData={store} />
      </div>
    </div>
  );
}
