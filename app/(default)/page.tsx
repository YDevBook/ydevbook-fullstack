import { Button, Card, Title } from '@tremor/react';
import { sql } from '@vercel/postgres';

import Link from 'next/link';
import { auth } from '@/auth';
import MainPageTemplate from '@/components/templates/MainPageTemplate';
import { ProfileFormStage } from '@/lib/definitions';

export default async function IndexPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  let hasProfile = false;
  if (isLoggedIn) {
    const result = await sql`
      SELECT COUNT(*) FROM profiles WHERE "userId" = ${session.user.id};
    `;
    hasProfile = result.rows[0].count !== '0';
  }
  const mainCTAHref =
    isLoggedIn && hasProfile
      ? '/my-profile'
      : `/profile-form?stage=${ProfileFormStage.포지션}`;

  return (
    <MainPageTemplate>
      <div className="relative flex flex-col justify-center items-center py-24">
        <div className="z-[-1]">
          <div className="absolute top-0 left-1/3 w-[316px] h-[316px] rounded-full bg-[linear-gradient(145deg,rgba(67,40,235,0.27)8.28%,rgba(128,148,254,0.35)94.84%)] [filter:blur(75px)] sm:w-[716px] sm:h-[716px] sm:top-[-40%]"></div>
          <div className="absolute top-1/2 left-0 w-[267px] h-[267px] rounded-full bg-[linear-gradient(180deg,rgba(54,200,230,0.70)0%,rgba(0,133,255,0.13)0.01%,rgba(0,133,255,0.29)100%)] [filter:blur(75px)] sm:w-[606px] sm:h-[606px] sm:top-1/3"></div>
          <div className="absolute top-1/2 left-1/3 w-[231px] h-[231px] rounded-full bg-[linear-gradient(151deg,rgba(165,209,246,0.39)7.98%,rgba(128,148,254,0.35)92.02%)] [filter:blur(75px)] sm:w-[521px] sm:h-[521px] sm:left-1/2 "></div>
        </div>
        <p className="my-4 text-xs sm:text-xl">
          대학생 개발자에서 스타트업 팀 합류까지 YDevBook과 함께
        </p>
        <h1 className="text-[28px] leading-[39px] font-bold text-center whitespace-pre-line sm:text-6xl sm:leading-normal">
          간편한 프로필 등록만으로 <br />
          스타트업 개발직 제안 받기
        </h1>
        <Link href={mainCTAHref}>
          <Button className="mt-8 !rounded-full" size="lg">
            프로필 등록하고 제의 받기!
          </Button>
        </Link>
        <Link href="/startup" className="mt-4 underline text-sm">
          스타트업이신가요?
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center my-24">
        <div className="w-full px-10">
          <p className="text-xl font-medium my-4">
            스타트업에 나의 강점을 노출 시켜보세요.
          </p>
        </div>
        <div className="px-10 w-full">
          <Card>
            <Title>나의 프로필 카드 예시</Title>
            학력: 연세대학교 컴퓨터과학과 <br /> 키워드 1 | 키워드 2 | 키워드 3
            <br />한 줄 소개 -----------
          </Card>
        </div>
      </div>
      <div className="flex flex-col items-center my-24">
        <div className="w-[calc(100%-5rem)] h-[200px] bg-slate-600 rounded-md">
          {/* <Image src={StartupImage} alt="startup image" layout="fill" /> */}
          WIP 일러
        </div>
        <div className="mt-4">
          <p>연뎁북은 한창 개발 중인 프로덕트입니다.</p>
        </div>
      </div>
    </MainPageTemplate>
  );
}
