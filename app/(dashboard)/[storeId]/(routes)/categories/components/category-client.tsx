'use client';

import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { CategoryColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ui/api-list';

interface CategoryClientProps {
  data: CategoryColumn[];
}

export default function CategoryClient({ data }: CategoryClientProps) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`دسته بندی ها (${data.length})`}
          description="انتخاب دسته بندی برای فروشگاه خود"
        />
        <Button
          onClick={() => {
            // todo: change new to the billboardId
            router.push(`/${params.storeId}/categories/new`);
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
        description="API CALLS FOR CATEGORIES"
      />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
}
