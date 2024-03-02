import '@/app/globals.css';
import { Viewport } from 'next';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

import Footer from '@/components/organisms/Footer';
import Header from '@/components/organisms/Header';
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
    <html lang="en" className="h-full">
      <body className="font-Pretendard select-none outline-none break-keep">
        <SessionProvider session={session}>
          <NotificationContextProvider>
            <Header />
            {children}
            <Footer />
          </NotificationContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
