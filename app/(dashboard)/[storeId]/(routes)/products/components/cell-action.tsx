'use client';
import React, { useState } from 'react';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter, useParams } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ProductColumn } from './columns';
import UseOrigin from '@/hooks/use-origin';
import AlertModal from '@/components/modals/alert-modal';

interface CellActionProps {
  product: ProductColumn;
}

export default function CellAction({ product }: CellActionProps) {
  const params = useParams();
  const origin = UseOrigin();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${product.id}`);
      toast.success('محصول با موفقیت حذف شد.');
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('حذف ناموفق فروشگاه');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={deleteHandler}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="cursor-pointer h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>اقدامات</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              const url =
                origin +
                '/' +
                params.storeId +
                '/' +
                'products' +
                '/' +
                product.id;
              console.log(url);
              router.push(url);
            }}>
            <Edit className="h-4 w-4 ml-2" />
            تغییر محصول
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 ml-2 " />
            حذف محصول
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(product.id);
              toast.success('آیدی با موفقیت کپی شد.');
            }}>
            <Copy className="h-4 w-4 ml-2 " />
            کپی کردن آیدی
          </DropdownMenuItem>

          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
