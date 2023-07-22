'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type ColorsColumn = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const columns: ColumnDef<ColorsColumn>[] = [
  {
    id: 'actions',
    cell: ({ row }) => <CellAction color={row.original} />,
  },
  {
    accessorKey: 'name',
    header: 'اسم رنگ',
  },
  {
    accessorKey: 'value',
    header: 'مقدار رنگ',
  },
  {
    accessorKey: 'createdAt',
    header: 'تاریخ',
  },
];
