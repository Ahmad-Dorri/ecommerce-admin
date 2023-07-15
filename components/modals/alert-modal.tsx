import React, { useEffect, useState } from 'react';

import Modal from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface AlertModalProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: AlertModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title="آیا مطمينید؟"
      description="این اتفاق نمیتواند غیرکامل رها شود!"
      isOpen={isOpen}
      onClose={onClose}>
      <div className="pt-6 gap-2 flex items-center justify-end w-full ">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          لغو
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          حذف فروشگاه
        </Button>
      </div>
    </Modal>
  );
}
