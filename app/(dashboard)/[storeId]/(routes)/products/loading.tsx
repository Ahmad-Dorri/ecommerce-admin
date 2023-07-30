import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function Loading() {
  return (
    <>
      <div>
        <div className="flex justify-between p-8 items-center">
          <div className="flex-col">
            <div className="flex-1 space-y-6 p-8 pt-6">
              <Skeleton className="w-[200px] h-[50px] " />
              <Skeleton className="w-[100px] h-[25px] " />
            </div>
          </div>
          <Skeleton className="w-20 h-20 rounded-full" />
        </div>
        <Separator />
        <div className="mx-auto w-[80%] py-10 grid grid-cols-2 gap-y-4">
          <Skeleton className="col-span-full w-[300px] h-[25px] " />
          <Skeleton className="col-span-full w-[600px] h-[200px] " />
          <div className="flex items-center gap-2">
            <Skeleton className="w-[40px] h-[40px] " />
            <Skeleton className=" w-[40px] h-[40px] " />
          </div>
        </div>
      </div>
    </>
  );
}
