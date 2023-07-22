'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type SizesColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<SizesColumn>[] = [
  {
    id: 'actions',
    cell: ({ row }) => <CellAction size={row.original} />,
  },
  {
    accessorKey: 'name',
    header: 'اسم سایز',
  },
  {
    accessorKey: 'value',
    header: 'اندازه سایز',
  },
  {
    accessorKey: 'createdAt',
    header: 'تاریخ',
  },
];
