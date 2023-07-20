'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from './cell-action';

export type BillboardColumn = {
  id: string;
  label: string;
  imageUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    id: 'actions',
    cell: ({ row }) => <CellAction billboard={row.original} />,
  },
  {
    accessorKey: 'label',
    header: 'اسم فروشگاه',
  },
  {
    accessorKey: 'createdAt',
    header: 'تاریخ',
  },
];
