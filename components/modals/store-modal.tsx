'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import axios from 'axios';

import { useStoreModal } from '@/hooks/use-store-modal';
import Modal from '@/components/ui/modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import { error } from 'console';

const formSchema = z.object({
  name: z.string().min(1, { message: 'حداقل یک کلمه باید وارد شود.' }),
});

type FormType = z.infer<typeof formSchema>;

export default function StoreModal() {
  const [loading, setLoading] = useState(false);
  const storeModal = useStoreModal();
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });
  const onSubmit = async (values: FormType) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', values);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error('خطا در ایجاد فروشگاه');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="ایجاد فروشگاه"
      description="اضافه کردن یک فضای فروشگاهی"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}>
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم فروشگاه</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="فروشگاه"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full gap-2 ">
                <Button
                  disabled={loading}
                  variant={'outline'}
                  onClick={storeModal.onClose}>
                  لغو
                </Button>
                <Button disabled={loading} type="submit">
                  ادامه
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
