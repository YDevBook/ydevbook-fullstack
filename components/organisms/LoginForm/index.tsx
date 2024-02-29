'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@tremor/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useContext } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { NotificationContext } from '@/contexts/NotificationContext';
import { authenticate } from '@/lib/actions';

interface LoginFormProps {
  isStartup?: boolean;
}

export default function LoginForm({ isStartup }: LoginFormProps) {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const searchParams = useSearchParams();
  const { setContent, setIsOpen } = useContext(NotificationContext);

  const onClickStartupSignup = () => {
    setContent?.({
      title: '스타트업 계정 신청',
      description:
        '스타트업 계정 신청은 현재 준비 중입니다. contact@developool.com 으로 계정 신청을 문의해주시면 빠르게 처리해드리겠습니다.',
    });
    setIsOpen?.(true);
  };

  return (
    <form action={dispatch} className="mt-10 space-y-3">
      <div className="flex-1 px-6 pt-8 pb-4 rounded-lg bg-gray-50">
        <h1 className={` mb-3 text-2xl`}>
          {isStartup
            ? '스타트업 계정으로 로그인 해주세요.'
            : 'Please log in to continue.'}
        </h1>
        <div className="w-full">
          <div>
            <label
              className="block mt-5 mb-3 text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              이메일
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요."
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="block mt-5 mb-3 text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              비밀번호
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <input
            type="hidden"
            name="isStartup"
            value={isStartup ? 'true' : 'false'}
          />
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get('callbackUrl') ?? '/'}
          />
        </div>
        <LoginButton />
        {!isStartup && (
          <Button
            className="w-full mt-4 bg-yellow-300 border-yellow-300 text-gray-900 hover:bg-yellow-300 hover:border-yellow-300 hover:text-gray-900"
            onClick={() => {
              signIn('kakao', {
                callbackUrl: searchParams.get('callbackUrl') ?? '/',
              });
            }}
            type="button"
          >
            카카오로 로그인
          </Button>
        )}
        <div
          className="flex items-end h-8 space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        {!isStartup && (
          <div>
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-gray-900">
                Sign up
              </Link>
            </p>
          </div>
        )}
        {isStartup && (
          <div>
            <p className="text-sm text-gray-500">
              스타트업 계정이 없으신가요?{' '}
              <span
                onClick={onClickStartupSignup}
                className="font-medium text-gray-900 cursor-pointer"
              >
                계정 신청하기
              </span>
            </p>
          </div>
        )}
        {!isStartup && (
          <div>
            <p className="text-sm text-gray-500">
              스타트업 회원이신가요?{' '}
              <Link href="/startup/login" className="font-medium text-gray-900">
                스타트업 로그인
              </Link>
            </p>
          </div>
        )}
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button className="w-full mt-4 " aria-disabled={pending}>
      로그인
    </Button>
  );
}
