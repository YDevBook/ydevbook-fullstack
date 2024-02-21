import '@/app/globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

import Header from '@/components/organisms/Header';
import { NotificationContextProvider } from '@/contexts/NotificationContext';

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
            <Header />
            {children}
          </NotificationContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
