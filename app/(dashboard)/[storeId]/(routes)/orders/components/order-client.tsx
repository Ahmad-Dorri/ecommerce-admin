'use client';

import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { OrderColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface OrderClientProps {
  data: OrderColumn[];
}

export default function OrderClient({ data }: OrderClientProps) {
  return (
    <>
      <Heading title={`سفارش (${data.length})`} description="سفارشات" />

      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
}
