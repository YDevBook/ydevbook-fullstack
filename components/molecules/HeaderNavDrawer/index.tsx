'use client';

import { RiCloseLine, RiMenuLine } from '@remixicon/react';
import { Divider } from '@tremor/react';
import clsx from 'clsx';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

interface HeaderNavDrawerProps {
  navigation: { name: string; href: string }[];
}

const HeaderNavDrawer = ({ navigation }: HeaderNavDrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-md bg-white p-1 -ml-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      >
        <span className="sr-only">Open main menu</span>
        <RiMenuLine className="h-6 w-6" />
      </button>
      <div
        className={clsx(
          isOpen
            ? 'transition-[background-color] translate-x-[0%] bg-black/70 delay-0'
            : 'transition-transform translate-x-[-100%] bg-black/0 delay-200',
          'absolute top-0 left-0 w-screen h-screen z-20',
          ' duration-200 ease-in-out'
        )}
      >
        <div
          className={clsx(
            'absolute left-0 top-0 bg-white w-64 h-full p-4',
            'transition-transform duration-200 ease-in-out delay-0',
            isOpen ? 'translate-x-[0%]' : 'translate-x-[-100%]'
          )}
        >
          <div>
            <button
              onClick={() => setIsOpen(false)}
              className="-ml-1 rounded-md bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
              <RiCloseLine className="h-7 w-7" />
            </button>
          </div>
          <div className="mt-12 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <Divider />
          <div className="space-y-4">
            {session?.user ? (
              <>
                <Link href="/my-profile" onClick={() => setIsOpen(false)}>
                  내 프로필
                </Link>
                <button
                  onClick={async () => await signOut()}
                  className="block font-medium"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <button
                onClick={async () => await signIn()}
                className="block font-medium"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavDrawer;
