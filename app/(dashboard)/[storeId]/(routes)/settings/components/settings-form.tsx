'use client';
import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Store } from '@prisma/client';
import { redirect, useParams, useRouter } from 'next/navigation';
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
import ApiAlert from '@/components/ui/api-alert';
import UseOrigin from '@/hooks/use-origin';

interface SettingsFormProps {
  initialData: Store;
  userId: string;
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'حداقل یک کلمه وارد کنید.' }),
});

type settingFormValues = z.infer<typeof formSchema>;

export default function SettingsForm({
  initialData,
  userId,
}: SettingsFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = UseOrigin();

  const form = useForm<settingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  if (!userId) {
    redirect('/login');
  }

  const onSubmit = async (data: settingFormValues) => {
    try {
      setLoading(true);

      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success('تغییرات مورد نظر انجام شد.');
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
      await axios.delete(`/api/stores/${params.storeId}`);
      toast.success('فروشگاه با موفقیت حذف شد.');
      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
      // todo: make sure you remove all the products and catogories first
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
        <Heading title="تنظیمات" description="مدیریت فروشگاه ها" />
        <Button
          className="flex items-center gap-2 "
          variant="destructive"
          size="sm"
          disabled={loading}
          onClick={() => {
            setOpen(true);
          }}>
          <Trash className="w-4 h-4" />
          <p>حذف فروشگاه</p>
        </Button>
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
                  <FormLabel>اسم فروشگاه</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="اسم فروشگاه"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            ذخیره تغییرات
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        varient="public"
      />
    </>
  );
}
