'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ProductColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

interface ProductClientProps {
  data: ProductColumn[];
}

export default function ProductClient({ data }: ProductClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`محصول (${data.length})`}
          description="انتخاب محصول برای فروشگاه خود"
        />
        <Button
          onClick={() => {
            // todo: change new to the productId
            router.push(`/${params.storeId}/products/new`);
          }}>
          <Plus className="h-4 w-4 mr-2" />
          اضافه کردن
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading
        className="text-left"
        title="API"
        description="API CALLS FOR PRODUCTS"
      />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
}
