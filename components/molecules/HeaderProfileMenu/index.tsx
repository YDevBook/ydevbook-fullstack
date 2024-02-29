'use client';

import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut, signIn, useSession } from 'next-auth/react';
import { Fragment } from 'react';

interface HeaderProfileMenuProps {
  menuNavigationsWhenLoggedIn?: { name: string; href: string }[];
  menuNavigationsWhenLoggedOut?: { name: string; href: string }[];
}

const HeaderProfileMenu = ({
  menuNavigationsWhenLoggedIn,
  menuNavigationsWhenLoggedOut,
}: HeaderProfileMenuProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full"
            src={
              session?.user?.profileImageUrl ||
              'https://avatar.vercel.sh/leerob'
            }
            height={32}
            width={32}
            alt={`${session?.user?.name || 'placeholder'} avatar`}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {session?.user ? (
            <>
              {menuNavigationsWhenLoggedIn?.map((menuNavigation) => (
                <Menu.Item key={menuNavigation.href}>
                  {({ active }) => (
                    <button
                      className={clsx(
                        active ? 'bg-gray-100' : '',
                        'flex w-full px-4 py-2 text-sm text-gray-700'
                      )}
                      onClick={() => router.push(menuNavigation.href)}
                    >
                      {menuNavigation.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={clsx(
                      active ? 'bg-gray-100' : '',
                      'flex w-full px-4 py-2 text-sm text-gray-700'
                    )}
                    onClick={async () => await signOut()}
                  >
                    로그아웃
                  </button>
                )}
              </Menu.Item>
            </>
          ) : (
            <>
              {menuNavigationsWhenLoggedOut?.map((menuNavigation) => (
                <Menu.Item key={menuNavigation.href}>
                  {({ active }) => (
                    <button
                      className={clsx(
                        active ? 'bg-gray-100' : '',
                        'flex w-full px-4 py-2 text-sm text-gray-700'
                      )}
                      onClick={() => router.push(menuNavigation.href)}
                    >
                      {menuNavigation.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={clsx(
                      active ? 'bg-gray-100' : '',
                      'flex w-full px-4 py-2 text-sm text-gray-700'
                    )}
                    onClick={async () => await signIn()}
                  >
                    로그인
                  </button>
                )}
              </Menu.Item>
            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default HeaderProfileMenu;
