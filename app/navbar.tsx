'use client';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signIn, signOut } from 'next-auth/react';
import { Fragment } from 'react';
import LogoImage from '@/assets/images/ydevbook_logo.webp';
import { User } from '@/lib/definitions';

const navigation = [
  { name: 'Home', href: '/' },
  { name: '채용 공고', href: '/positions' },
  { name: '스타트업 서비스', href: '/startup' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ user }: { user: User }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={'/'}>
                    <Image
                      src={LogoImage}
                      alt="YDevBook Logo"
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                  </Link>
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <div
                      key={item.name}
                      className={classNames(
                        pathname === item.href
                          ? 'border-slate-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      <Link
                        href={item.href}
                        className="h-full inline-flex items-center"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={
                          user?.profileImageUrl ||
                          'https://avatar.vercel.sh/leerob'
                        }
                        height={32}
                        width={32}
                        alt={`${user?.name || 'placeholder'} avatar`}
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
                      {user ? (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'flex w-full px-4 py-2 text-sm text-gray-700'
                                )}
                                onClick={() => router.push('/my-profile')}
                              >
                                내 프로필
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
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
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700'
                              )}
                              onClick={async () => await signIn()}
                            >
                              로그인
                            </button>
                          )}
                        </Menu.Item>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden absolute bg-white z-10 w-full shadow-sm">
            <div className="space-y-1 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-slate-50 border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              {user ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      {user.profileImageUrl && (
                        <Image
                          className="h-8 w-8 rounded-full"
                          src={user.profileImageUrl}
                          height={32}
                          width={32}
                          alt={`${user.name} avatar`}
                        />
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Disclosure.Button
                      as="a"
                      href={'/my-profile'}
                      className={classNames(
                        pathname === '/my-profile'
                          ? 'bg-slate-50 border-slate-500 text-slate-700'
                          : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                        'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                      )}
                      aria-current={
                        pathname === '/my-profile' ? 'page' : undefined
                      }
                    >
                      내 프로필
                    </Disclosure.Button>
                    <button
                      onClick={async () => await signOut()}
                      className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      로그아웃
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1">
                  <button
                    onClick={async () => await signIn()}
                    className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    로그인
                  </button>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
