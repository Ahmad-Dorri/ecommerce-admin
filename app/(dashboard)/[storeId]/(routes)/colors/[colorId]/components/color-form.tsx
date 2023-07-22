'use client';
import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Color } from '@prisma/client';
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

const formSchema = z.object({
  name: z.string().min(1, { message: 'حداقل یک کلمه وارد کنید.' }),
  value: z.string().min(1, { message: 'حداقل یک کلمه وارد کنید.' }),
});

type colorFormValues = z.infer<typeof formSchema>;

interface ColorFormProps {
  initialData: Color | null;
}

export default function ColorForm({ initialData }: ColorFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = initialData ? 'تغییر رنگ' : 'ایجاد رنگ';
  const description = initialData ? '  تغییر رنگ شما:' : 'اضافه کردن رنگ جدید';
  const toastMessage = initialData ? 'رنگ بروز شد.' : 'رنگ ایجاد شد.';
  const action = initialData ? 'ذخیره تغییرات' : 'ایجاد رنگ';

  const form = useForm<colorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  const onSubmit = async (data: colorFormValues) => {
    try {
      setLoading(true);
      if (!initialData) {
        await axios.post(`/api/${params.storeId}/colors`, data);
      } else {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data
        );
      }
      router.refresh();
      router.push(`/${params.storeId}/colors`);
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
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      toast.success('رنگ با موفقیت حذف شد.');
      router.refresh();
      router.push(`${origin}/${params.storeId}/colors`);
    } catch (error) {
      console.log(error);
      // todo: make sure you remove  catogories using this billboard first
      toast.error('حذف ناموفق ');
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
            color="sm"
            disabled={loading}
            onClick={() => {
              setOpen(true);
            }}>
            <Trash className="w-4 h-4" />
            <p>حذف رنگ</p>
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم رنگ</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="اسم رنگ"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مقدار رنگ</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="مقدار رنگ"
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
