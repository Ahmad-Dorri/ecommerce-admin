'use client';

import { ColumnDef } from '@tanstack/react-table';

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  products: string;
  totalPrice: string;
  createdAt: string;
  isPaid: boolean;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'products',
    header: 'سفارشات',
  },
  {
    accessorKey: 'phone',
    header: 'شماره تماس',
  },
  {
    accessorKey: 'address',
    header: 'آدرس',
  },
  {
    accessorKey: 'createdAt',
    header: 'تاریخ',
  },
  {
    accessorKey: 'isPaid',
    header: 'پرداخت شده',
  },
  {
    accessorKey: 'totalPrice',
    header: 'مجموع پرداختی',
  },
];
