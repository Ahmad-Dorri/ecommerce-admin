'use client';
import React from 'react';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Routes {
  href: string;
  label: string;
  active: boolean;
}

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const params = useParams();
  const pathName = usePathname();
  // TODO: add other routes
  const routes: Routes[] = [
    {
      href: `/${params.storeId}`,
      label: 'داشبورد',
      active: pathName === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'تنظیمات',
      active: pathName === `/${params.storeId}/settings`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'بیلبورد',
      active: pathName === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: 'دسته‌بندی ها',
      active: pathName === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: 'سایزها',
      active: pathName === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: 'رنگ ها',
      active: pathName === `/${params.storeId}/colors`,
    },
  ];
  return (
    <nav className={cn('flex items-center gap-2 lg:gap-6 ', className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}>
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
