'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export type BillboardColumn = {
  id: string;
  label: string;
  imageUrl: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const billboard = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>اقدامات</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                redirect(`/`);
              }}>
              تغییر بیلبورد
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>حذف بیلبورد</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
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
