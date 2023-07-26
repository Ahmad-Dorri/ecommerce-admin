'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';
import { Color } from '@prisma/client';

export type ProductColumn = {
  id: string;
  name: string;
  color: Color;
  size: string;
  category: string;
  createdAt: string;
  price: string;
  isArchived: boolean;
  isFeatured: boolean;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    id: 'actions',
    cell: ({ row }) => <CellAction product={row.original} />,
  },
  {
    accessorKey: 'name',
    header: 'نام محصول',
  },
  {
    accessorKey: 'isArchived',
    header: 'آرشیو شده',
    cell: ({ row }) => (row.original.isArchived ? 'بله' : 'خیر'),
  },
  {
    accessorKey: 'isFeatured',
    header: 'ویژه',
    cell: ({ row }) => (row.original.isFeatured ? 'بله' : 'خیر'),
  },
  {
    accessorKey: 'category',
    header: 'دسته بندی',
  },
  {
    accessorKey: 'size',
    header: 'سایز',
  },
  {
    accessorKey: 'color',
    header: 'رنگ',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2 ">
        {row.original.color.name}
        <div
          className="h-6 w-6 rounded-full border "
          style={{ backgroundColor: row.original.color.value }}
        />
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'قیمت محصول',
  },
  {
    accessorKey: 'createdAt',
    header: 'تاریخ',
  },
];
