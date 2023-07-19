'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { BillboardColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface BillboardClientProps {
  data: BillboardColumn[];
}

export default function BillboardClient({ data }: BillboardClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`بیلبورد (${data.length})`}
          description="انتخاب بیلبورد برای فروشگاه خود"
        />
        <Button
          onClick={() => {
            // todo: change new to the billboardId
            router.push(`/${params.storeId}/billboards/new`);
          }}>
          <Plus className="h-4 w-4 mr-2" />
          اضافه کردن
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
}
