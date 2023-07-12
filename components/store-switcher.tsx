'use client';

import React, { useState } from 'react';
import { Store } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useStoreModal } from '@/hooks/use-store-modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export default function StoreSwitcher({
  className,
  items = [],
}: StoreSwitcherProps) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const storeModal = useStoreModal();
  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  // const currentStore = items.filter((item) => item.id === params.storeId);
  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );
  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Store-Select"
          className={cn('w-[200px] justify-between align-center', className)}>
          <StoreIcon className="h-4 w-4 mr-2 " />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto shrink-0 w-4 h-4 opacity-50 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="جستجو فروشگاه..." />
            <CommandEmpty>فروشگاهی یافت نشد!</CommandEmpty>
            <CommandGroup heading="فروشگاه ها">
              {formattedItems.map((store) => (
                <CommandItem
                  onSelect={() => {
                    onStoreSelect(store);
                  }}
                  key={store.value}
                  className="text-sm flex justify-between ">
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      ' h-4 w-4 ml-auto',
                      currentStore?.value === store.value
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}>
                <PlusCircle className="w-5 h-5 mr-2" />
                ایجاد فروشگاه جدید
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
