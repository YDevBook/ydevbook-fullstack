'use client';

import { Button, Subtitle, Title, Text } from '@tremor/react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LoginFormOnlyKakao = () => {
  const searchParams = useSearchParams();
  return (
    <div className="space-y-3 pt-8 pb-4">
      <Title className="text-3xl">
        개발자로 로그인하고, <br />
        스타트업 멤버로 진출해보세요.
      </Title>
      <Subtitle>대학생 개발자로서 스타트업에게 컨택을 받고 싶다면,</Subtitle>
      <div className="pt-32 pb-4">
        <Text className="text-center">
          <a href="/privacy" className="underline" target="__blank">
            개인정보 처리방침
          </a>
          ,{' '}
          <a href="/agreements" className="underline" target="__blank">
            이용약관
          </a>
          을 확인하였으며, 회원가입에 동의합니다.
        </Text>
      </div>
      <Button
        className="w-full bg-yellow-300 border-yellow-300 text-gray-900 hover:bg-yellow-300 hover:border-yellow-300 hover:text-gray-900"
        onClick={() => {
          signIn('kakao', {
            callbackUrl: searchParams.get('callbackUrl') ?? '/',
          });
        }}
        size="lg"
      >
        카카오로 3초만에 로그인하기
      </Button>
    </div>
  );
};

export default LoginFormOnlyKakao;
