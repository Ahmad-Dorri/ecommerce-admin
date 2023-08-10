'use client';
import React, { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  LayoutDashboard,
  Menu,
  PaintBucket,
  Settings,
  ShoppingBag,
} from 'lucide-react';

interface Routes {
  href: string;
  label: string;
  active: boolean;
  icon?: React.ReactNode;
}

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const params = useParams();
  const pathName = usePathname();
  // TODO: add other routes
  const routes: Routes[] = [
    {
      href: `/${params.storeId}`,
      label: 'داشبورد',
      active: pathName === `/${params.storeId}`,
      icon: <LayoutDashboard />,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'تنظیمات',
      active: pathName === `/${params.storeId}/settings`,
      icon: <Settings />,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'بیلبورد',
      active: pathName === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/products`,
      label: 'محصولات',
      active: pathName === `/${params.storeId}/products`,
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
      icon: <PaintBucket />,
    },
    {
      href: `/${params.storeId}/orders`,
      label: 'سفارشات',
      active: pathName === `/${params.storeId}/orders`,
      icon: <ShoppingBag />,
    },
  ];
  return (
    <>
      <Menu
        onClick={() => setMenuOpen(!menuOpen)}
        className="cursor-pointer lg:hidden ml-2"
      />
      {menuOpen && (
        <nav
          className={cn(
            'flex flex-col gap-1 max-w-[200px] h-full  transition-all absolute right-0 top-20',
            className
          )}>
          {routes.map((route) => (
            <Link
              onClick={() => setMenuOpen(false)}
              key={route.href}
              href={route.href}
              className={cn(
                'p-1 cursor-pointer rounded-sm text-sm font-medium transition-colors hover:text-primary flex items-center justify-between gap-2',
                route.active
                  ? 'text-black dark:text-white'
                  : 'text-muted-foreground'
              )}>
              {route.label}
              <span>{route?.icon}</span>
            </Link>
          ))}
        </nav>
      )}
      <nav className={cn('hidden lg:flex gap-2 ', className)}>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'p-1 rounded-sm text-sm font-medium transition-colors hover:text-primary flex items-center justify-between gap-2',
              route.active
                ? 'text-black dark:text-white'
                : 'text-muted-foreground'
            )}>
            {route.label}
            <span>{route?.icon}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
