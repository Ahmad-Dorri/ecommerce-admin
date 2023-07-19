'use client';
import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import Heading from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AlertModal from '@/components/modals/alert-modal';
import ImageUpload from '@/components/ui/image-upload';

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type billboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
  initialData: Billboard | null;
}

export default function BillboardForm({ initialData }: BillboardFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? 'تغییر بیلبورد' : 'ایجاد بیلبورد';
  const description = initialData
    ? '  تغییر بیلبورد شما:'
    : 'اضافه کردن بیلبورد جدید';
  const toastMessage = initialData ? 'بیلبورد بروز شد.' : 'بیلبورد ایجاد شد.';
  const action = initialData ? 'ذخیره تغییرات' : 'ایجاد بیلبورد';

  const form = useForm<billboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (data: billboardFormValues) => {
    try {
      setLoading(true);
      if (!initialData) {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      } else {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/billboards`);
      toast.success(toastMessage);
    } catch (error) {
      console.log(error);
      toast.error('تغییرات انجام نشد.');
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      );
      toast.success('بیلبورد با موفقیت حذف شد.');
      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
      // todo: make sure you remove  catogories using this billboard first
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
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={deleteHandler}
      />
      <div className="flex justify-between items-center">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            className="flex items-center gap-2 "
            variant="destructive"
            size="sm"
            disabled={loading}
            onClick={() => {
              setOpen(true);
            }}>
            <Trash className="w-4 h-4" />
            <p>حذف بیلبورد</p>
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>پس زمینه</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={loading}
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8 ">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم بیلبورد</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="اسم بیلبورد"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
}
