'use client';

import { useStoreModal } from '@/hooks/use-store-modal';
import Modal from '@/components/ui/modal';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  name: z.string().min(1),
});
export default function StoreModal() {
  const storeModal = useStoreModal();
  useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  return (
    <Modal
      title="ایجاد فروشگاه"
      description="اضافه کردن یک فضای فروشگاهی"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}>
      فرم ایجاد فروشگاه
    </Modal>
  );
}
