import localFont from 'next/font/local';

import './globals.css';

import ModalProvider from '@/providers/modal-provider';
import { ToastProvider } from '@/components/modals/toast-provider';
import { ThemeProvider } from '@/providers/theme-provider';

const shabnam = localFont({
  src: '../public/font/Shabnam.woff2',
});
export const metadata = {
  title: 'صفحه ادمین',
  description: 'صفحه ادمین برای اضافه کردن محصولات',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="rtl">
      <body className={shabnam.className}>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <ToastProvider />
          <ModalProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
