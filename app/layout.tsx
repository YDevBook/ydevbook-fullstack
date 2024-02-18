import { SessionProvider } from 'next-auth/react';
import { Suspense } from 'react';
import { auth } from '@/auth';
import '@/app/globals.css';

import { NotificationContextProvider } from '@/contexts/NotificationContext';

import Nav from './nav';

export const metadata = {
  title: 'YDevBook',
  description: '연뎁북.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <SessionProvider session={session}>
          <NotificationContextProvider>
            <Suspense>
              <Nav />
            </Suspense>
            {children}
          </NotificationContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
