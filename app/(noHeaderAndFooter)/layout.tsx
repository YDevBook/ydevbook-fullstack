import '@/app/globals.css';
import { Viewport } from 'next';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

import { NotificationContextProvider } from '@/contexts/NotificationContext';

export const metadata = {
  title: 'YDevBook',
  description: '연뎁북.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" className=" bg-gray-50">
      <body className="font-Pretendard select-none outline-none h-screen-safe">
        <SessionProvider session={session}>
          <NotificationContextProvider>{children}</NotificationContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
