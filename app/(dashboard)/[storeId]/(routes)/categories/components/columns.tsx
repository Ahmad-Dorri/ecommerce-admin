'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    id: 'actions',
    cell: ({ row }) => <CellAction category={row.original} />,
  },
  {
    accessorKey: 'name',
    header: 'اسم دسته بندی',
  },
  {
    accessorKey: 'billboardLabel',
    header: 'بیلبورد',
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: 'createdAt',
    header: 'تاریخ',
  },
];
